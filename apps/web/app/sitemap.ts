import type { MetadataRoute } from "next";

import { articles, categories, products } from "@/lib/sample-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/membership", "/quiz", "/cart", "/checkout", "/admin"];

  return [
    ...staticPages.map((path) => ({
      url: `https://wellness-commerce.local${path}`,
      lastModified: new Date()
    })),
    ...categories.map((category) => ({
      url: `https://wellness-commerce.local/categories/${category.slug}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `https://wellness-commerce.local/products/${product.slug}`,
      lastModified: new Date()
    })),
    ...articles.map((article) => ({
      url: `https://wellness-commerce.local/blog/${article.slug}`,
      lastModified: new Date()
    }))
  ];
}
