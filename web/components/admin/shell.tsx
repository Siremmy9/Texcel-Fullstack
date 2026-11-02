"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks";
import { ApiError } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import { initials } from "@/lib/format";

const NAV = [
  ["Dashboard", "/admin", "board"],
  ["Admissions", "/admin/admissions", "clip"],
  ["Students", "/admin/students", "people"],
  ["Messages", "/admin/messages", "mail"],
  ["Activities", "/admin/activities", "pulse"],
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const me = useGetMe(ready);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (me.error instanceof ApiError && me.error.status === 401) {
      clearToken();
      router.replace("/admin/login");
    }
  }, [me.error, router]);

  if (!ready || me.isPending) {
    return <p className="p-10 text-muted">Checking your session…</p>;
  }
  if (!me.data) return null;

  const title = NAV.find((item) => item[1] === pathname)?.[0] || "Admin";

  return (
    <div className="min-h-screen bg-tint text-ink md:grid md:grid-cols-[240px_1fr]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-wine-deep text-white transition md:static md:w-auto ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="border-b border-white/10 px-5 py-6">
          <p className="font-display text-xl">Texcels</p>
          <p className="text-sm text-white/60">Admin</p>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {NAV.map(([label, href]) => {
              const current = pathname === href;
              const badge =
                href === "/admin/admissions"
                  ? me.data.pendingAdmissions
                  : href === "/admin/messages"
                    ? me.data.unreadMessages
                    : 0;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold no-underline ${
                      current ? "bg-white/15 text-gold" : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    {label}
                    {badge > 0 && <span className="rounded-full bg-gold px-2 text-xs text-ink">{badge}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="mt-4 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-white/80 hover:bg-white/10"
            onClick={() => {
              clearToken();
              router.replace("/admin/login");
            }}
          >
            Logout
          </button>
        </nav>
      </aside>
      {open && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-30 bg-ink/40 md:hidden" onClick={() => setOpen(false)} />}
      <div className="min-w-0">
        <header className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
          <button type="button" className="rounded-lg px-3 py-2 text-sm font-semibold md:hidden" onClick={() => setOpen(true)}>
            Menu
          </button>
          <p className="font-display text-xl text-wine-deep">{title}</p>
          <Link href="/" className="ml-auto text-sm font-semibold text-wine no-underline" target="_blank">
            View website
          </Link>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-wine text-xs text-white">{initials(me.data.username)}</span>
            {me.data.username}
          </span>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
