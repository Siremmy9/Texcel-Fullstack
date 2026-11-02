import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Visit, call or message Texcel Schools in Majek, Lagos.",
};

export default function ContactPage() {
  return <ContactView />;
}
