const footerLinks = {
  Product: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Become a freelancer", href: "/auth/register?role=freelancer" },
  ],
  Account: [
    { label: "Sign in", href: "/auth/login" },
    { label: "Create account", href: "/auth/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-section">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold text-ink">NovaField</span>
            </div>
            <p className="text-body-sm text-muted-foreground max-w-xs mb-6">
              AI services marketplace connecting clients with skilled AI freelancers.
            </p>
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
          <p className="text-caption text-muted-foreground">
            &copy; {new Date().getFullYear()} NovaField. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
