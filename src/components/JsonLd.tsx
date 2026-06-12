import { baseURL, sameAs, schema } from "@/resources";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

type JsonLdProps = {
  locale: Locale;
  pageTitle: string;
  pageDescription: string;
  path?: string;
};

export function JsonLd({
  locale,
  pageTitle,
  pageDescription,
  path = "/",
}: JsonLdProps) {
  const pageUrl = `${baseURL}${localizedPath(path, locale)}`;
  const profileUrl = `${baseURL}${localizedPath("/about", locale)}`;

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${baseURL}/#website`,
      name: pageTitle,
      url: pageUrl,
      description: pageDescription,
      inLanguage: ["pl-PL", "en-US"],
      publisher: { "@id": `${baseURL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${baseURL}/#person`,
      name: schema.name,
      jobTitle: "Full-Stack Developer & Web Designer",
      description: schema.description,
      email: schema.email,
      url: profileUrl,
      image: `${baseURL}${schema.logo}`,
      sameAs: [sameAs.linkedin, "https://github.com/1choc"].filter(Boolean),
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Web Development",
        "SEO",
        "E-commerce",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${baseURL}/#service`,
      name:
        locale === "pl"
          ? "KGdev — strony i aplikacje webowe Next.js"
          : "KGdev — custom Next.js websites & web apps",
      description: pageDescription,
      url: pageUrl,
      areaServed: { "@type": "Country", name: "Poland" },
      serviceType: [
        "Web Development",
        "Next.js Development",
        "SEO Audits",
        "E-commerce",
      ],
      provider: { "@id": `${baseURL}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": `${baseURL}/#website` },
      inLanguage: locale === "pl" ? "pl-PL" : "en-US",
    },
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
