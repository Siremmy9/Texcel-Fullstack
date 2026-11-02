import type { Metadata } from "next";
import { AcademicsView } from "@/components/views/academics";

export const metadata: Metadata = {
  title: "Academics",
  description: "Curriculum, subjects, ICT, sports and character education at Texcel Schools.",
};

export default function AcademicsPage() {
  return <AcademicsView />;
}
