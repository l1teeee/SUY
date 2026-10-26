"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const LINE_FRAMES = [
  "M0 12.5C180 10.8 340 13.6 520 12.2C700 10.9 880 13.3 1060 12C1120 11.6 1170 12.4 1200 11.8",
  "M0 11.2C160 13.4 360 10.9 540 12.8C720 14 900 11.1 1080 12.6C1130 13 1170 12 1200 12.9",
  "M0 10C200 11.2 380 12 600 12.5C800 13 980 13.6 1200 14.2",
  "M0 14C150 13.1 300 13.5 460 12.3C620 11 760 12.4 940 11.2C1060 10.5 1140 11 1200 10.1",
  "M0 12C220 13.5 420 10.6 620 11.7C820 13 1000 10.8 1200 12.4",
];

const FRAME_DURATION = 0.14;

export function WaveRule() {
  const line = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const path = line.current;

      const redraw = gsap.timeline({ repeat: -1, paused: true });
      LINE_FRAMES.forEach((frame, index) => {
        redraw.set(path, { attr: { d: frame } }, index * FRAME_DURATION);
      });
      redraw.set({}, {}, LINE_FRAMES.length * FRAME_DURATION);

      const appear = gsap.timeline({ delay: 2, onComplete: () => redraw.play() });
      appear.fromTo(
        path,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.2, ease: "steps(8)" },
      );
      // DrawSVG leaves an inline dash that would cut gaps in the path once its shape changes.
      appear.set(path, { clearProps: "strokeDasharray,strokeDashoffset" });
    });

    return () => media.revert();
  });

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 24"
      height="24"
      preserveAspectRatio="none"
      fill="none"
      style={{ color: "var(--color-aegean)" }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={line}
        d={LINE_FRAMES[0]}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
