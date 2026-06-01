#!/usr/bin/env bash
#
# Optional: export the source .pptx deck to PNG slides for DeckCarousel.
# The carousel renders native JSX slides by default; this script is only needed
# if you want pixel-exact raster slides from the actual deck file.
#
# Requirements (not installed on this machine by default):
#   - libreoffice (headless) — pptx -> pdf
#   - poppler-utils (pdftoppm) — pdf -> png   [present here]
#
# Usage: bash scripts/export-deck.sh
# Output: public/deck/slide-1.png ... slide-12.png
# Then set `image: "/deck/slide-N.png"` on the matching entries in
# content/deck-slides.tsx to switch the carousel to images.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DECK="$ROOT/B2B-Case-Study-Deck.pptx"
OUT="$ROOT/public/deck"
TMP="$(mktemp -d)"

if ! command -v libreoffice >/dev/null 2>&1 && ! command -v soffice >/dev/null 2>&1; then
  echo "error: libreoffice/soffice not found. Install it to export raster slides." >&2
  echo "       (the carousel already works with native JSX slides without this.)" >&2
  exit 1
fi

SOFFICE="$(command -v libreoffice || command -v soffice)"

mkdir -p "$OUT"
echo "Converting deck to PDF..."
"$SOFFICE" --headless --convert-to pdf --outdir "$TMP" "$DECK"

PDF="$TMP/$(basename "${DECK%.pptx}").pdf"
echo "Rasterizing PDF to PNG slides..."
pdftoppm -png -r 150 "$PDF" "$OUT/slide"

# pdftoppm names files slide-1.png, slide-01.png depending on count; normalize.
( cd "$OUT" && for f in slide-*.png; do
    n="$(echo "$f" | sed -E 's/slide-0*([0-9]+)\.png/\1/')"
    mv -f "$f" "slide-$n.png" 2>/dev/null || true
  done )

rm -rf "$TMP"
echo "Done. Slides in $OUT"
