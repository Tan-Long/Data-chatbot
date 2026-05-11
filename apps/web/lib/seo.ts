import type { Metadata } from "next";

const siteUrl = "https://wellness-commerce.local";

export function buildMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: "Wellness Commerce",
      locale: "vi_VN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

