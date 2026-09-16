import { site } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-page px-5 pb-10 pt-6 sm:px-8">
      <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-[13px] text-white/35">
          © {year} {site.fullName}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
