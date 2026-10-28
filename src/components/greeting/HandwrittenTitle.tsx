import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { titleLettering } from "./titleLettering";

gsap.registerPlugin(DrawSVGPlugin);

const MIN_STROKE = 0.08;
const PEN_SPEED = 19723;
const PEN_LIFT = 0.012;
const WORD_GAP = 0.07;
const LINE_GAP = 0.12;

export function createTitleWriting(root: Element): gsap.core.Timeline {
  const glyphs = root.querySelector<SVGGElement>("[data-title-glyphs]");
  const strokes = root.querySelectorAll<SVGPathElement>("[data-pen-stroke]");
  const lines = root.querySelectorAll<SVGGElement>("[data-pen-line]");

  gsap.set(glyphs, { mask: "url(#title-ink)" });
  gsap.set(strokes, { drawSVG: "0%", visibility: "hidden" });

  const writing = gsap.timeline();
  let position = 0;

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) position += LINE_GAP;

    line.querySelectorAll<SVGGElement>("[data-pen-word]").forEach((word, wordIndex) => {
      if (wordIndex > 0) position += WORD_GAP;

      word.querySelectorAll<SVGPathElement>("[data-pen-stroke]").forEach((stroke, strokeIndex) => {
        if (strokeIndex > 0) position += PEN_LIFT;

        const duration = Math.max(MIN_STROKE, DrawSVGPlugin.getLength(stroke) / PEN_SPEED);
        writing.set(stroke, { visibility: "visible" }, position);
        writing.to(stroke, { drawSVG: "100%", duration, ease: "sine.inOut" }, position);
        position += duration;
      });
    });
  });

  writing.set(glyphs, { clearProps: "mask" }, position);
  return writing;
}

export function HandwrittenTitle() {
  return (
    <svg
      data-intro
      viewBox={titleLettering.viewBox}
      width={`${titleLettering.widthEm}em`}
      height={`${titleLettering.heightEm}em`}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
      style={{ display: "block" }}
    >
      <defs>
        <mask id="title-ink" maskUnits="userSpaceOnUse" {...titleLettering.maskBounds}>
          {titleLettering.lines.map((line, lineIndex) => (
            <g
              key={lineIndex}
              data-pen-line
              stroke="white"
              fill="none"
              strokeWidth={line.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {line.words.map((word, wordIndex) => (
                <g key={wordIndex} data-pen-word>
                  {word.letters.flatMap((letter) => letter.strokes).map((stroke, strokeIndex) => (
                    <path key={strokeIndex} data-pen-stroke d={stroke.d} strokeWidth={stroke.width} />
                  ))}
                  {word.letters.map((letter, letterIndex) => letter.dot && (
                    <path
                      key={`dot-${letterIndex}`}
                      data-pen-stroke
                      d={letter.dot.d}
                      strokeWidth={letter.dot.width}
                    />
                  ))}
                </g>
              ))}
            </g>
          ))}
        </mask>
      </defs>
      <g data-title-glyphs>
        {titleLettering.lines.map((line, lineIndex) => (
          <g key={lineIndex} fill="currentColor" className={line.tone === "aegean" ? "text-aegean" : undefined}>
            {line.words.map((word, wordIndex) => (
              <g key={wordIndex}>
                {word.letters.map((letter, letterIndex) => (
                  <path key={letterIndex} d={letter.outline} />
                ))}
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
