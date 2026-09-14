import { contact, site } from '@/lib/content';
import { CopyEmail } from './copy-email';
import { SocialLinks } from './social-links';
export function Contact() {
  return (
    <section id="contact" className="section-shell contact-section">
      <p className="eyebrow">A good place to start</p>
      <div className="contact-grid">
        <h2>{contact.heading}</h2>
        <div>
          <p>{contact.lede}</p>
          <CopyEmail email={site.email} />
          <SocialLinks className="mt-8" />
        </div>
      </div>
    </section>
  );
}
