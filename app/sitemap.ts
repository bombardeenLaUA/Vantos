import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vantoshq.com";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/herramientas/hipoteca`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/herramientas/inversion`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/herramientas/ahorro`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/estrategia`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/como-funciona`, lastModified, changeFrequency: "weekly", priority: 0.7 },
  ];
}

