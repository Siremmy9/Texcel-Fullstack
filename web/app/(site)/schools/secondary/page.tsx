import type { Metadata } from "next";
import { SchoolCampusView } from "@/components/views/school-campus";

export const metadata: Metadata = {
  title: "Secondary School",
  description: "Meet the Secondary School principal and find the campus.",
};

export default function SecondarySchoolPage() {
  return <SchoolCampusView campusKey="secondary" />;
}
