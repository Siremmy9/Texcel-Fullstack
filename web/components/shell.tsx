"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { media, waHref } from "@/lib/format";
import { useGetSite } from "@/hooks";

const NAV = [
  ["Home", "/"],
  ["About", "/about"],
  ["Our School", "/schools"],
  ["Academics", "/academics"],
  ["Fees", "/fees"],
  ["Facilities", "/facilities"],
  ["Gallery", "/gallery"],
  ["News", "/news"],
  ["Contact", "/contact"],
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useGetSite();
  const config = data?.config;
  const name = config?.name || "Texcel Schools";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to main content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
          scrolled
            ? "bg-white/95 text-wine-deep shadow-[0_6px_24px_-12px_rgba(60,10,25,0.3)] backdrop-blur-md"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1380px] items-center gap-4 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 text-inherit no-underline" aria-label={`${name} home`}>
            {config?.logo ? (
              <img src={media(config.logo)} alt="" className="h-12 w-12 object-contain" />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-wine text-sm font-bold text-gold">TS</span>
            )}
            <span className="font-display text-[1.05rem] font-bold uppercase leading-tight tracking-[0.05em]">{name}</span>
          </Link>
          <nav className="ml-auto hidden min-[1180px]:block" aria-label="Main navigation">
            <ul className="flex">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active(href) ? "page" : undefined}
                    className={`block rounded-full px-3 py-2 text-[0.95rem] font-semibold text-inherit no-underline ${
                      active(href) ? "rounded-none shadow-[inset_0_-3px_0_#d4a017]" : scrolled ? "hover:bg-wine-soft hover:text-wine" : "hover:bg-white/15"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-2 min-[1180px]:ml-4">
            {config && (
              <a
                className="hidden h-[46px] w-[46px] place-items-center rounded-full border-[1.5px] border-current no-underline hover:border-[#25d366] hover:bg-[#25d366] hover:text-white sm:grid"
                href={waHref(config)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
              >
                <Icon name="whatsapp" />
              </a>
            )}
            <Link
              href="/admissions#apply"
              className="hidden min-h-11 items-center rounded-full bg-gold px-5 text-sm font-bold text-[#240d15] no-underline shadow-[0_8px_22px_-10px_rgba(138,104,8,0.8)] min-[1180px]:inline-flex"
            >
              Apply
            </Link>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center rounded-xl text-inherit min-[1180px]:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? "close" : "menu"} size={26} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 bg-wine-deep text-white min-[1180px]:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="flex h-[76px] items-center justify-between px-5">
            <span className="font-display text-xl">{name}</span>
            <button type="button" className="grid h-11 w-11 place-items-center" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icon name="close" size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6" aria-label="Mobile navigation">
            {NAV.map(([label, href]) => (
              <Link key={href} href={href} className="border-b border-white/10 py-3 font-display text-2xl text-white no-underline">
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3 px-6">
            <Link href="/admissions#apply" className="rounded-full bg-gold px-5 py-3 text-center font-semibold text-ink no-underline">
              Apply Now
            </Link>
            {config && (
              <a href={waHref(config)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-white no-underline">
                <Icon name="whatsapp" size={20} /> WhatsApp us
              </a>
            )}
          </div>
        </div>
      )}

      <div>{children}</div>

      <footer className="bg-wine-deep text-white">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">{name}</p>
            <p className="mt-2 text-white/75">{config?.tagline}</p>
            {config && (
              <a href={waHref(config)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink no-underline">
                <Icon name="whatsapp" size={18} /> Chat on WhatsApp
                
              </a>
              
              
            )}
          </div>

          
          <div>
            <h2 className="font-display text-lg text-gold">Quick links</h2>
            <ul className="mt-3 space-y-2 text-white/85">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Admissions", "/admissions"],
                ["Fees", "/fees"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/85 no-underline hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg text-gold">School sections</h2>
            <ul className="mt-3 space-y-2">
              {(config?.levels || []).map((level) => (
                <li key={level.id}>
                  <Link href={`/schools#${level.id}`} className="text-white/85 no-underline hover:text-gold">
                    {level.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg text-gold">Contact</h2>
            {config && (
              <ul className="mt-3 space-y-3 text-sm text-white/85">
                <li className="flex gap-2">
                  <Icon name="phone" size={18} />
                  <a href={`tel:+${config.phone.replace(/\D/g, "")}`} className="text-white no-underline">
                    {config.phone}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${config.email}`} className="text-white no-underline">
                    {config.email}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Icon name="pin" size={18} />
                  <span>{config.addressLines.join(" ")}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} {name}. All Rights Reserved.</p>
            {/* <p>{config?.designer}</p> */}
            <Link href="https://sowfte.com/" className="text-white/80 no-underline hover:text-gold">
               Sowftech
            </Link>
          </div>
        </div>
      </footer>

      {config && (
        <a
          href={waHref(config)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-3 font-semibold text-white no-underline shadow-card"
        >
          <Icon name="whatsapp" size={26} />
          <span className="hidden sm:inline">Chat with us</span>
        </a>
      )}
    </>
  );
}

export function SiteData({ children }: { children: (site: NonNullable<ReturnType<typeof useGetSite>["data"]>) => React.ReactNode }) {
  const query = useGetSite();
  if (query.isPending) {
    return (
      <div className="mx-auto max-w-site px-5 py-24">
        <div className="h-8 w-48 animate-pulse rounded bg-line" />
        <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-line" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-line" />
      </div>
    );
  }
  if (query.isError || !query.data) {
    return (
      <div className="mx-auto max-w-site px-5 py-24">
        <h1 className="font-display text-3xl text-wine-deep">The school site could not load</h1>
        <p className="mt-3 max-w-xl text-muted">
          Start the API, then try again. It should be running at the address in NEXT_PUBLIC_API_URL.
        </p>
        <button type="button" onClick={() => query.refetch()} className="mt-6 rounded-full bg-wine px-5 py-2.5 font-semibold text-white">
          Try again
        </button>
      </div>
    );
  }
  return <>{children(query.data)}</>;
}
