import type { Metadata } from "next";
import { AboutView } from "@/components/views/about";

export const metadata: Metadata = {
  title: "About us",
  description: "Who we are, what we believe and the people who teach at Texcel Schools.",
};

export default function AboutPage() {
  return <AboutView />;
}
