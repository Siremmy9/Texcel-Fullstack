"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearActivities,
  createAdmission,
  createMessage,
  deleteAdmission,
  deleteMessage,
  deleteStudent,
  getActivities,
  getAdmissions,
  getDashboard,
  getMe,
  getMessages,
  getSite,
  getStudents,
  login,
  saveStudent,
  updateAdmission,
  updateMessage,
} from "@/api/requests";

function useRefreshAdmin() {
  const client = useQueryClient();
  return () => {
    client.invalidateQueries({ queryKey: ["me"] });
    client.invalidateQueries({ queryKey: ["dashboard"] });
    client.invalidateQueries({ queryKey: ["admissions"] });
    client.invalidateQueries({ queryKey: ["students"] });
    client.invalidateQueries({ queryKey: ["messages"] });
    client.invalidateQueries({ queryKey: ["activities"] });
  };
}

export function useGetSite() {
  return useQuery({
    queryKey: ["site"],
    queryFn: getSite,
  });
}

export function useCreateAdmission() {
  return useMutation({ mutationFn: createAdmission });
}

export function useCreateMessage() {
  const refresh = useRefreshAdmin();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: refresh,
  });
}

export function useLogin() {
  return useMutation({ mutationFn: login });
}

export function useGetMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled,
    retry: false,
  });
}

export function useGetDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}

export function useGetAdmissions(status = "All") {
  return useQuery({
    queryKey: ["admissions", status],
    queryFn: () => getAdmissions(status),
  });
}

export function useUpdateAdmission() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: updateAdmission, onSuccess: refresh });
}

export function useDeleteAdmission() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: deleteAdmission, onSuccess: refresh });
}

export function useGetStudents(q = "") {
  return useQuery({
    queryKey: ["students", q],
    queryFn: () => getStudents(q),
  });
}

export function useSaveStudent() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: saveStudent, onSuccess: refresh });
}

export function useDeleteStudent() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: deleteStudent, onSuccess: refresh });
}

export function useGetMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
}

export function useUpdateMessage() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: updateMessage, onSuccess: refresh });
}

export function useDeleteMessage() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: deleteMessage, onSuccess: refresh });
}

export function useGetActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });
}

export function useClearActivities() {
  const refresh = useRefreshAdmin();
  return useMutation({ mutationFn: clearActivities, onSuccess: refresh });
}
