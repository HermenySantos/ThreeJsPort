type MediaSlotProps = {
  title: string;
  src?: string;
};

export function MediaSlot({ title, src }: MediaSlotProps) {
  return (
    <figure className="media-slot">
      {src ? (
        // Local stills will be dropped into /public by a later pass.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="absolute inset-0 z-10 h-full w-full object-cover" />
      ) : null}
      <figcaption className="sr-only">{src ? title : `${title} — reserved 16:9 media slot`}</figcaption>
    </figure>
  );
}
