import { site } from '@/lib/content';
import { GitHubIcon, LinkedInIcon } from './icons';

const links = [
  { href: site.github, label: 'GitHub', icon: GitHubIcon },
  { href: site.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
] as const;

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-paper/55 transition-colors hover:text-ice">
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
