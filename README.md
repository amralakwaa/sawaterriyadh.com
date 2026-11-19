<div dir="rtl">

# الظلال الملكية - مظلات وسواتر الرياض | Royal Shades Riyadh

**موقع شركة مظلات وسواتر في الرياض** مبني بـ Next.js، معه لوحة تحكم لإدارة الخدمات والمشاريع والمقالات وطلبات الأسعار والتذاكر.

</div>

---

## ماذا يحتوي المشروع؟ | What's inside

<div dir="rtl">

### الواجهة العامة
- صفحات خدمات ديناميكية (`/services/[slug]`)، ومناطق الخدمة (`/areas/[slug]`)، والمشاريع، والمدونة مع وسوم.
- صفحات الأسعار، والمقارنة، والعروض، وبرنامج الولاء، والشهادات، والفريق، والأسئلة الشائعة.
- نموذج طلب عرض سعر، ونموذج تواصل، ومركز دعم بتذاكر، ومحادثة مباشرة، وبحث داخل الموقع.
- خريطة موقع و`robots` يولّدهما Next.js تلقائياً.

### لوحة التحكم
- إدارة الخدمات، والمناطق، والمشاريع، والمقالات، وآراء العملاء، وطلبات الأسعار، والرسائل، وتذاكر الدعم.
- قاعدة بيانات بـ 13 نموذجاً في Prisma: الخدمات، والمشاريع، وطلبات الأسعار، والرسائل، والمناطق، والمقالات، والآراء، والأسئلة، والمميزات، والإحصاءات، وخطوات العمل، والإعدادات، والتذاكر.
- التحقق من المدخلات بـ Zod.

</div>

## التقنيات | Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui, Framer Motion |
| Data | Prisma 6, SQLite |
| Runtime | Bun (standalone build) |

## التشغيل محلياً | Local setup

```bash
git clone https://github.com/amralakwaa/sawaterriyadh.com.git
cd sawaterriyadh.com
bun install
bun run db:generate
bun run db:push
bun run dev
```

---

<div dir="rtl">

## المطوّر | Developer

صمّم الموقع وطوّره **عمر بلال الأكوع** ([@amralakwaa](https://github.com/amralakwaa)).

## الحقوق

جميع الحقوق محفوظة. محتوى الموقع وعلامته التجارية ملك أصحابه.

</div>
