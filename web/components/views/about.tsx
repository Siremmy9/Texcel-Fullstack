"use client";

import { AboutCards, CtaBand, PageHero, SectionHead, StaffGrid, Stats, Testimonials, Values } from "@/components/blocks";
import { SiteData } from "@/components/shell";
import { media } from "@/lib/format";

export function AboutView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="About us" text="Who we are, what we believe and the people who teach your children." />
          <section className="mx-auto grid max-w-site items-center gap-10 px-5 py-20 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl text-wine-deep">Raising confident, responsible young leaders In the society</h2>
              <p className="mt-4 text-lg text-muted">{site.config.about.intro}</p>
              <p className="mt-3 text-wine">{site.config.tagline}</p>
            </div>
            <div className="arch mx-auto h-[460px] w-full max-w-md">
              <img src={media(site.config.images.about)} alt="Pupils and teachers at the school" />
            </div>
          </section>
          <section className="bg-tint py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="Mission, vision and philosophy" />
              <AboutCards about={site.config.about} />
            </div>
          </section>
          <section className="mx-auto max-w-site px-5 py-20">
            <SectionHead title="Core values" text="Discipline, excellence, integrity, leadership, character and innovationsss" />
            <Values values={site.config.values} />
          </section>
          <section className="bg-wine py-14">
            <div className="mx-auto max-w-site px-5">
              <Stats stats={site.config.stats} />
            </div>
          </section>
          <section id="team" className="mx-auto max-w-site px-5 py-20">
            <SectionHead title="Meet our dedicated team" text="Teachers and staff who care about every child's progress." />
            <StaffGrid site={site} />
          </section>
          <section className="bg-wine py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="What parents say" light center />
              <Testimonials items={site.testimonials} />
            </div>
          </section>
          <CtaBand title="Come and see the school for yourself" text="Book a visit and meet the team." config={site.config} />
        </main>
      )}
    </SiteData>
  );
}
