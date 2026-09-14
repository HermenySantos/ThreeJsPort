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
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="text-2xl tracking-tight text-white transition-colors hover:text-white/70 sm:text-3xl">
        {email}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/55 transition-colors hover:border-white/40 hover:text-white">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
