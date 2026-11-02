"use client";

import { CtaBand, PageHero, SectionHead } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { SiteData } from "@/components/shell";
import { FEE_FIELDS, waHref } from "@/lib/format";

const METHOD_ICONS = ["bank", "card", "building", "globe"];

export function FeesView() {
  return (
    <SiteData>
      {(site) => {
        const download = () => {
          const rows = [
            [`${site.config.name} - Fee Schedule`],
            [],
            ["Item", ...site.config.levels.map((level) => level.name)],
            ...FEE_FIELDS.map(([key, label]) => [
              label,
              ...site.config.levels.map((level) => site.fees.levels[level.id]?.[key] || "Contact School"),
            ]),
            [],
            ["Bank name", site.fees.payment.bankName],
            ["Account name", site.fees.payment.accountName],
            ["Account number", site.fees.payment.accountNumber],
          ];
          const csv = rows
            .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
            .join("\r\n");
          const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
          const link = document.createElement("a");
          link.href = url;
          link.download = "fee-schedule.csv";
          link.click();
          URL.revokeObjectURL(url);
        };

        return (
          <main id="main">
            <PageHero title="School fees" text="A clear look at fees for each section, and how families can pay." />
            <section className="mx-auto max-w-site px-5 py-16">
              <SectionHead title="Fees by section" text={site.fees.payment.note} />
              <div className="grid gap-5 lg:grid-cols-2">
                {site.config.levels.map((level) => (
                  <article key={level.id} className="rounded-3xl bg-white p-6 shadow-card">
                    <h3 className="font-display text-3xl text-wine-deep">{level.name}</h3>
                    <p className="text-sm text-gold-deep">{level.age}</p>
                    <dl className="mt-4 divide-y divide-line">
                      {FEE_FIELDS.map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between py-2 text-sm">
                          <dt className="text-muted">{label}</dt>
                          <dd className="font-semibold">₦{site.fees.levels[level.id]?.[key] || "Contact School"}</dd>
                        </div>
                      ))}
                    </dl>
                    <a
                      href={waHref(site.config, `Hello ${site.config.name}, please I would like to know the current fees for ${level.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-wine no-underline"
                    >
                      <Icon name="whatsapp" size={18} /> Ask about {level.name} fees
                    </a>
                  </article>
                ))}
              </div>
              <button type="button" onClick={download} className="mt-8 rounded-full border border-wine px-5 py-2.5 text-sm font-semibold text-wine">
                Download fee schedule
              </button>
            </section>
            <section className="bg-tint py-16">
              <div className="mx-auto grid max-w-site gap-8 px-5 lg:grid-cols-[1.4fr_.8fr]">
                <div>
                  <SectionHead title="How to pay" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {site.fees.payment.methods.map((method, index) => (
                      <article key={method.name} className="rounded-2xl bg-white p-5 shadow-card">
                        <Icon name={METHOD_ICONS[index % 4]} className="text-wine" />
                        <h3 className="mt-3 font-display text-xl text-wine-deep">{method.name}</h3>
                        <p className="mt-1 text-sm text-muted">{method.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <aside className="h-fit rounded-3xl bg-wine-deep p-6 text-white">
                  <h3 className="font-display text-2xl text-gold">Bank details</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-white/60">Bank name</dt>
                      <dd>{site.fees.payment.bankName}</dd>
                    </div>
                    <div>
                      <dt className="text-white/60">Account name</dt>
                      <dd>{site.fees.payment.accountName}</dd>
                    </div>
                    <div>
                      <dt className="text-white/60">Account number</dt>
                      <dd className="font-display text-2xl">{site.fees.payment.accountNumber}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm text-white/75">{site.fees.payment.instructions}</p>
                </aside>
              </div>
            </section>
            <CtaBand title="Questions about fees?" text="Message the school office and we will confirm the current schedule." config={site.config} />
          </main>
        );
      }}
    </SiteData>
  );
}
