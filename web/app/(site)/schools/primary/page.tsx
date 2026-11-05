import type { Metadata } from "next";
import { SchoolCampusView } from "@/components/views/school-campus";

export const metadata: Metadata = {
  title: "Primary School",
  description: "Meet the Primary School principal and find the campus.",
};

export default function PrimarySchoolPage() {
  return <SchoolCampusView campusKey="primary" />;
}
