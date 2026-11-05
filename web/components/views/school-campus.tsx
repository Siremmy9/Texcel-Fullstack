"use client";

import { PageHero } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";
import { media, waHref } from "@/lib/format";
import type { CampusInfo, CampusKey } from "@/lib/types";

const CAMPUS_DEFAULTS: Record<CampusKey, CampusInfo> = {
  primary: {
    name: "Primary School",
    principalName: "Primary School Principal",
    principalTitle: "Principal, Primary School",
    principalImage: "",
    welcomeMessage: "The Primary School principal's welcome message will be added soon.",
    address: "Primary School campus address will be added soon.",
    whatsapp: "",
    whatsappMessage: "Hello, I would like to know more about Texcel Primary School.",
    mapUrl: "",
  },
  secondary: {
    name: "Secondary School",
    principalName: "Secondary School Principal",
    principalTitle: "Principal, Secondary School",
    principalImage: "",
    welcomeMessage: "The Secondary School principal's welcome message will be added soon.",
    address: "Secondary School campus address will be added soon.",
    whatsapp: "",
    whatsappMessage: "Hello, I would like to know more about Texcel Secondary School.",
    mapUrl: "",
  },
};

export function SchoolCampusView({ campusKey }: { campusKey: CampusKey }) {
  const defaultCampus = CAMPUS_DEFAULTS[campusKey];

  return (
    <SiteData>
      {(site) => {
        const campus = { ...defaultCampus, ...site.config.campuses?.[campusKey] };
        const mapOk = /^https:\/\/(www\.google\.com\/maps\/embed|maps\.google\.com\/)/.test(campus.mapUrl);

        return (
          <main id="main">
            <PageHero
              title={campus.name}
              text={`Meet our principal, find the ${campus.name} campus, and contact the school directly.`}
            />

            <section className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">A welcome from our principal</p>
                <h2 className="mt-2 font-display text-4xl text-wine-deep">{campus.principalName}</h2>
                <p className="mt-1 font-semibold text-wine">{campus.principalTitle}</p>
                <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-muted">{campus.welcomeMessage}</p>
              </div>
              <div className="mx-auto w-full max-w-sm">
                {campus.principalImage ? (
                  <div className="arch h-[420px] w-full">
                    <img src={media(campus.principalImage)} alt={`Portrait of ${campus.principalName}`} />
                  </div>
                ) : (
                  <div className="grid h-[420px] place-items-center rounded-t-[999px] bg-wine-soft px-8 text-center text-sm font-semibold text-wine">
                    Add the principal's photo in the campus config in lib/mock-site.ts.
                  </div>
                )}
              </div>
            </section>

            <section className="bg-tint py-16">
              <div className="mx-auto grid max-w-site gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-3xl bg-white p-6 shadow-card">
                  <h2 className="font-display text-3xl text-wine-deep">Visit {campus.name}</h2>
                  <div className="mt-5 flex gap-3 text-muted">
                    <Icon name="pin" className="shrink-0 text-wine" />
                    <div>
                      <strong className="text-ink">Campus address</strong>
                      <p className="mt-1">{campus.address}</p>
                    </div>
                  </div>
                  {campus.whatsapp ? (
                    <a
                      href={waHref(campus)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 font-semibold text-white no-underline"
                    >
                      <Icon name="whatsapp" size={20} /> WhatsApp {campus.name}
                    </a>
                  ) : (
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-wine-soft px-5 py-3 font-semibold text-wine">
                      <Icon name="whatsapp" size={20} /> Add this campus's WhatsApp number in the config
                    </p>
                  )}
                </div>
                <div className="overflow-hidden rounded-3xl bg-white shadow-card">
                  {mapOk ? (
                    <iframe
                      title={`Map showing ${campus.name}`}
                      src={campus.mapUrl}
                      className="h-[360px] w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <p className="grid min-h-[360px] place-items-center px-8 text-center text-muted">
                      Add a Google Maps embed URL for this campus in the config.
                    </p>
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
