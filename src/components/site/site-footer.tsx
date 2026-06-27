import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram, Twitter, Send } from "lucide-react";
import { getSettings, getServices, getAreas } from "@/lib/data";

export async function SiteFooter() {
  const [settings, services, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getAreas(),
  ]);

  const featuredServices = services.slice(0, 6);
  const featuredAreas = areas.filter((a) => a.featured).slice(0, 5);

  return (
    <footer className="mt-auto bg-foreground text-background">
      {/* CTA strip */}
      <div className="bg-gradient-to-l from-primary to-accent">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground">
            <div className="text-center md:text-right">
              <h3 className="text-xl md:text-2xl font-display font-extrabold">
                جاهز لبدء مشروعك؟
              </h3>
              <p className="text-sm md:text-base opacity-90 mt-1">
                احصل على استشارة ومعاينة مجانية اليوم
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-bold text-primary shadow-lg hover:scale-105 transition-transform"
              >
                <Phone className="h-4 w-4" />
                اتصل الآن
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-bold text-background shadow-lg hover:scale-105 transition-transform"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13L12 4l9 9" />
                  <path d="M5 13v8h14v-8" />
                  <path d="M9 21v-5h6v5" />
                </svg>
              </div>
              <div>
                <p className="font-display font-extrabold text-lg">الظلال الملكية</p>
                <p className="text-xs text-background/60">مظلات • سواتر • حدادة</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              {settings.description}
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, label: "فيسبوك" },
                { icon: Instagram, label: "انستقرام" },
                { icon: Twitter, label: "تويتر" },
                { icon: Send, label: "تيليجرام" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm">خدماتنا</h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-bold mb-4 text-sm">مناطق الخدمة</h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              {featuredAreas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="hover:text-accent transition-colors">
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="text-accent hover:underline font-semibold">
                  عرض الكل ←
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{settings.addressFull}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-accent" dir="ltr">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-accent">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>{settings.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
            <p>© {new Date().getFullYear()} {settings.name}. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-accent">من نحن</Link>
              <Link href="/blog" className="hover:text-accent">المدونة</Link>
              <Link href="/contact" className="hover:text-accent">تواصل معنا</Link>
              <Link href="/quote" className="hover:text-accent">طلب تسعير</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
