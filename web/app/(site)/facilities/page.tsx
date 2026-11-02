import type { Metadata } from "next";
import { FacilitiesView } from "@/components/views/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Classrooms, laboratories, sports and care facilities at Texcel Schools.",
};

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
