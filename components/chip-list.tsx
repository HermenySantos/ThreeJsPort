export function ChipList({ chips }: { chips: readonly string[] }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-label text-paper/45">{chips.join(' · ')}</p>
  );
}
