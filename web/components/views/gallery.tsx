"use client";

import { GalleryGrid, PageHero } from "@/components/blocks";
import { SiteData } from "@/components/shell";

export function GalleryView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="Gallery" text="Classrooms, events, sports and the everyday life of the school." />
          <section className="mx-auto max-w-site px-5 py-16">
            <GalleryGrid items={site.gallery} categories={site.config.galleryCategories} />
          </section>
        </main>
      )}
    </SiteData>
  );
}
