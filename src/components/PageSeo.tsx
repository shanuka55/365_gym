import { useEffect } from "react";

type PageSeoProps = {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, unknown>;
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

const PageSeo = ({ title, description, canonical, schema }: PageSeoProps) => {
  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertCanonical(canonical);
  }, [canonical, description, title]);

  if (!schema) {
    return null;
  }

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

export default PageSeo;
