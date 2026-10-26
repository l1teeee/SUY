"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { OliveSprig } from "./OliveSprig";
import { WaveRule } from "./WaveRule";

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin);

const BOIL_FRAME_DURATION = 0.14;
const BOIL_SEEDS = [1, 2, 3, 4, 5];

export function Greeting() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const firstLine = SplitText.create("[data-heading-first]", {
          type: "chars",
          smartWrap: true,
          tag: "span",
        });
        const secondLine = SplitText.create("[data-heading-second]", {
          type: "chars",
          smartWrap: true,
          tag: "span",
        });
        const message = SplitText.create("[data-typewriter]", {
          type: "chars",
          smartWrap: true,
          tag: "span",
        });

        gsap.set("[data-intro]", { visibility: "visible" });

        const boil = gsap.timeline({ repeat: -1, paused: true });
        BOIL_SEEDS.forEach((seed, index) => {
          boil.set("[data-boil-noise]", { attr: { seed } }, index * BOIL_FRAME_DURATION);
        });
        boil.set({}, {}, BOIL_SEEDS.length * BOIL_FRAME_DURATION);

        const intro = gsap.timeline();

        intro.fromTo(
          "[data-eyebrow]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2,
        );
        intro.fromTo(
          firstLine.chars,
          { opacity: 0, yPercent: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.04,
            ease: "power3.out",
          },
          0.4,
        );
        intro.set(firstLine.chars, { clearProps: "filter" }, ">");
        intro.fromTo(
          secondLine.chars,
          { opacity: 0, yPercent: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.8,
        );
        intro.set(secondLine.chars, { clearProps: "filter" }, ">");
        intro.fromTo(
          "[data-sprig] [data-draw]",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.6, stagger: 0.08, ease: "power2.inOut" },
          1.2,
        );
        intro.fromTo(
          "[data-olive-fill]",
          { fillOpacity: 0 },
          { fillOpacity: 0.85, duration: 0.6, ease: "power2.out" },
          ">",
        );
        intro.add(() => boil.play(), ">");
        intro.fromTo(
          message.chars,
          { opacity: 0 },
          { opacity: 1, duration: 0.01, stagger: 0.035, ease: "none" },
          1.6,
        );

        return () => {
          firstLine.revert();
          secondLine.revert();
          message.revert();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-intro]", { visibility: "visible" });
      });

      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative grid min-h-svh grid-rows-[1fr_auto] overflow-hidden px-4 pt-5 pb-5 lg:px-10 lg:pt-7 lg:pb-7"
    >
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <filter id="ink-edge" x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <main className="flex min-w-0 flex-col items-center justify-center py-10 text-center md:py-12">
        <p data-eyebrow data-intro className="mb-7 text-sm tracking-[0.2em] md:mb-8">
          hola · ciao · bonjour
        </p>
        <h1
          className="font-display text-[clamp(3.25rem,min(17vw,20svh),11.5rem)] leading-[0.9] font-[300] tracking-[-0.045em] mix-blend-multiply"
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1', filter: "url(#ink-edge)", fontKerning: "none" }}
        >
          <span data-heading-first data-intro className="block whitespace-nowrap">
            bienvenidos
          </span>
          <span data-heading-second data-intro className="block whitespace-nowrap text-aegean italic [word-spacing:0.12em]">
            a la mesa
          </span>
        </h1>

        <div data-sprig data-decorative className="mt-6 h-20 w-32 text-aegean md:h-[110px] md:w-44">
          <OliveSprig />
        </div>

        <p data-intro className="mt-6 max-w-[36ch] text-base leading-6">
          <span data-typewriter>una mesa larga, buena compañía y algo que celebrar.</span>
        </p>
      </main>

      <footer data-intro data-decorative className="-mx-4 h-6 lg:-mx-10">
        <WaveRule />
      </footer>
    </div>
  );
}
