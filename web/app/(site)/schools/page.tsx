import type { Metadata } from "next";
import { SchoolsView } from "@/components/views/schools";

export const metadata: Metadata = {
  title: "Our schools",
  description: "Crèche, Nursery, Primary and Secondary at Texcel Schools, Lagos.",
};

export default function SchoolsPage() {
  return <SchoolsView />;
}
