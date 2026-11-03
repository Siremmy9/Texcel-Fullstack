"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLogin } from "@/hooks";
import { ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";

export function LoginView() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const mutation = useLogin();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await mutation.mutateAsync({
        username: String(data.get("username") || ""),
        password: String(data.get("password") || ""),
      });
      setToken(result.token, data.get("remember") === "on");
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not sign in.");
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden bg-wine-deep p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <p className="font-display text-5xl">Texcel Schools</p>
        <p className="mt-3 text-gold">Raising The Joy of Nations</p>
      </aside>
      <main className="grid place-items-center px-5 py-16">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <h1 className="font-display text-4xl text-wine-deep">Admin login</h1>
          <p className="mt-2 text-muted">Sign in to manage admissions, students and messages.</p>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700" role="alert">{error}</p>}
          <label className="mt-6 block text-sm font-semibold">
            Username
            <input name="username" required autoComplete="username" className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Password
            <span className="mt-1 flex gap-2">
              <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" className="w-full rounded-xl border border-line px-3 py-2 font-normal" />
              <button type="button" className="rounded-xl border border-line px-3 text-sm" onClick={() => setShow((value) => !value)} aria-pressed={show}>
                {show ? "Hide" : "Show"}
              </button>
            </span>
          </label>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <button type="submit" disabled={mutation.isPending} className="mt-6 w-full rounded-full bg-wine py-3 font-semibold text-white disabled:opacity-60">
            {mutation.isPending ? "Signing in…" : "Login"}
          </button>
          <p className="mt-4 text-center text-sm text-muted">
            First sign-in uses the admin account from the API environment file.
          </p>
          <p className="mt-4 text-center">
            <Link href="/" className="text-sm font-semibold text-wine">
              Back to website
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
