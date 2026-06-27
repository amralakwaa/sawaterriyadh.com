import Link from "next/link";
import { Home, Search, Phone, ArrowLeft, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Big 404 */}
        <div className="relative inline-block mb-8">
          <h1 className="font-display text-[120px] sm:text-[180px] font-extrabold leading-none gradient-text">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench className="h-16 w-16 sm:h-24 sm:w-24 text-primary/20 animate-float" />
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
          الصفحة غير موجودة
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          لا تقلق - يمكننا مساعدتك في العثور على ما تحتاجه.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { href: "/", label: "الرئيسية", icon: Home },
            { href: "/services", label: "خدماتنا", icon: Wrench },
            { href: "/projects", label: "أعمالنا", icon: Search },
            { href: "/quote", label: "اطلب تسعير", icon: ArrowLeft },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <link.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Or call us */}
        <div className="rounded-2xl bg-gradient-to-br from-primary to-accent text-background p-6">
          <p className="text-sm text-background/80 mb-2">أو تواصل معنا مباشرة</p>
          <a
            href="tel:0501234567"
            className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-base font-bold text-primary hover:scale-105 transition"
          >
            <Phone className="h-5 w-5" />
            <span dir="ltr">050 123 4567</span>
          </a>
        </div>
      </div>
    </div>
  );
}
