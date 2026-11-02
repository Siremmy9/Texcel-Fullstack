import type { Metadata } from "next";
import { LoginView } from "@/components/admin/login";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginView />;
}
