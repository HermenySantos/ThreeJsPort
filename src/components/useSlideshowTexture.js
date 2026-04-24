import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { getNextIndex } from './projectSlideshow.helpers.js';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;
const CROSSFADE_MS = 600;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const drawImageFitted = (ctx, image, width, height, fit, alpha = 1) => {
  if (!image) return;
  const canvasRatio = width / height;
  const imageRatio = image.width / image.height;
  let drawWidth;
  let drawHeight;
  if (fit === 'contain') {
    if (imageRatio > canvasRatio) {
      drawWidth = width;
      drawHeight = width / imageRatio;
    } else {
      drawHeight = height;
      drawWidth = height * imageRatio;
    }
  } else if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
  }
  const dx = (width - drawWidth) / 2;
  const dy = (height - drawHeight) / 2;
  ctx.globalAlpha = alpha;
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
  ctx.globalAlpha = 1;
};

const drawCaption = (ctx, slide, index, total, width, height) => {
  if (!slide?.title) return;
  const stripHeight = 110;
  const gradient = ctx.createLinearGradient(0, height - stripHeight, 0, height);
  gradient.addColorStop(0, 'rgba(2, 6, 17, 0)');
  gradient.addColorStop(1, 'rgba(2, 6, 17, 0.92)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, height - stripHeight, width, stripHeight);

  ctx.fillStyle = 'rgba(125, 211, 252, 0.9)';
  ctx.font = '500 18px "Inter", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(
    `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    32,
    height - 64,
  );

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 30px "Inter", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(slide.title, 32, height - 32);
};

export const useSlideshowTexture = (slides, options = {}) => {
  const { intervalMs = 4200, fit = 'cover', backgroundColor = '#02060f', showCaption = true } = options;
  const [index, setIndex] = useState(0);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const transitionRef = useRef({ from: 0, to: 0, startedAt: 0, active: false });

  const enabled = Array.isArray(slides) && slides.length > 0;

  if (!canvasRef.current && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvasRef.current = canvas;
  }

  const texture = useMemo(() => {
    if (!enabled || !canvasRef.current) return null;
    const tex = new THREE.CanvasTexture(canvasRef.current);
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return undefined;
    let cancelled = false;
    setIndex(0);
    imagesRef.current = [];

    Promise.all(slides.map((slide) => loadImage(slide.src).catch(() => null))).then((images) => {
      if (cancelled) return;
      imagesRef.current = images;
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawImageFitted(ctx, images[0], CANVAS_WIDTH, CANVAS_HEIGHT, fit, 1);
      if (showCaption) {
        drawCaption(ctx, slides[0], 0, slides.length, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      if (texture) texture.needsUpdate = true;
    });

    return () => {
      cancelled = true;
    };
  }, [slides, enabled, texture, fit, backgroundColor, showCaption]);

  useEffect(() => {
    if (!enabled || slides.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = getNextIndex(current, slides.length);
        transitionRef.current = {
          from: current,
          to: next,
          startedAt: performance.now(),
          active: true,
        };
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides, enabled, intervalMs]);

  useEffect(() => {
    if (!enabled || !texture || !canvasRef.current) return undefined;

    const ctx = canvasRef.current.getContext('2d');

    const renderFrame = (now) => {
      const transition = transitionRef.current;
      const fromImage = imagesRef.current[transition.from];
      const toImage = imagesRef.current[transition.to];
      const elapsed = now - transition.startedAt;
      const progress = transition.active ? Math.min(1, elapsed / CROSSFADE_MS) : 1;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (transition.active && fromImage) {
        drawImageFitted(ctx, fromImage, CANVAS_WIDTH, CANVAS_HEIGHT, fit, 1 - progress);
      }
      drawImageFitted(
        ctx,
        toImage || imagesRef.current[index],
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        fit,
        progress,
      );
      if (showCaption) {
        drawCaption(ctx, slides[index], index, slides.length, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      texture.needsUpdate = true;

      if (progress >= 1) {
        transitionRef.current.active = false;
        animationFrameRef.current = null;
        return;
      }
      animationFrameRef.current = window.requestAnimationFrame(renderFrame);
    };

    animationFrameRef.current = window.requestAnimationFrame(renderFrame);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [index, slides, texture, enabled, fit, backgroundColor, showCaption]);

  useEffect(
    () => () => {
      if (texture) texture.dispose();
    },
    [texture],
  );

  return texture;
};
