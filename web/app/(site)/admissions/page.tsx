import type { Metadata } from "next";
import { Suspense } from "react";
import { AdmissionsView } from "@/components/views/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for Crèche, Pre-school, Primary or College admission at Texcel Schools.",
};

export default function AdmissionsPage() {
  return (
    <Suspense fallback={<p className="px-5 py-24 text-muted">Loading admissions…</p>}>
      <AdmissionsView />
    </Suspense>
  );
}
