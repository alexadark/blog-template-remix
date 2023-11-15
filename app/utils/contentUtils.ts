import { getPostCardData, getTotal, getPerPage } from "~/utils";
import { getStoryblokApi } from "@storyblok/react";
import type { PostStoryblok } from "~/types";
import { json, type LoaderFunctionArgs } from "@remix-run/node";

export const getContentData = async (
  params: LoaderFunctionArgs,
  contentType: string
) => {
  let slug = params["*"] ?? "home";
  const sbApi = getStoryblokApi();
  const resolveRelations = ["post.categories", "post.tags", "post.author"];

  const { data } = await sbApi.get(`cdn/stories/${contentType}/${slug}`, {
    version: "draft",
  });

  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  let page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  let perPage = await getPerPage(sbApi);

  const { data: postsByContentType } = await sbApi.get(`cdn/stories/`, {
    version: "draft",
    starts_with: "blog/",
    is_startpage: false,
    per_page: perPage,
    page,
    resolve_relations: resolveRelations,
    search_term: data.story.uuid,
  });

  const total = await getTotal(data);

  return {
    blok: story.content,
    uuid: story.uuid,
    name: story.name,
    posts: postsByContentType?.stories.map((p: PostStoryblok) =>
      getPostCardData(p)
    ),
    perPage,
    total,
    seo,
  };
};
export const createLoader =
  (contentType: string) =>
  async ({ params }: LoaderFunctionArgs) => {
    const data = await getContentData(params, contentType);
    return json(data);
  };
