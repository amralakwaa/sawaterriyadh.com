import { getSettings, getServices } from "@/lib/data";
import { SITE } from "@/lib/content";

export async function JsonLd() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE.url}/#business`,
    name: settings.name,
    alternateName: "Royal Shades Riyadh",
    description: settings.description,
    url: SITE.url,
    telephone: `+${settings.whatsapp}`,
    email: settings.email,
    image: "https://sfile.chatglm.cn/images-ppt/304f69241716.jpg",
    logo: `${SITE.url}/logo.svg`,
    priceRange: "$$",
    currenciesAccepted: "SAR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressRegion: settings.region,
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.lat,
      longitude: settings.lng,
    },
    areaServed: [
      { "@type": "City", name: "الرياض" },
      { "@type": "City", name: "الدرعية" },
      { "@type": "City", name: "الخرج" },
      { "@type": "AdministrativeArea", name: "منطقة الرياض" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "16:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "3400",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات المظلات والسواتر والحدادة",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortDesc,
        },
      })),
    },
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://twitter.com/",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE.url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
