import type { PostStoryblok } from "~/types";
export function getPostCardData(p: PostStoryblok) {
  return {
    published_at: p.published_at,
    id: p.id,
    headline: p.content.headline,
    full_slug: p.full_slug,
    teaser: p.content.teaser,
    image: p.content.image,
    categories: p.content.categories,
    url: p.content.url,
  };
}
