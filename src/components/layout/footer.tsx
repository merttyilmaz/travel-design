import { Zap, Mail, Phone, MapPin, Share2, Camera, MessageCircle, Play } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Our Team", "Careers", "Press", "Blog"],
  Travelers: ["How It Works", "FAQs", "Safety Policy", "Reviews", "Gift Cards"],
  "Tour Operators": [
    "List Your Tour",
    "Partner Portal",
    "Operator Resources",
    "Commission Info",
  ],
  Support: [
    "Help Center",
    "Cancellation Policy",
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Harmoni<span className="text-violet-400">Travel</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Curated ecotourism experiences that connect you with nature and
              culture responsibly.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-violet-400 shrink-0" />
                <span>+90 212 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-400 shrink-0" />
                <span>hello@harmonitravel.com</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Harmoni Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Share2, Camera, MessageCircle, Play].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-500 hover:text-violet-400 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
