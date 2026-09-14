import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-page flex-col justify-center px-6 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-label text-paper/40">404</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-paper">Page not found</h1>
      <p className="mt-4 max-w-md text-[16px] leading-8 text-mute">
        That route is not part of this site. The work, about, and contact sections live on the home page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit font-mono text-[11px] uppercase tracking-label text-ice">
        Back home
      </Link>
    </main>
  );
}
