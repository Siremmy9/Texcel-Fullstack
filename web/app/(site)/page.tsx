import { HomeView } from "@/components/views/home";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Texcel Schools",
  slogan: "Raising The Joy of Nations",
  description: "Crèche, Pre School, Primary and College school on the Lekki-Epe Expressway, Lagos, Nigeria.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1, Texcel Close, Balogun Estate, Majek/Ajah",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeView />
    </>
  );
}
