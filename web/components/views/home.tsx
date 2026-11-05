"use client";

import Link from "next/link";
import { CtaBand, GalleryGrid, NewsGrid, SchoolCards, SectionHead, Stats, Testimonials, Values } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";
import { media, waHref } from "@/lib/format";

export function HomeView() {
  return (
    <SiteData>
      {(site) => (
        <main id="main">
          <section className="relative flex min-h-svh items-center overflow-hidden bg-wine-deep text-white">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={media(site.config.heroPoster)}
              aria-hidden="true"
            >
              <source src={media(site.config.heroVideo)} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,31,62,0.93)_0%,rgba(18,31,62,0.74)_46%,rgba(18,31,62,0.35)_100%),linear-gradient(0deg,rgba(18,31,62,0.8)_0%,transparent_38%)]" />
            <div className="pointer-events-none absolute bottom-0 right-[max(4vw,1rem)] hidden aspect-[3/4] w-[min(34vw,430px)] rounded-t-[999px] border-2 border-b-0 border-gold/75 min-[1000px]:block" aria-hidden="true">
              <div className="absolute inset-[18px] rounded-t-[999px] border border-b-0 border-white/30" />
            </div>
            <div className="relative mx-auto w-full max-w-site px-5 pb-36 pt-32">
              <h1 className="max-w-[11ch] font-display text-[clamp(3.1rem,7vw,6.4rem)] leading-[0.96] tracking-tight text-white">{site.config.heroTitle}</h1>
              <p className="mt-3 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic leading-tight text-gold">{site.config.heroSubtitle}</p>
              <p className="mt-4 max-w-xl text-lg text-white/90">{site.config.heroText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/admissions#apply" className="inline-flex min-h-[50px] items-center rounded-full bg-gold px-6 font-bold text-ink no-underline shadow-[0_8px_22px_-10px_rgba(138,104,8,0.8)] hover:-translate-y-0.5">
                  Apply for Admission
                </Link>
                <a href="#schools" className="inline-flex min-h-[50px] items-center rounded-full border-2 border-white/65 bg-white/5 px-6 font-bold text-white no-underline backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white hover:text-wine-deep">
                  Explore Our School
                </a>
                <a href={waHref(site.config)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[50px] items-center gap-2 rounded-full border-2 border-white/65 bg-white/5 px-6 font-bold text-white no-underline backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white hover:text-wine-deep">
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
                 <a href="/admin#login" className="inline-flex min-h-[50px] items-center rounded-full border-2 border-white/65 bg-white/5 px-6 font-bold text-white no-underline backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white hover:text-wine-deep">
                  Admin Login
                </a>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-7">
              <ul className="mx-auto flex max-w-site flex-wrap items-center gap-x-1 gap-y-2 px-5 text-sm font-semibold text-white/90">
                {site.config.levels.map((level, index) => (
                  <li key={level.id} className="flex items-center">
                    {index > 0 && <span className="px-3 text-gold" aria-hidden="true">•</span>}
                    {level.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-auto grid max-w-site items-center gap-10 px-5 py-20 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl text-wine-deep">Integrity and Excellence is our heartbeat and watchword</h2>
              <p className="mt-4 text-lg text-muted">{site.config.about.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about" className="rounded-full bg-wine px-5 py-2.5 font-semibold text-white no-underline">
                  About our schools
                </Link>
                <Link href="/contact" className="rounded-full border border-wine px-5 py-2.5 font-semibold text-wine no-underline">
                  Visit us
                </Link>
              </div>
            </div>
            <div className="arch !rounded-[15px] overflow-hidden">
              <img src={media(site.config.images.about)} alt="Pupils learning together at the school" />
            </div>
          </section>

          <section className="bg-wine py-14">
            <div className="mx-auto max-w-site px-5">
              <Stats stats={site.config.stats} />
            </div>
          </section>

          <section id="schools" className="mx-auto max-w-site px-5 py-20">
            <SectionHead title="Our schools" text="Four sections, one family. Choose the stage that fits your child." />
            <SchoolCards site={site} />
          </section>

          <section className="bg-tint py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="What we stand for" text="Six values that shape lessons, playtime and the way we treat each other." />
              <Values values={site.config.values} />
            </div>
          </section>

          <section className="mx-auto max-w-site px-5 py-20">
            <SectionHead title="Life at school" text="A glimpse of classrooms, events and everyday moments." />
            <GalleryGrid items={site.gallery} categories={site.config.galleryCategories} limit={6} filters={false} />
            <Link href="/gallery" className="mt-8 inline-flex rounded-full border border-wine px-5 py-2.5 font-semibold text-wine no-underline">
              See the full gallery
            </Link>
          </section>

          <section className="bg-tint py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="News and events" text="Announcements, activities and updates for parents." />
              <NewsGrid items={site.news} limit={3} />
              <Link href="/news" className="mt-8 inline-flex rounded-full border border-wine px-5 py-2.5 font-semibold text-wine no-underline">
                All news and events
              </Link>
            </div>
          </section>

          <section className="bg-wine py-20">
            <div className="mx-auto max-w-site px-5">
              <SectionHead title="What parents say" light center />
              <Testimonials items={site.testimonials} />
            </div>
          </section>

          <CtaBand
            title="Begin your child's journey with us"
            text="Send an enquiry, book a visit or chat with the school office on WhatsApp. We will guide you through each step."
            config={site.config}
          />
        </main>
      )}
    </SiteData>
  );
}
