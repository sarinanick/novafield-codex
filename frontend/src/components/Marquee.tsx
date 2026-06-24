const tools = [
  "OpenAI", "Midjourney", "Runway", "Claude", "Zapier",
  "Figma", "Canva", "ElevenLabs", "Sora", "DALL-E",
  "Stable Diffusion", "Replicate",
];

export default function Marquee() {
  return (
    <div className="bg-surface-soft border-y border-hairline py-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <p className="text-caption text-muted-foreground text-center mb-4">
          Popular AI tools used by freelancers on NovaField
        </p>
        <div
          className="flex items-center justify-center flex-wrap gap-2"
          role="list"
          aria-label="AI tools used by freelancers"
        >
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 text-body-sm text-muted-foreground bg-canvas border border-hairline rounded-full"
              role="listitem"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
