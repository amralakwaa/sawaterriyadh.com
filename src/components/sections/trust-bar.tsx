import { ShieldCheck, BadgeCheck, Clock, Headset, CreditCard, Truck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "ضمان موثّق",
    desc: "ضمان يصل إلى 15 سنة",
    color: "text-primary",
  },
  {
    icon: BadgeCheck,
    title: "جودة معتمدة",
    desc: "مواد معتمدة من SASO",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "تركيب سريع",
    desc: "خلال 24-48 ساعة",
    color: "text-primary",
  },
  {
    icon: Headset,
    title: "دعم 24/7",
    desc: "خدمة عملاء دائمة",
    color: "text-accent",
  },
  {
    icon: CreditCard,
    title: "تقسيط ميسّر",
    desc: "تابي وتمارا",
    color: "text-primary",
  },
  {
    icon: Truck,
    title: "معاينة مجانية",
    desc: "بدون أي التزام",
    color: "text-accent",
  },
];

export function TrustBar() {
  return (
    <section className="bg-foreground text-background py-6 border-y border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1.5 group"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-background/10 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-background">{item.title}</p>
                <p className="text-[10px] text-background/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
