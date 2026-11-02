"use client";

import Link from "next/link";
import { useGetDashboard } from "@/hooks";
import { formatDate, formatTime } from "@/lib/format";

const CARDS = [
  ["students", "Total Students", "/admin/students"],
  ["admissions", "Admission Enquiries", "/admin/admissions"],
  ["staff", "Staff", "/about#team"],
  ["news", "Published News", "/news"],
  ["gallery", "Gallery Items", "/gallery"],
  ["unread", "Unread Messages", "/admin/messages"],
] as const;

export function DashboardView() {
  const query = useGetDashboard();

  if (query.isPending) return <p className="text-muted">Loading dashboard…</p>;
  if (query.isError || !query.data) return <p className="text-red-700">Could not load the dashboard.</p>;

  const data = query.data;
  const maxMonth = Math.max(1, ...data.months.map((month) => month.value));
  const maxStatus = Math.max(1, ...data.statuses.map((status) => status.value));

  return (
    <div>
      <h1 className="font-display text-4xl text-wine-deep">Dashboard</h1>
      <p className="mt-1 text-muted">Welcome back. Here is what is happening at the school.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CARDS.map(([key, label, href]) => (
          <Link key={key} href={href} className="rounded-2xl bg-white p-5 no-underline shadow-card">
            <strong className="block font-display text-4xl text-wine">{data.counts[key]}</strong>
            <span className="text-sm font-semibold text-muted">{label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-wine-deep">Enquiries in the last 6 months</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {data.months.map((month) => (
              <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold">{month.value}</span>
                <div className="w-full rounded-t-lg bg-wine" style={{ height: `${Math.max(8, (month.value / maxMonth) * 140)}px` }} />
                <span className="text-xs text-muted">{month.label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-wine-deep">Admission pipeline</h2>
          <ul className="mt-4 space-y-3">
            {data.statuses.map((status) => (
              <li key={status.label} className="grid grid-cols-[110px_1fr_24px] items-center gap-3 text-sm">
                <span>{status.label}</span>
                <span className="h-2 rounded-full bg-line">
                  <span className="block h-2 rounded-full bg-wine" style={{ width: `${(status.value / maxStatus) * 100}%` }} />
                </span>
                <b>{status.value}</b>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-wine-deep">Students by section</h2>
          {data.byLevel.length === 0 ? (
            <p className="mt-4 text-muted">Add students to see this chart.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {data.byLevel.map((row) => (
                <li key={row.label} className="flex justify-between rounded-xl bg-tint px-3 py-2 text-sm">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-display text-2xl text-wine-deep">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {data.activities.map((item) => (
              <li key={item.id} className="text-sm">
                <p>{item.text}</p>
                <time className="text-xs text-muted" dateTime={item.createdAt}>
                  {formatDate(item.createdAt)} {formatTime(item.createdAt)}
                </time>
              </li>
            ))}
          </ul>
          <Link href="/admin/activities" className="mt-4 inline-block text-sm font-semibold text-wine">
            View all activity
          </Link>
        </section>
      </div>
    </div>
  );
}
