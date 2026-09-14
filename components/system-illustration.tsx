export function SystemIllustration() {
  return (
    <div
      className="system-visual"
      role="img"
      aria-label="Conceptual illustration of audio guides, docent tablets, and kiosks connected through shared content and tour services."
    >
      <div className="visual-top">
        <span>ONE CONNECTED EXPERIENCE</span>
        <span>01 / SYSTEM STUDY</span>
      </div>
      <div className="device-scene" aria-hidden="true">
        <div className="device device-guide">
          <div className="device-camera" />
          <span className="device-label">AUDIO GUIDE</span>
          <div className="audio-orbit">
            <span>◖</span>
            <span>◗</span>
          </div>
          <div className="audio-bars">
            {Array.from({ length: 17 }, (_, i) => (
              <i key={i} style={{ height: `${12 + ((i * 13) % 31)}px` }} />
            ))}
          </div>
          <span className="device-caption">Explore at your pace</span>
          <div className="device-line" />
        </div>
        <div className="device device-tablet">
          <span className="device-label">GUIDED VISIT</span>
          <div className="tablet-title">
            A shared
            <br />
            <em>discovery.</em>
          </div>
          <div className="tour-route">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="tablet-footer">
            <span>Docent experience</span>
            <span>↗</span>
          </div>
        </div>
        <div className="device device-kiosk">
          <span className="device-label">DISCOVER</span>
          <div className="kiosk-art">
            <i />
            <i />
            <i />
          </div>
          <span className="device-caption">A space for curiosity</span>
          <div className="device-line" />
        </div>
        <div className="connection-line" />
        <div className="system-hub">
          Shared content <span>+</span> Tour services
        </div>
      </div>
      <div className="visual-bottom">
        <span>Apps · Content · Coordination</span>
        <span>Conceptual illustration</span>
      </div>
    </div>
  );
}
