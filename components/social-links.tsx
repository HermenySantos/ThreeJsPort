import { site } from '@/lib/content';
import { GitHubIcon, LinkedInIcon } from './icons';

const links = [
  { href: site.github, label: 'GitHub', icon: GitHubIcon },
  { href: site.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
] as const;

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white">
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
