"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageHero } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";
import { useCreateAdmission } from "@/hooks";
import { ApiError } from "@/lib/api";
import { waHref } from "@/lib/format";

type Result = { reference: string; parent: string; child: string; classApplying: string; contactMethod: string };

export function AdmissionsView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="Admissions" text="A simple path from enquiry to enrolment. Start with a message and we will take it from there." />
          <section className="mx-auto max-w-site px-5 py-16">
            <h2 className="font-display text-4xl text-wine-deep">Begin your child&apos;s journey with us</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {site.config.admissionSteps.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-tint p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-wine font-display text-lg text-gold">{index + 1}</span>
                  <h3 className="mt-3 font-display text-xl text-wine-deep">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section id="apply" className="bg-tint py-16">
            <div className="mx-auto grid max-w-site gap-8 px-5 lg:grid-cols-[1fr_.8fr]">
              <EnquiryForm siteName={site.config.name} levels={site.config.levels} whatsapp={site.config} />
              <aside className="h-fit rounded-3xl bg-wine-deep p-6 text-white">
                <h2 className="font-display text-3xl text-white">Prefer to talk first?</h2>
                <p className="mt-3 text-white/80">Call, email or send a WhatsApp message. The office replies during opening hours.</p>
                <p className="mt-4 font-semibold">{site.config.phone}</p>
                <p>{site.config.email}</p>
                <a href={waHref(site.config)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-semibold text-ink no-underline">
                  <Icon name="whatsapp" size={18} /> WhatsApp the office
                </a>
              </aside>
            </div>
          </section>
        </main>
      )}
    </SiteData>
  );
}

function EnquiryForm({
  levels,
  siteName,
  whatsapp,
}: {
  levels: { id: string; name: string; classes: string[] }[];
  siteName: string;
  whatsapp: { whatsapp: string; whatsappMessage: string; name: string };
}) {
  const params = useSearchParams();
  const preset = levels.find((level) => level.id === params.get("level"));
  const [error, setError] = useState("");
  const [done, setDone] = useState<Result | null>(null);
  const mutation = useCreateAdmission();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (String(data.website || "")) return;
    try {
      const result = await mutation.mutateAsync({
        parent: String(data.parent || ""),
        email: String(data.email || ""),
        phone: String(data.phone || ""),
        child: String(data.child || ""),
        childAge: String(data.childAge || ""),
        classApplying: String(data.classApplying || ""),
        contactMethod: String(data.contactMethod || ""),
        message: String(data.message || ""),
        website: String(data.website || ""),
      });
      setDone({
        reference: result.reference,
        parent: String(data.parent || ""),
        child: String(data.child || ""),
        classApplying: String(data.classApplying || ""),
        contactMethod: String(data.contactMethod || ""),
      });
      form.reset();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send the enquiry.");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card" role="status">
        <h2 className="font-display text-3xl text-wine-deep">Thank you, {done.parent}.</h2>
        <p className="mt-3 text-muted">
          We have received the admission enquiry for <strong>{done.child}</strong> ({done.classApplying}). Our team will contact you by {done.contactMethod.toLowerCase()} soon.
        </p>
        <p className="mt-3 font-semibold">Your reference: {done.reference}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white no-underline"
            href={waHref(whatsapp, `Hello ${siteName}, I have just submitted an admission enquiry for ${done.child} (${done.classApplying}). Reference: ${done.reference}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} /> Message us on WhatsApp
          </a>
          <button type="button" className="rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine" onClick={() => setDone(null)}>
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-card" noValidate>
      <h2 className="font-display text-3xl text-wine-deep">Admission enquiry</h2>
      <p className="mt-2 text-muted">Tell us about your child and we will get back to you.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Parent/Guardian name" name="parent" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Child's name" name="child" required />
        <Field label="Child's age" name="childAge" type="number" required min={0} max={25} />
        <label className="block text-sm font-semibold">
          Class applying for
          <select name="classApplying" required defaultValue={preset?.classes[0] || ""} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal">
            <option value="">Select a class</option>
            {levels.map((level) => (
              <optgroup key={level.id} label={level.name}>
                {level.classes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Preferred contact method
          <select name="contactMethod" required defaultValue="" className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal">
            <option value="">Select an option</option>
            <option>Phone call</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Message <span className="font-normal text-muted">(optional)</span>
          <textarea name="message" rows={4} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" />
        </label>
      </div>
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {error && <p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={mutation.isPending} className="mt-6 rounded-full bg-wine px-5 py-3 font-semibold text-white disabled:opacity-60">
        {mutation.isPending ? "Sending…" : "Submit Admission Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        min={min}
        max={max}
        className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal"
      />
    </label>
  );
}
