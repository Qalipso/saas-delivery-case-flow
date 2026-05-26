import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS Delivery Flow",
  description: "Implementation management — case pipeline, stage SLAs, blocker tracking",
};

const NAV = [
  { href: "/", label: "Cases" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/stages/Kickoff", label: "Stages" },
  { href: "/reports", label: "QBR Report" },
  { href: "/docs", label: "Docs & Diagrams" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif", background: "#0d1117", color: "#c9d1d9", minHeight: "100vh", display: "flex" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, background: "#161b22", borderRight: "1px solid #21262d", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
          <div style={{ padding: "20px 16px 14px", borderBottom: "1px solid #21262d" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "linear-gradient(135deg, #1f6feb, #388bfd)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0 }}>
                SF
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3" }}>SaaS Delivery</div>
                <div style={{ fontSize: 11, color: "#8b949e" }}>Case Pipeline</div>
              </div>
            </div>
          </div>

          <nav style={{ padding: "8px 8px", flex: 1 }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8b949e", padding: "8px 8px 4px" }}>Navigation</div>
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ display: "block", padding: "7px 10px", borderRadius: 6, fontSize: 13, color: "#8b949e", textDecoration: "none", marginBottom: 2, transition: "background 0.15s" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #21262d", fontSize: 11, color: "#8b949e" }}>
            Tenant: Helix · v0.1 mock
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "32px 36px", maxWidth: 1100, overflowY: "auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
