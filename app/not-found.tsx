import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-page flex-col justify-center px-5 sm:px-8">
      <p className="text-[11px] uppercase tracking-label text-white/40">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-white">Page not found</h1>
      <p className="mt-4 max-w-md text-[16px] leading-7 text-mute">
        That route is not part of this site. The work, about, and contact sections live on the home page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black">
        Back home
      </Link>
    </main>
  );
}
