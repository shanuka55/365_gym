import { useEffect } from "react";

type PageSeoProps = {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, unknown>;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
};

const upsertMeta = (name: string, content: string) => {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const upsertPropertyMeta = (property: string, content: string) => {
  let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

const PageSeo = ({ title, description, canonical, schema, image = "https://www.365fitness.ae/og-banner.jpg", type = "website", publishedTime, modifiedTime, section }: PageSeoProps) => {
  useEffect(() => {
    const absoluteImage = new URL(image, canonical).href;
    document.title = title;
    upsertMeta("description", description);
    upsertCanonical(canonical);
    upsertPropertyMeta("og:title", title);
    upsertPropertyMeta("og:description", description);
    upsertPropertyMeta("og:url", canonical);
    upsertPropertyMeta("og:image", absoluteImage);
    upsertPropertyMeta("og:type", type);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:url", canonical);
    upsertMeta("twitter:image", absoluteImage);

    const articleMetadata = {
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:section": section,
    };
    Object.entries(articleMetadata).forEach(([property, value]) => {
      if (type === "article" && value) {
        upsertPropertyMeta(property, value);
      } else {
        document.querySelector(`meta[property="${property}"]`)?.remove();
      }
    });

    return () => {
      Object.keys(articleMetadata).forEach((property) => {
        document.querySelector(`meta[property="${property}"]`)?.remove();
      });
    };
  }, [canonical, description, image, title, type, publishedTime, modifiedTime, section]);

  if (!schema) {
    return null;
  }

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

export default PageSeo;
