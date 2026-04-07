import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Travelers: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQs", href: "/faqs" },
    { label: "Reviews", href: "/reviews" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  "Tour Operators": [
    { label: "List Your Tour", href: "/list-your-tour" },
    { label: "Partner Portal", href: "/partner" },
    { label: "Commission Info", href: "/commission" },
  ],
  Support: [
    { label: "Help Center", href: "/help-center" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const socialLinks = [
  { Icon: SocialIcons.Instagram, href: "https://www.instagram.com/travelshopbooking/", label: "Instagram" },
  { Icon: SocialIcons.Facebook, href: "https://facebook.com/travelshopbooking/", label: "Facebook" },
  { Icon: SocialIcons.Twitter, href: "https://twitter.com/TSBooking", label: "Twitter" },
  { Icon: SocialIcons.YouTube, href: "https://www.youtube.com/channel/UCwpbctlSPfuRR_NkD6YBs3Q", label: "YouTube" },
  { Icon: SocialIcons.LinkedIn, href: "https://www.linkedin.com/company/travalshopbooking/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo dark />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Curated travel experiences that connect you with the world&rsquo;s most remarkable places.
            </p>
            <div className="space-y-2.5 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+90 212 000 0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>headoffice@travelshopbooking.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-purple-400 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label }) => (
                  <li key={label}>
                    <span className="text-sm text-slate-500 cursor-not-allowed" title="Coming soon">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-600">
            © 2026 HarmoniTravel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
