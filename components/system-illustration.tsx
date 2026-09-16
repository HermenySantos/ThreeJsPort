export function SystemIllustration() {
  return (
    <div
      className="system-visual"
      role="img"
      aria-label="Conceptual illustration of operator-controlled AI: a draft is reviewed and approved before it reaches the audience."
    >
      <div className="visual-top">
        <span>THE OPERATOR STAYS IN CONTROL</span>
        <span>01 / SYSTEM STUDY</span>
      </div>
      <div className="device-scene" aria-hidden="true">
        <div className="device device-guide">
          <div className="device-camera" />
          <span className="device-label">MODEL</span>
          <div className="audio-orbit">
            <span>◖</span>
            <span>◗</span>
          </div>
          <div className="audio-bars">
            {Array.from({ length: 17 }, (_, i) => (
              <i key={i} style={{ height: `${12 + ((i * 13) % 31)}px` }} />
            ))}
          </div>
          <span className="device-caption">Draft response</span>
          <div className="device-line" />
        </div>
        <div className="device device-tablet">
          <span className="device-label">OPERATOR CONSOLE</span>
          <div className="tablet-title">
            Review
            <br />
            <em>then approve.</em>
          </div>
          <div className="tour-route">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="tablet-footer">
            <span>Backstage control</span>
            <span>↗</span>
          </div>
        </div>
        <div className="device device-kiosk">
          <span className="device-label">AUDIENCE</span>
          <div className="kiosk-art">
            <i />
            <i />
            <i />
          </div>
          <span className="device-caption">Stage delivery</span>
          <div className="device-line" />
        </div>
        <div className="connection-line" />
        <div className="system-hub">
          Approval <span>+</span> Playback
        </div>
      </div>
      <div className="visual-bottom">
        <span>AI · Operator · Audience</span>
        <span>Conceptual illustration</span>
      </div>
    </div>
  );
}
