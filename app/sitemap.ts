import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://everythinghighacademy.com",
      lastModified: new Date(),
    },
    {
      url: "https://everythinghighacademy.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://everythinghighacademy.com/gallery",
      lastModified: new Date(),
    },
    {
      url: "https://everythinghighacademy.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://everythinghighacademy.com/registration",
      lastModified: new Date(),
    },
  ];
}