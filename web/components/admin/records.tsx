"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  useDeleteAdmission,
  useDeleteMessage,
  useDeleteStudent,
  useGetActivities,
  useGetAdmissions,
  useGetMessages,
  useGetSite,
  useGetStudents,
  useClearActivities,
  useSaveStudent,
  useUpdateAdmission,
  useUpdateMessage,
} from "@/hooks";
import { formatDate, formatTime } from "@/lib/format";
import type { Activity, Admission, ContactMessage, Student } from "@/lib/types";

const ADMISSION_STATUS = ["Pending", "Reviewed", "Contacted", "Approved", "Rejected"];
const MESSAGE_STATUS = ["Unread", "Read", "Replied"];

export function AdmissionsAdmin() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Admission | null>(null);
  const query = useGetAdmissions(filter);
  const counts = useGetAdmissions("All");
  const update = useUpdateAdmission();
  const remove = useDeleteAdmission();

  const all = counts.data || [];

  return (
    <div>
      <h1 className="font-display text-4xl text-wine-deep">Admissions</h1>
      <p className="mt-1 text-muted">Enquiries submitted from the website. Update each status as you follow up.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...ADMISSION_STATUS].map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${filter === status ? "bg-wine text-white" : "bg-white text-wine ring-1 ring-line"}`}
          >
            {status} {status === "All" ? all.length : all.filter((row) => row.status === status).length}
          </button>
        ))}
      </div>
      <Table
        loading={query.isPending}
        rows={query.data || []}
        empty="No enquiries yet."
        columns={["Applicant", "Parent", "Class", "Phone", "Date", "Status", ""]}
        render={(row: Admission) => (
          <tr key={row.id} className="border-t border-line">
            <td className="px-3 py-3 font-semibold">{row.child}<span className="block text-xs font-normal text-muted">Age {row.childAge}</span></td>
            <td className="px-3 py-3">{row.parent}<span className="block text-xs text-muted">{row.email}</span></td>
            <td className="px-3 py-3">{row.classApplying}</td>
            <td className="px-3 py-3">{row.phone}</td>
            <td className="px-3 py-3">{formatDate(row.createdAt)}</td>
            <td className="px-3 py-3">
              <select
                aria-label={`Status for ${row.child}`}
                value={row.status}
                onChange={(event) => update.mutate({ id: row.id, status: event.target.value })}
                className="rounded-lg border border-line px-2 py-1 text-sm"
              >
                {ADMISSION_STATUS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </td>
            <td className="px-3 py-3 text-right">
              <button type="button" className="text-sm font-semibold text-wine" onClick={() => setOpen(row)}>View</button>
              <button
                type="button"
                className="ml-3 text-sm font-semibold text-red-700"
                onClick={() => {
                  if (window.confirm(`Delete the enquiry for ${row.child}?`)) remove.mutate(row.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />
      {open && (
        <Modal title="Admission enquiry" onClose={() => setOpen(null)}>
          <dl className="space-y-2 text-sm">
            <Detail label="Child" value={`${open.child}, age ${open.childAge}`} />
            <Detail label="Class" value={open.classApplying} />
            <Detail label="Parent" value={open.parent} />
            <Detail label="Email" value={open.email} />
            <Detail label="Phone" value={open.phone} />
            <Detail label="Preferred contact" value={open.contactMethod} />
            <Detail label="Received" value={`${formatDate(open.createdAt)} at ${formatTime(open.createdAt)}`} />
            <Detail label="Message" value={open.message || "None"} />
          </dl>
          <a className="mt-5 inline-flex rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white no-underline" href={`mailto:${open.email}`}>
            Email parent
          </a>
        </Modal>
      )}
    </div>
  );
}

export function StudentsAdmin() {
  const site = useGetSite();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Student | "new" | null>(null);
  const query = useGetStudents(q);
  const save = useSaveStudent();
  const remove = useDeleteStudent();
  const classes = site.data?.config.levels.flatMap((level) => level.classes) || [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-wine-deep">Students</h1>
          <p className="mt-1 text-muted">Everyone currently enrolled.</p>
        </div>
        <button type="button" className="rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white" onClick={() => setEditing("new")}>
          Add student
        </button>
      </div>
      <label className="mt-5 block max-w-sm text-sm font-semibold">
        Search
        <input value={q} onChange={(event) => setQ(event.target.value)} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" placeholder="Name, class or parent" />
      </label>
      <Table
        loading={query.isPending}
        rows={query.data || []}
        empty="No students yet."
        columns={["Student", "Class", "Parent", "Phone", "Admitted", ""]}
        render={(row: Student) => (
          <tr key={row.id} className="border-t border-line">
            <td className="px-3 py-3 font-semibold">{row.name}</td>
            <td className="px-3 py-3">{row.className}</td>
            <td className="px-3 py-3">{row.parent}</td>
            <td className="px-3 py-3">{row.phone}</td>
            <td className="px-3 py-3">{formatDate(row.admitted)}</td>
            <td className="px-3 py-3 text-right">
              <button type="button" className="text-sm font-semibold text-wine" onClick={() => setEditing(row)}>Edit</button>
              <button
                type="button"
                className="ml-3 text-sm font-semibold text-red-700"
                onClick={() => {
                  if (window.confirm(`Delete ${row.name}?`)) remove.mutate(row.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />
      {editing && (
        <Modal title={editing === "new" ? "Add student" : "Edit student"} onClose={() => setEditing(null)}>
          <form
            className="grid gap-3"
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const data = Object.fromEntries(new FormData(event.currentTarget));
              save.mutate(
                {
                  id: editing === "new" ? undefined : editing.id,
                  name: String(data.name || ""),
                  className: String(data.className || ""),
                  parent: String(data.parent || ""),
                  phone: String(data.phone || ""),
                  admitted: String(data.admitted || ""),
                },
                { onSuccess: () => setEditing(null) },
              );
            }}
          >
            <label className="text-sm font-semibold">Full name<input name="name" required defaultValue={editing === "new" ? "" : editing.name} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
            <label className="text-sm font-semibold">
              Class
              <select name="className" required defaultValue={editing === "new" ? "" : editing.className} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal">
                <option value="">Select</option>
                {classes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">Parent / guardian<input name="parent" defaultValue={editing === "new" ? "" : editing.parent} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
            <label className="text-sm font-semibold">Phone<input name="phone" type="tel" defaultValue={editing === "new" ? "" : editing.phone} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
            <label className="text-sm font-semibold">Date admitted<input name="admitted" type="date" defaultValue={editing === "new" ? "" : editing.admitted.slice(0, 10)} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
            <button type="submit" disabled={save.isPending} className="mt-2 rounded-full bg-wine px-4 py-2 font-semibold text-white">
              {save.isPending ? "Saving…" : "Save"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function MessagesAdmin() {
  const [open, setOpen] = useState<ContactMessage | null>(null);
  const query = useGetMessages();
  const update = useUpdateMessage();
  const remove = useDeleteMessage();

  return (
    <div>
      <h1 className="font-display text-4xl text-wine-deep">Messages</h1>
      <p className="mt-1 text-muted">Messages sent from the website contact form.</p>
      <Table
        loading={query.isPending}
        rows={query.data || []}
        empty="No messages yet."
        columns={["Name", "Subject", "Message", "Date", "Status", ""]}
        render={(row: ContactMessage) => (
          <tr key={row.id} className={`border-t border-line ${row.status === "Unread" ? "bg-gold/10" : ""}`}>
            <td className="px-3 py-3 font-semibold">{row.name}<span className="block text-xs font-normal text-muted">{row.email}</span></td>
            <td className="px-3 py-3">{row.subject}</td>
            <td className="max-w-xs truncate px-3 py-3">{row.message}</td>
            <td className="px-3 py-3">{formatDate(row.createdAt)}</td>
            <td className="px-3 py-3">
              <select aria-label={`Status for message from ${row.name}`} value={row.status} onChange={(event) => update.mutate({ id: row.id, status: event.target.value })} className="rounded-lg border border-line px-2 py-1 text-sm">
                {MESSAGE_STATUS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </td>
            <td className="px-3 py-3 text-right">
              <button
                type="button"
                className="text-sm font-semibold text-wine"
                onClick={() => {
                  setOpen(row);
                  if (row.status === "Unread") update.mutate({ id: row.id, status: "Read" });
                }}
              >
                Open
              </button>
              <button type="button" className="ml-3 text-sm font-semibold text-red-700" onClick={() => { if (window.confirm(`Delete the message from ${row.name}?`)) remove.mutate(row.id, { onSuccess: () => setOpen(null) }); }}>
                Delete
              </button>
            </td>
          </tr>
        )}
      />
      {open && (
        <Modal title={open.subject} onClose={() => setOpen(null)}>
          <p className="text-sm text-muted">{open.name} · {open.email}{open.phone ? ` · ${open.phone}` : ""}</p>
          <p className="mt-4 whitespace-pre-wrap">{open.message}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine" onClick={() => update.mutate({ id: open.id, status: "Replied" })}>
              Mark as replied
            </button>
            <a className="rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white no-underline" href={`mailto:${open.email}?subject=${encodeURIComponent("Re: " + open.subject)}`}>
              Reply by email
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function ActivitiesAdmin() {
  const query = useGetActivities();
  const clear = useClearActivities();
  const rows = useMemo(() => query.data || [], [query.data]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-wine-deep">Activities</h1>
          <p className="mt-1 text-muted">A record of what has happened on the website and in the dashboard.</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine"
          onClick={() => {
            if (window.confirm("Clear the whole activity log?")) clear.mutate();
          }}
        >
          Clear log
        </button>
      </div>
      <Table
        loading={query.isPending}
        rows={rows}
        empty="No activity recorded."
        columns={["Activity", "Admin", "Date", "Time"]}
        render={(row: Activity) => (
          <tr key={row.id} className="border-t border-line">
            <td className="px-3 py-3 font-semibold">{row.text}</td>
            <td className="px-3 py-3">{row.admin}</td>
            <td className="px-3 py-3">{formatDate(row.createdAt)}</td>
            <td className="px-3 py-3">{formatTime(row.createdAt)}</td>
          </tr>
        )}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()} role="dialog" aria-label={title}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-wine-deep">{title}</h2>
          <button type="button" className="text-sm font-semibold" onClick={onClose} aria-label="Close">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Table<T>({
  rows,
  columns,
  render,
  empty,
  loading,
}: {
  rows: T[];
  columns: string[];
  render: (row: T) => React.ReactNode;
  empty: string;
  loading: boolean;
}) {
  if (loading) return <p className="mt-6 text-muted">Loading…</p>;
  if (!rows.length) return <p className="mt-6 rounded-2xl bg-white p-6 text-muted shadow-card">{empty}</p>;
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-tint text-xs uppercase tracking-wide text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column || "actions"} className="px-3 py-3 font-semibold">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(render)}</tbody>
      </table>
    </div>
  );
}
