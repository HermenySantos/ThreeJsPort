import { contact, site } from '@/lib/content';
import { CopyEmail } from './copy-email';
import { SocialLinks } from './social-links';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-page scroll-mt-24 px-6 pb-24 sm:px-10">
      <div className="grid gap-8 border-t border-white/[0.06] pt-16 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="font-mono text-[11px] uppercase tracking-label text-paper/40">{contact.heading}</h2>
        <div>
          <p className="text-[16px] leading-8 text-mute">{contact.lede}</p>
          <div className="mt-6">
            <CopyEmail email={site.email} />
          </div>
          <SocialLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
