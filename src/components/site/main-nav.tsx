"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ServiceData } from "@/lib/content";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا", hasMenu: true },
  { href: "/projects", label: "أعمالنا" },
  { href: "/offers", label: "العروض", badge: "خصم" },
  { href: "/areas", label: "مناطق الخدمة" },
  { href: "/blog", label: "المدونة" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function MainNav({ services }: { services: ServiceData[] }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) =>
        link.hasMenu ? (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href={link.href}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors rounded-md"
            >
              {link.label}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full right-0 pt-2 w-[520px] z-50">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-3 shadow-xl shadow-primary/10">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex flex-col gap-0.5 rounded-lg p-2.5 hover:bg-secondary transition-colors"
                    >
                      <span className="text-sm font-bold text-foreground">{s.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">{s.shortDesc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary/60"
          >
            {link.label}
            {link.badge && (
              <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                {link.badge}
              </span>
            )}
          </Link>
        )
      )}
    </nav>
  );
}

export function MobileNav({ services }: { services: ServiceData[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">القائمة</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[340px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-right">القائمة</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-semibold hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="px-4 mb-2 text-xs font-bold text-muted-foreground">الخدمات</p>
          <div className="flex flex-col gap-1">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm hover:bg-secondary"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground"
          >
            اطلب تسعير مجاني
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
