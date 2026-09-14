'use client';

import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a href={`mailto:${email}`} className="font-display text-2xl tracking-tight text-paper transition-colors hover:text-ice sm:text-3xl">
        {email}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="font-mono text-[11px] uppercase tracking-label text-paper/45 transition-colors hover:text-ice">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
