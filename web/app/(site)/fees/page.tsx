import type { Metadata } from "next";
import { FeesView } from "@/components/views/fees";

export const metadata: Metadata = {
  title: "School fees",
  description: "Fee schedule and payment details for Texcel Schools.",
};

export default function FeesPage() {
  return <FeesView />;
}
