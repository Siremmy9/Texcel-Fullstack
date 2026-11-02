"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";
import { useCreateMessage } from "@/hooks";
import { ApiError } from "@/lib/api";
import { telHref, waHref } from "@/lib/format";

export function ContactView() {
  return (
    <SiteData>
      {(site) => {
        const mapOk = /^https:\/\/(www\.google\.com\/maps\/embed|maps\.google\.com\/)/.test(site.config.mapUrl);
        return (
          <main id="main">
            <PageHero title="Contact us" text="We would love to hear from you. Visit, call, message us on WhatsApp or send a note." />
            <section className="mx-auto grid max-w-site gap-8 px-5 py-16 lg:grid-cols-2">
              <div className="rounded-3xl bg-tint p-6">
                <h2 className="font-display text-3xl text-wine-deep">{site.config.name}</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <Icon name="pin" className="text-wine" />
                    <span><strong>Address</strong><br />{site.config.addressLines.join(" ")}</span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="phone" className="text-wine" />
                    <span><strong>Phone</strong><br /><a href={telHref(site.config.phone)}>{site.config.phone}</a></span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="mail" className="text-wine" />
                    <span><strong>Email</strong><br /><a href={`mailto:${site.config.email}`}>{site.config.email}</a></span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="whatsapp" className="text-wine" />
                    <span><strong>WhatsApp</strong><br /><a href={waHref(site.config)} target="_blank" rel="noopener noreferrer">Start a chat</a></span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="clock" className="text-wine" />
                    <span><strong>Opening hours</strong><br />{site.config.openingHours}</span>
                  </li>
                </ul>
              </div>
              <ContactForm />
            </section>
            <section id="find-us" className="bg-tint py-16">
              <div className="mx-auto max-w-site px-5">
                <h2 className="font-display text-4xl text-wine-deep">Find us</h2>
                <p className="mt-2 text-muted">{site.config.location}</p>
                <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-card">
                  {mapOk ? (
                    <iframe title={`Map showing ${site.config.name}`} src={site.config.mapUrl} className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  ) : (
                    <p className="p-8 text-muted">Add a Google Maps embed URL in the school catalog.</p>
                  )}
                </div>
              </div>
            </section>
          </main>
        );
      }}
    </SiteData>
  );
}

function ContactForm() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");
  const mutation = useCreateMessage();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const name = String(data.name || "");
    if (String(data.website || "")) return;
    try {
      await mutation.mutateAsync({
        name,
        email: String(data.email || ""),
        phone: String(data.phone || ""),
        subject: String(data.subject || ""),
        message: String(data.message || ""),
        website: String(data.website || ""),
      });
      setSent(name);
      form.reset();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send the message.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card" role="status">
        <h2 className="font-display text-3xl text-wine-deep">Message sent</h2>
        <p className="mt-3 text-muted">Thank you, {sent}. We will reply as soon as we can.</p>
        <button type="button" className="mt-5 rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine" onClick={() => setSent("")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-card">
      <h2 className="font-display text-3xl text-wine-deep">Send us a message</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Name<input name="name" required autoComplete="name" className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
        <label className="text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
        <label className="text-sm font-semibold">Phone <span className="font-normal text-muted">(optional)</span><input name="phone" type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
        <label className="text-sm font-semibold">Subject<input name="subject" required className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
        <label className="text-sm font-semibold sm:col-span-2">Message<textarea name="message" required rows={5} className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal" /></label>
      </div>
      <label className="absolute -left-[9999px]" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <p className="mt-4 text-sm font-semibold text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={mutation.isPending} className="mt-6 rounded-full bg-wine px-5 py-3 font-semibold text-white disabled:opacity-60">
        {mutation.isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
