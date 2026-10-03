'use client';

import { useEffect, useRef } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';

function edgePath(el: SVGElement): string | null {
  if (el instanceof SVGLineElement) {
    return `M${el.getAttribute('x1')} ${el.getAttribute('y1')}L${el.getAttribute('x2')} ${el.getAttribute('y2')}`;
  }
  if (el instanceof SVGPolylineElement) {
    const points = (el.getAttribute('points') ?? '').trim().split(/\s+/);
    return points.length > 1 ? `M${points.join('L')}` : null;
  }
  if (el instanceof SVGPathElement) return el.getAttribute('d');
  return null;
}

/**
 * Inline architecture diagram that draws its arrows when it scrolls into view,
 * then sends a small dot along every arrow to show the direction data moves.
 *
 * The SVG arrives fully drawn from the server. Animation is only added in the
 * browser, and never under reduced motion, so the static diagram is always
 * the fallback.
 */
export function LiveDiagram({ svg }: { svg: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const root = host?.querySelector('svg');
    if (!host || !root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Arrows are the edges that carry a marker; dashed lines are boundaries or
    // "dropped" paths and stay still.
    const edges = Array.from(root.querySelectorAll<SVGGeometryElement>('line, polyline, path')).filter(
      (el) => el.hasAttribute('marker-end') && !el.getAttribute('stroke-dasharray'),
    );
    if (edges.length === 0) return;

    for (const edge of edges) {
      const length = edge.getTotalLength();
      edge.style.strokeDasharray = `${length}`;
      edge.style.strokeDashoffset = `${length}`;
      edge.dataset.marker = edge.getAttribute('marker-end') ?? '';
      edge.removeAttribute('marker-end');
    }

    // Size dots relative to the drawing so they read the same at any viewBox.
    const viewWidth = root.viewBox.baseVal?.width || 1200;
    const dotRadius = (viewWidth / 260).toFixed(1);
    const dots: SVGCircleElement[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        edges.forEach((edge, i) => {
          const delay = i * 90;
          edge.style.transition = `stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
          edge.style.strokeDashoffset = '0';
          window.setTimeout(() => {
            if (edge.dataset.marker) edge.setAttribute('marker-end', edge.dataset.marker);
          }, delay + 650);

          const d = edgePath(edge);
          if (!d) return;
          const length = edge.getTotalLength();
          const dot = document.createElementNS(SVG_NS, 'circle');
          dot.setAttribute('r', dotRadius);
          dot.setAttribute('fill', '#7fe0bf');
          dot.style.filter = 'drop-shadow(0 0 6px rgba(127, 224, 191, 0.9))';
          const motion = document.createElementNS(SVG_NS, 'animateMotion');
          motion.setAttribute('path', d);
          motion.setAttribute('dur', `${Math.max(1.2, length / 90).toFixed(2)}s`);
          motion.setAttribute('begin', `${((delay + 800) / 1000 + (i % 4) * 0.35).toFixed(2)}s`);
          motion.setAttribute('repeatCount', 'indefinite');
          dot.appendChild(motion);
          edge.parentNode?.appendChild(dot);
          dots.push(dot);
        });
        // animateMotion timelines start at the SVG's own clock; restart it so
        // the begin offsets count from the moment the diagram became visible.
        root.setCurrentTime(0);
      },
      { threshold: 0.25 },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      dots.forEach((dot) => dot.remove());
      for (const edge of edges) {
        edge.style.removeProperty('stroke-dasharray');
        edge.style.removeProperty('stroke-dashoffset');
        edge.style.removeProperty('transition');
        if (edge.dataset.marker) edge.setAttribute('marker-end', edge.dataset.marker);
      }
    };
  }, [svg]);

  // The SVG is our own build-time file from /public, not user content.
  return <div ref={ref} className="[&>svg]:block [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />;
}
