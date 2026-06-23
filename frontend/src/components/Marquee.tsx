"use client";

const logos = [
  "OpenAI", "Google", "Meta", "Runway", "Stability AI", "Midjourney",
  "Anthropic", "Replicate", "Hugging Face", "Adobe", "Canva", "Figma",
];

export default function Marquee() {
  return (
    <div
      className="bg-inverse-canvas text-inverse-ink overflow-hidden"
      style={{ height: 36 }}
      role="marquee"
      aria-label="Partner logos"
      aria-live="off"
    >
      <div className="flex items-center h-full animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-body-sm mx-8 opacity-60" aria-hidden="true">
            {logo}
          </span>
        ))}
      </div>
      <span className="sr-only">Our partners include OpenAI, Google, Meta, Runway, Stability AI, Midjourney, Anthropic, Replicate, Hugging Face, Adobe, Canva, and Figma</span>
    </div>
  );
}
