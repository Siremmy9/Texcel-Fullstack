"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { formatDate, media, waHref } from "@/lib/format";
import type { GalleryItem, NewsItem, SchoolConfig, SitePayload, Testimonial } from "@/lib/types";

export function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-wine-deep pt-36 pb-16 text-white">
      <div className="pointer-events-none absolute bottom-0 right-[6%] hidden aspect-[3/4] w-[clamp(160px,22vw,300px)] rounded-t-[999px] border-2 border-b-0 border-gold/55 md:block" aria-hidden="true" />
      <div className="relative mx-auto max-w-site px-5">
        <h1 className="font-display text-5xl text-white md:text-6xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">{text}</p>
      </div>
    </section>
  );
}

export function SectionHead({
  title,
  text,
  light,
  center,
}: {
  title: string;
  text?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className={`font-display text-4xl ${light ? "text-white" : "text-wine-deep"}`}>{title}</h2>
      {text && <p className={`mt-3 text-lg ${light ? "text-white/80" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

export function Stats({ stats }: { stats: SchoolConfig["stats"] }) {
  const items = [
    [stats.years, "Years of Excellence", "+"],
    [stats.students, "Students", "+"],
    [stats.staff, "Qualified Staff", "+"],
    [stats.programs, "School Programs", ""],
  ] as const;
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {items.map(([value, label, suffix]) => (
        <div key={label} className="text-center">
          <strong className="block font-display text-4xl text-gold md:text-5xl">
            <CountUp value={value} suffix={suffix} />
          </strong>
          <span className="mt-1 block text-sm text-white/80">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <>
      {shown.toLocaleString("en-NG")}
      {suffix}
    </>
  );
}

export function SchoolCards({ site }: { site: SitePayload }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {site.config.levels.map((level) => (
        <article key={level.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="arch mx-auto mt-4 h-64 w-[78%]">
            <img src={media(site.config.images[level.id])} alt={`${level.name} section at ${site.config.name}`} />
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{level.age}</p>
            <h3 className="mt-1 font-display text-2xl text-wine-deep">{level.name}</h3>
            <p className="mt-2 text-sm text-muted">{level.desc}</p>
            <Link href={`/schools#${level.id}`} className="mt-4 inline-flex text-sm font-semibold text-wine no-underline">
              Learn more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function LevelBlocks({ site }: { site: SitePayload }) {
  return (
    <div className="space-y-16">
      {site.config.levels.map((level) => (
        <article key={level.id} id={level.id} className="grid items-center gap-8 scroll-mt-28 lg:grid-cols-2">
          <div className="arch mx-auto h-[420px] w-full max-w-md">
            <img src={media(site.config.images[level.id])} alt={`${level.name} section at ${site.config.name}`} />
          </div>
          <div>
            <h2 className="font-display text-4xl text-wine-deep">{level.name}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-deep">{level.age}</p>
            <p className="mt-4 text-lg text-muted">{level.desc}</p>
            <h3 className="mt-6 font-display text-xl text-wine">What children experience</h3>
            <ul className="mt-3 space-y-2">
              {level.focus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" size={18} className="mt-1 text-forest" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/admissions?level=${level.id}#apply`} className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white no-underline">
                Apply to {level.name}
              </Link>
              {(level.id === "primary" || level.id === "college") && (
                <Link
                  href={level.id === "primary" ? "/schools/primary" : "/schools/secondary"}
                  className="inline-flex items-center rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine no-underline"
                >
                  Explore {level.id === "primary" ? "Primary" : "Secondary"} School
                </Link>
              )}
              <a
                href={waHref(site.config, `Hello ${site.config.name}, I would like to know more about your ${level.name} section.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine no-underline"
              >
                <Icon name="whatsapp" size={18} /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Values({ values }: { values: SchoolConfig["values"] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value) => (
        <li key={value.title} className="rounded-2xl bg-white p-5 shadow-card">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-wine-soft text-wine">
            <Icon name={value.icon} size={24} />
          </span>
          <h3 className="mt-4 font-display text-2xl text-wine-deep">{value.title}</h3>
          <p className="mt-2 text-muted">{value.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function AboutCards({ about }: { about: SchoolConfig["about"] }) {
  const cards = [
    ["Educational Philosophy", about.mission],
    ["Our Mandate", about.mandate],
    ["Our Activities", about.activities],
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map(([title, text]) => (
        <article key={title} className="rounded-2xl bg-white p-6 shadow-card">
          <h3 className="font-display text-2xl text-wine-deep">{title}</h3>
          <p className="mt-3 text-muted">{text}</p>
        </article>
      ))}
    </div>
  );
}

export function StaffGrid({ site }: { site: SitePayload }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {site.staff.map((person) => (
        <article key={person.id} className="text-center">
          <div className="arch mx-auto h-72 w-52">
            <img src={media(person.photo)} alt={`Photo of ${person.name}`} />
          </div>
          <h3 className="mt-4 font-display text-2xl text-wine-deep">{person.name}</h3>
          <p className="font-semibold text-wine">{person.position}</p>
          {person.department && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">{person.department}</p>}
          <p className="mt-2 text-sm text-muted">{person.bio}</p>
        </article>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  text,
  config,
}: {
  title: string;
  text: string;
  config: SchoolConfig;
}) {
  return (
    <section className="bg-gold">
      <div className="mx-auto max-w-site px-5 py-16 text-center">
        <h2 className="font-display text-4xl text-wine-deep">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink/80">{text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/admissions#apply" className="rounded-full bg-wine px-5 py-3 font-semibold text-white no-underline">
            Apply for Admission
          </Link>
          <a href={waHref(config)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-wine-deep/30 px-5 py-3 font-semibold text-wine-deep no-underline">
            <Icon name="whatsapp" size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function NewsGrid({ items, limit }: { items: NewsItem[]; limit?: number }) {
  const [open, setOpen] = useState<NewsItem | null>(null);
  const list = items
    .filter((item) => item.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit || undefined);

  if (!list.length) return <p className="text-muted">No news published yet. Please check back soon.</p>;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
            <img src={media(item.image) || media("assets/images/logo.jpg")} alt="" className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                {item.category} · <time dateTime={item.date}>{formatDate(item.date)}</time>
              </p>
              <h3 className="mt-2 font-display text-2xl text-wine-deep">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.excerpt}</p>
              <button type="button" className="mt-4 font-semibold text-wine" onClick={() => setOpen(item)}>
                Read more
              </button>
            </div>
          </article>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={() => setOpen(null)}>
          <article className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white" onClick={(event) => event.stopPropagation()} aria-label="News article">
            <img src={media(open.image) || media("assets/images/logo.jpg")} alt="" className="h-64 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                {open.category} · {formatDate(open.date)}
              </p>
              <h2 className="mt-2 font-display text-3xl text-wine-deep">{open.title}</h2>
              {(open.content || open.excerpt).split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph} className="mt-3 text-muted">{paragraph}</p>
              ))}
              <button type="button" className="mt-6 rounded-full border border-wine px-4 py-2 text-sm font-semibold text-wine" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export function GalleryGrid({
  items,
  categories,
  limit,
  filters = true,
}: {
  items: GalleryItem[];
  categories: string[];
  limit?: number;
  filters?: boolean;
}) {
  const [active, setActive] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const filtered = active === "All" ? items : items.filter((item) => item.category === active);
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {filters && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                active === category ? "bg-wine text-white" : "bg-white text-wine ring-1 ring-line"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {shown.length === 0 ? (
        <p className="text-muted">No photos in this category yet.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shown.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              className="mb-4 block w-full overflow-hidden rounded-2xl"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Open photo: ${item.caption || item.category}`}
            >
              <img src={media(item.image)} alt={item.caption || item.category} className="w-full object-cover" />
              <span className="mt-2 block text-left text-sm font-semibold text-wine">{item.caption || item.category}</span>
            </button>
          ))}
        </div>
      )}
      {index !== null && shown[index] && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4" onClick={() => setIndex(null)}>
          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <img src={media(shown[index].image)} alt={shown[index].caption} className="max-h-[75vh] w-full rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-white">
              {shown[index].caption} · {shown[index].category} ({index + 1} of {shown.length})
            </figcaption>
            <div className="mt-4 flex justify-center gap-3">
              <button type="button" className="rounded-full bg-white px-4 py-2 font-semibold" onClick={() => setIndex((index + shown.length - 1) % shown.length)}>
                Previous
              </button>
              <button type="button" className="rounded-full bg-white px-4 py-2 font-semibold" onClick={() => setIndex((index + 1) % shown.length)}>
                Next
              </button>
              <button type="button" className="rounded-full bg-gold px-4 py-2 font-semibold" onClick={() => setIndex(null)}>
                Close
              </button>
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % items.length), 7000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return <p className="text-white/80">Parent stories will appear here.</p>;
  const item = items[index];

  return (
    <div className="mx-auto max-w-3xl text-center" role="region" aria-roledescription="carousel" aria-label="Parent testimonials">
      <blockquote>
        <p className="font-display text-2xl leading-snug text-white md:text-3xl">“{item.quote}”</p>
      </blockquote>
      <div className="mt-6 flex items-center justify-center gap-3">
        {item.photo ? (
          <img src={media(item.photo)} alt="" className="h-12 w-12 rounded-full object-cover" />
        ) : null}
        <p className="text-left text-white/90">
          <strong className="block">{item.name}</strong>
          <span className="text-sm text-white/70">{item.childClass}</span>
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" aria-label="Previous testimonial" onClick={() => setIndex((index + items.length - 1) % items.length)}>
          <Icon name="chevL" />
        </button>
        {items.map((entry, dot) => (
          <button key={entry.id} type="button" aria-label={`Show testimonial ${dot + 1}`} aria-current={dot === index ? "true" : undefined} onClick={() => setIndex(dot)} className={`h-2.5 w-2.5 rounded-full ${dot === index ? "bg-gold" : "bg-white/40"}`} />
        ))}
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % items.length)}>
          <Icon name="chevR" />
        </button>
      </div>
    </div>
  );
}
