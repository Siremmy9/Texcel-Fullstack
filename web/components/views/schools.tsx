"use client";

import { CtaBand, LevelBlocks, PageHero } from "@/components/blocks";
import { SiteData } from "@/components/shell";

export function SchoolsView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="Our schools" text="Crèche, Nursery, Primary and Secondary. One family, four stages." />
          <section className="mx-auto max-w-site px-5 py-20">
            <LevelBlocks site={site} />
          </section>
          <CtaBand title="Not sure which section is right?" text="Tell us your child's age and we will help you choose." config={site.config} />
        </main>
      )}
    </SiteData>
  );
}
