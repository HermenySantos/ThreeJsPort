import { useEffect, useMemo, useState } from 'react';

import { getTypedLength } from './typeOnLoadText.helpers.js';

const TypeOnLoadText = ({ text, as: Component = 'span', className = '', stepMs = 40 }) => {
  const [visibleLength, setVisibleLength] = useState(0);
  const supportsReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    if (supportsReducedMotion) {
      setVisibleLength(text.length);
      return undefined;
    }

    const startedAt = performance.now();
    let frameId;

    const tick = (now) => {
      const nextLength = getTypedLength({
        textLength: text.length,
        elapsedMs: now - startedAt + stepMs,
        stepMs,
      });

      setVisibleLength(nextLength);

      if (nextLength < text.length) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [stepMs, supportsReducedMotion, text]);

  const visibleText = text.slice(0, visibleLength);
  const showCursor = visibleLength < text.length;

  return (
    <Component className={className}>
      {visibleText}
      <span aria-hidden="true" className={`typing-cursor${showCursor ? ' is-visible' : ''}`}>
        |
      </span>
    </Component>
  );
};

export default TypeOnLoadText;
