import { json } from "@remix-run/node";
import { useStoryblokData } from "~/hooks";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getSeo } from "~/utils";
import { getStoryblokApi } from "@storyblok/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";
  const resolveRelations = ["post.categories", "post.tags", "post.author"];
  const sbApi = getStoryblokApi();

  const { data } = await getStoryblokApi().get(`cdn/stories/tags/${slug}`, {
    version: "draft",
  });

  let page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: "draft",
    resolve_links: "url",
  });

  let perPage = config?.story?.content?.posts_per_page;
  const { data: postsByTag } = await sbApi.get(`cdn/stories/`, {
    version: "draft",
    starts_with: "blog/",
    is_startpage: false,
    per_page: perPage,
    page,
    resolve_relations: resolveRelations,
    filter_query: {
      tags: {
        in_array: data.story.uuid,
      },
    },
  });

  let response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=blog/&version=draft&is_startpage=false&filter_query[tags][in_array]=${data.story.uuid}`
  );
  let total = response?.headers.get("total");

  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  return json({
    story,
    posts: postsByTag?.stories,
    perPage,
    total,
    seo,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return getSeo(data.seo, data.story.name);
};

const TagPage = () => useStoryblokData();

export default TagPage;
