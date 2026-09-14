import { contact, site } from '@/lib/content';
import { CopyEmail } from './copy-email';
import { SocialLinks } from './social-links';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{contact.heading}</h2>
        <div>
          <p className="text-[16px] leading-7 text-mute">{contact.lede}</p>
          <div className="mt-6">
            <CopyEmail email={site.email} />
          </div>
          <SocialLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
