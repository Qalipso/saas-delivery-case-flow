import { redirect } from "next/navigation";

// The case study is the product; send the root straight to it.
export default function Home() {
  redirect("/case-studies/underwriting-portal");
}
