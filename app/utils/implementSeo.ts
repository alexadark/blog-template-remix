import type { SeoStoryblok } from "~/types";

export function implementSeo(seo: SeoStoryblok, name: string) {
  const {
    title,
    og_image,
    og_title,
    description,
    twitter_image,
    twitter_title,
    og_description,
    twitter_description,
  } = seo || {};

  return [
    { title: title || name },
    {
      property: "og:title",
      content: og_title || title || name,
    },
    {
      property: "og:image",
      content: og_image || twitter_image,
    },
    {
      property: "og:description",
      content: og_description || description,
    },
    {
      property: "twitter:image",
      content: twitter_image || og_image,
    },
    {
      property: "twitter:title",
      content: twitter_title || title || name,
    },
    {
      property: "twitter:description",
      content: twitter_description || description,
    },
    {
      name: "description",
      content: description || og_description || twitter_description,
    },
  ];
}
