import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";
import { invariantResponse } from ".";

export const getAllSlugs = async () => {
  let sbParams: ISbStoriesParams = {
    version: "draft",
  };

  let {
    data: { links },
  }: { data: { links: Record<string, { slug: string }> } } =
    await getStoryblokApi().get("cdn/links", sbParams);
  console.log("links:", links);

  const slugs = Object.values(links).map((link) => link.slug);

  return slugs;
};

export const validateSlug = async (slug: string) => {
  try {
    const slugs = await getAllSlugs();
    console.log("slugs:", slugs);

    invariantResponse(slugs.includes(slug), `page ${slug} does not exist`, {
      status: 404,
    });
  } catch (error) {
    console.error("Error validating slug:", error);
    throw error;
  }
};
