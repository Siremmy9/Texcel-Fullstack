"use client";

import { NewsGrid, PageHero } from "@/components/blocks";
import { SiteData } from "@/components/shell";

export function NewsView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="News and events" text="Announcements, activities and updates for parents." />
          <section className="mx-auto max-w-site px-5 py-16">
            <NewsGrid items={site.news} />
          </section>
        </main>
      )}
    </SiteData>
  );
}
