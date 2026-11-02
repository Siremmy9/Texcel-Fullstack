"use client";

import { CtaBand, PageHero } from "@/components/blocks";
import { SiteData } from "@/components/shell";
import { media } from "@/lib/format";

export function FacilitiesView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="Facilities" text="Classrooms, laboratories, play spaces and the care that sits around them." />
          <section className="mx-auto grid max-w-site gap-6 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
            {site.facilities.map((facility) => (
              <article key={facility.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
                <img
                  src={media(facility.image) || media(site.config.logo)}
                  alt={`${facility.title} at ${site.config.name}`}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-display text-2xl text-wine-deep">{facility.title}</h3>
                  <p className="mt-2 text-sm text-muted">{facility.description}</p>
                </div>
              </article>
            ))}
          </section>
          <CtaBand title="Tour our facilities" text="Book a visit and walk through the school with us." config={site.config} />
        </main>
      )}
    </SiteData>
  );
}
