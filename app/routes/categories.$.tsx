import { json } from "@remix-run/node";
import { useStoryblokData } from "~/hooks";
import { getStoryblokApi } from "@storyblok/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { implementSeo, getPostCardData, getTotal } from "~/utils";
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

  const total = await getTotal(data);

  return json({
    blok: story.content,
    uuid: story.uuid,
    name: story.name,
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
  return implementSeo(data.seo, data.name);
};

const CategoryPage = () => useStoryblokData();

export default CategoryPage;
