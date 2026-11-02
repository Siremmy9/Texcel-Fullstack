"use client";

import { CtaBand, PageHero, SectionHead } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";

export function AcademicsView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <PageHero title="Academics" text="A balanced education: strong core subjects, ICT, sport, creative arts and character." />
          <section className="mx-auto max-w-site px-5 py-20">
            <SectionHead
              title="Our approach to learning"
              text="Curriculum, co-curricular activities, ICT education, sports, creative arts, leadership development and moral education."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {site.academicsApproach.map((item) => (
                <article key={item.id} className="rounded-2xl bg-tint p-6">
                  <h3 className="font-display text-2xl text-wine-deep">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="bg-tint py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="Subjects and programmes" text="A broad list that grows with each section of the school." />
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {site.academicsSubjects.map((subject) => (
                  <li key={subject} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card">
                    <Icon name="book" size={20} className="text-wine" />
                    <span className="font-semibold">{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <CtaBand title="See learning in action" text="Visit the school and sit in on a class." config={site.config} />
        </main>
      )}
    </SiteData>
  );
}
