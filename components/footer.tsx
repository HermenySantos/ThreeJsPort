import { site } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-page px-6 pb-10 pt-6 sm:px-10">
      <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-label text-paper/35">
          © {year} {site.fullName}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
