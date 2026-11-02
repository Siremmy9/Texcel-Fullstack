import type { Metadata } from "next";
import { NewsView } from "@/components/views/news";

export const metadata: Metadata = {
  title: "News and events",
  description: "Announcements and events for families at Texcel Schools.",
};

export default function NewsPage() {
  return <NewsView />;
}
