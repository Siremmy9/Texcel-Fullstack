import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 className="font-display text-5xl text-wine-deep">Page not found</h1>
        <p className="mt-3 text-muted">That address is not part of the school website.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-wine px-5 py-2.5 font-semibold text-white no-underline">
          Back home
        </Link>
      </div>
    </main>
  );
}
