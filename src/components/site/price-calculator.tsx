"use client";

import { useState, useMemo } from "react";
import { Calculator, RotateCcw, Phone, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceOption {
  slug: string;
  title: string;
  pricePerM2: number;
  icon: string;
}

const SERVICES: ServiceOption[] = [
  { slug: "mawllat-siyarat", title: "مظلات السيارات", pricePerM2: 150, icon: "car" },
  { slug: "mawllat-hadaeq", title: "مظلات الحدائق والاستراحات", pricePerM2: 200, icon: "trees" },
  { slug: "mawllat-masabih", title: "مظلات المسابح", pricePerM2: 250, icon: "waves" },
  { slug: "sawatir", title: "السواتر", pricePerM2: 120, icon: "shield" },
  { slug: "hadada-faniya", title: "أعمال الحدادة الفنية", pricePerM2: 350, icon: "hammer" },
  { slug: "mawllat-madakhal", title: "مظلات المداخل والواجهات", pricePerM2: 300, icon: "door" },
  { slug: "hadada-hayakel", title: "هياكل حديدية ومستودعات", pricePerM2: 180, icon: "factory" },
  { slug: "mashrabiyat", title: "مشربيات وأساور", pricePerM2: 280, icon: "grid" },
];

const ADDONS = [
  { id: "lighting", label: "إضاءة LED", price: 800 },
  { id: "motor", label: "محرك أوتوماتيكي", price: 3500 },
  { id: "rail", label: "درابزين حديد", price: 450 },
  { id: "extra", label: "عزل حراري إضافي", price: 60 },
];

export function PriceCalculator() {
  const [serviceSlug, setServiceSlug] = useState(SERVICES[0].slug);
  const [area, setArea] = useState("50");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const service = useMemo(
    () => SERVICES.find((s) => s.slug === serviceSlug)!,
    [serviceSlug]
  );
  const areaNum = Math.max(0, parseFloat(area) || 0);
  const basePrice = areaNum * service.pricePerM2;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  // Extra insulation is per m2
  const extraInsulation = selectedAddons.includes("extra") ? areaNum * 60 : 0;
  const addonsFlat = selectedAddons
    .filter((id) => id !== "extra")
    .reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const subtotal = basePrice + addonsFlat + extraInsulation;
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const lowEstimate = Math.round(total * 0.9);
  const highEstimate = Math.round(total * 1.15);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setServiceSlug(SERVICES[0].slug);
    setArea("50");
    setSelectedAddons([]);
    setShowResult(false);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar-SA").format(Math.round(n));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
            اختر نوع الخدمة
          </Label>
          <Select value={serviceSlug} onValueChange={setServiceSlug}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.title} ({formatPrice(s.pricePerM2)} ريال/م²)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
            المساحة بالمتر المربع
          </Label>
          <Input
            type="number"
            min="1"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="h-12 text-base"
            placeholder="مثال: 50"
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {[30, 50, 80, 100, 150, 200].map((preset) => (
              <button
                key={preset}
                onClick={() => setArea(String(preset))}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  area === String(preset)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/70"
                }`}
              >
                {preset} م²
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</span>
            إضافات (اختياري)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {ADDONS.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-start gap-2 rounded-lg border p-3 text-right transition ${
                  selectedAddons.includes(addon.id)
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 shrink-0 mt-0.5 ${
                  selectedAddons.includes(addon.id) ? "border-accent bg-accent text-accent-foreground" : "border-border"
                }`}>
                  {selectedAddons.includes(addon.id) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{addon.label}</p>
                  <p className="text-xs text-muted-foreground">
                    +{formatPrice(addon.price)} ريال{addon.id === "extra" ? "/م²" : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowResult(true)}
            className="flex-1 h-12 bg-accent text-accent-foreground hover:brightness-110 text-base font-bold"
          >
            <Calculator className="h-5 w-5" />
            احسب السعر التقريبي
          </Button>
          <Button variant="outline" onClick={reset} size="icon" className="h-12 w-12">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-foreground text-background p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          {!showResult ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/10 mb-4">
                <Sparkles className="h-10 w-10 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                احسب تكلفة مشروعك
              </h3>
              <p className="text-sm text-background/70 max-w-xs">
                اختر الخدمة والمساحة والإضافات ثم اضغط احسب للحصول على تقدير فوري لسعر مشروعك
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                  <Sparkles className="h-3 w-3" />
                  تقدير فوري
                </span>
              </div>
              <h3 className="font-display text-lg font-bold mb-4">
                {service.title}
              </h3>

              {/* Price range */}
              <div className="rounded-xl bg-background/10 backdrop-blur-sm p-5 mb-4">
                <p className="text-xs text-background/70 mb-1">النطاق السعري التقديري</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold text-accent">
                    {formatPrice(lowEstimate)}
                  </span>
                  <span className="text-background/60">-</span>
                  <span className="font-display text-3xl font-extrabold text-accent">
                    {formatPrice(highEstimate)}
                  </span>
                  <span className="text-sm text-background/70">ريال</span>
                </div>
                <p className="text-xs text-background/60 mt-2">
                  شامل ضريبة القيمة المضافة (15%)
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-background/80">
                  <span>التكلفة الأساسية ({areaNum} م² × {formatPrice(service.pricePerM2)})</span>
                  <span className="font-semibold">{formatPrice(basePrice)} ريال</span>
                </div>
                {addonsFlat > 0 && (
                  <div className="flex justify-between text-background/80">
                    <span>الإضافات الثابتة</span>
                    <span className="font-semibold">{formatPrice(addonsFlat)} ريال</span>
                  </div>
                )}
                {extraInsulation > 0 && (
                  <div className="flex justify-between text-background/80">
                    <span>عزل حراري ({areaNum} م²)</span>
                    <span className="font-semibold">{formatPrice(extraInsulation)} ريال</span>
                  </div>
                )}
                <div className="flex justify-between text-background/80 pt-2 border-t border-background/20">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span className="font-semibold">{formatPrice(vat)} ريال</span>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-accent text-accent-foreground p-4 mb-3">
                <p className="text-xs mb-1 opacity-90">⚡ احصل على عرض سعر دقيق ومجاني</p>
                <p className="text-sm font-bold">التسعير النهائي قد يختلف حسب المعاينة الميدانية</p>
              </div>

              <Link
                href={`/quote?service=${serviceSlug}`}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-background text-primary px-5 py-3.5 text-sm font-bold hover:scale-[1.02] transition"
              >
                <Phone className="h-4 w-4" />
                اطلب تسعير دقيق ومجاني
              </Link>
              <p className="text-xs text-background/60 text-center mt-3">
                💡 السعر تقديري لأغراض التوضيح فقط
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
