"use client";

const logos = [
  "OpenAI", "Google", "Meta", "Runway", "Stability AI", "Midjourney",
  "Anthropic", "Replicate", "Hugging Face", "Adobe", "Canva", "Figma",
];

export default function Marquee() {
  return (
    <div className="bg-inverse-canvas text-inverse-ink overflow-hidden" style={{ height: 36 }}>
      <div className="flex items-center h-full animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-body-sm mx-8 opacity-60">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
