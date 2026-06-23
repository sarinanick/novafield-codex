"use client";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "API Docs", href: "#" },
    { label: "Enterprise", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const socials = [
  { name: "X", href: "https://twitter.com", label: "Follow us on X (Twitter)" },
  { name: "GitHub", href: "https://github.com", label: "View our GitHub" },
  { name: "Discord", href: "https://discord.gg", label: "Join our Discord" },
  { name: "YouTube", href: "https://youtube.com", label: "Watch our YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-section">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold text-ink">NovaField</span>
            </div>
            <p className="text-body-sm text-muted-foreground max-w-xs mb-6">
              AI video and image generation platform with 30+ models. From concept to cinema in seconds.
            </p>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-surface-soft flex items-center justify-center text-caption text-muted-foreground hover:text-ink hover:bg-hairline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                >
                  {social.name[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h4 className="text-caption text-muted-foreground mb-4">{category}</h4>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label} role="listitem">
                    <a
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-hairline-soft">
          <p className="text-caption text-muted-foreground">© 2024 NOVAFIELD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0" role="list" aria-label="Legal links">
            <a
              href="#"
              className="text-caption text-muted-foreground hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="listitem"
            >
              PRIVACY
            </a>
            <a
              href="#"
              className="text-caption text-muted-foreground hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="listitem"
            >
              TERMS
            </a>
            <a
              href="#"
              className="text-caption text-muted-foreground hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="listitem"
            >
              COOKIES
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
