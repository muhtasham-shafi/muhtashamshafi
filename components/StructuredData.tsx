import { miracleRobotics, profile, socials } from "@/lib/content";
import { siteName, siteUrl } from "@/lib/site";

/**
 * Schema.org data so search engines understand who the site is about —
 * this is what can earn a richer result when someone searches the name.
 * Validate changes at https://validator.schema.org/
 */
const personId = `${siteUrl}/#person`;
const orgId = `${siteUrl}/#miracle-robotics`;

// Public profiles only (not chat links like WhatsApp).
const profileLinks = socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href);

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: [profile.fullName, profile.name],
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.fullName,
      alternateName: [siteName, profile.name, "Muhtasham Shafi", "Md. Muhtasham Musharof Shafi"],
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      jobTitle: "Founder, Miracle Robotics",
      description: profile.intro,
      email: `mailto:${profile.email}`,
      nationality: { "@type": "Country", name: "Bangladesh" },
      homeLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      },
      knowsAbout: ["Robotics", "Artificial intelligence", "Embedded systems", "Web development"],
      worksFor: { "@id": orgId },
      sameAs: profileLinks,
    },
    {
      "@type": "Organization",
      "@id": orgId,
      name: "Miracle Robotics",
      url: `${siteUrl}/miracle-robotics`,
      description: miracleRobotics.oneLiner,
      foundingDate: miracleRobotics.founded,
      founder: { "@id": personId },
      makesOffer: miracleRobotics.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.text },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
