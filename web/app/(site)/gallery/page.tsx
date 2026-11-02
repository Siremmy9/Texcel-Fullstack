import type { Metadata } from "next";
import { GalleryView } from "@/components/views/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from classrooms, events and everyday life at Texcel Schools.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
