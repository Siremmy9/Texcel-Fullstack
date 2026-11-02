import { api } from "@/lib/api";
import { mockSite } from "@/lib/mock-site";
import type {
  Activity,
  Admission,
  ContactMessage,
  CreateAdmissionInput,
  CreateAdmissionResult,
  CreateMessageInput,
  CreateMessageResult,
  Dashboard,
  LoginInput,
  LoginResult,
  Me,
  SitePayload,
  StatusPatch,
  Student,
  StudentInput,
} from "@/lib/types";

export function getSite() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_SITE === "true") {
    return Promise.resolve(mockSite);
  }
  return api<SitePayload>("/api/site");
}

export function createAdmission(body: CreateAdmissionInput) {
  return api<CreateAdmissionResult>("/api/admissions", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function createMessage(body: CreateMessageInput) {
  return api<CreateMessageResult>("/api/messages", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function login(body: LoginInput) {
  return api<LoginResult>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getMe() {
  return api<Me>("/api/auth/me");
}

export function getDashboard() {
  return api<Dashboard>("/api/admin/dashboard");
}

export function getAdmissions(status = "All") {
  return api<Admission[]>(`/api/admin/admissions?status=${encodeURIComponent(status)}`);
}

export function updateAdmission({ id, status }: StatusPatch) {
  return api<Admission>(`/api/admin/admissions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteAdmission(id: string) {
  return api<void>(`/api/admin/admissions/${id}`, { method: "DELETE" });
}

export function getStudents(q = "") {
  return api<Student[]>(`/api/admin/students?q=${encodeURIComponent(q)}`);
}

export function saveStudent(body: StudentInput) {
  const { id, ...fields } = body;
  if (id) {
    return api<Student>(`/api/admin/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
    });
  }
  return api<Student>("/api/admin/students", {
    method: "POST",
    body: JSON.stringify(fields),
  });
}

export function deleteStudent(id: string) {
  return api<void>(`/api/admin/students/${id}`, { method: "DELETE" });
}

export function getMessages() {
  return api<ContactMessage[]>("/api/admin/messages");
}

export function updateMessage({ id, status }: StatusPatch) {
  return api<ContactMessage>(`/api/admin/messages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteMessage(id: string) {
  return api<void>(`/api/admin/messages/${id}`, { method: "DELETE" });
}

export function getActivities() {
  return api<Activity[]>("/api/admin/activities");
}

export function clearActivities() {
  return api<void>("/api/admin/activities", { method: "DELETE" });
}
