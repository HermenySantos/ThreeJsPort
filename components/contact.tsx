import { contact, site } from '@/lib/content';
import { CopyEmail } from './copy-email';
import { SocialLinks } from './social-links';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div data-reveal className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{contact.heading}</h2>
        <div>
          <p className="text-[16px] leading-7 text-mute">{contact.lede}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CopyEmail email={site.email} />
            <a
              href={site.cv}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Download résumé (PDF)
            </a>
          </div>
          <SocialLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
