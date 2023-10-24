import { json } from "@remix-run/node";
import { useStoryblokData } from "~/hooks";
import { getStoryblokApi } from "@storyblok/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getSeo, getPostCardData } from "~/utils";
import type { PostStoryblok } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";
  const sbApi = getStoryblokApi();
  const resolveRelations = ["post.categories", "post.tags", "post.author"];

  const { data } = await sbApi.get(`cdn/stories/categories/${slug}`, {
    version: "draft",
  });

  const { data: categories } = await sbApi.get(`cdn/stories`, {
    version: "draft",
    starts_with: "categories/",
    is_startpage: false,
  });

  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  let page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: "draft",
    resolve_links: "url",
  });

  let perPage = config?.story?.content?.posts_per_page;

  const { data: postsByCategory } = await sbApi.get(`cdn/stories/`, {
    version: "draft",
    starts_with: "blog/",
    is_startpage: false,
    per_page: perPage,
    page,
    resolve_relations: resolveRelations,
    search_term: data.story.uuid,
  });

  let response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=blog/&version=draft&is_startpage=false&search_term=${data.story.uuid}`
  );
  let total = response?.headers.get("total");

  return json({
    story,
    uuid: story.uuid,
    posts: postsByCategory?.stories.map((p: PostStoryblok) =>
      getPostCardData(p)
    ),
    categories: categories?.stories,
    perPage,
    total,
    seo,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return getSeo(data.seo, data.story?.name);
};

const CategoryPage = () => useStoryblokData();

export default CategoryPage;
