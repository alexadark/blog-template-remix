import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";
import { PostStoryblok } from "~/types";
import {
  invariantResponse,
  getPerPage,
  getTotal,
  cacheControl,
  getPostCardData,
} from ".";

export const createLoader =
  (contentType: string) =>
  async ({ params }: LoaderFunctionArgs) => {
    const slug = params["*"] ?? "home";
    const sbApi = getStoryblokApi();
    const resolveRelations = ["post.categories", "post.tags", "post.author"];

    const { data } = await sbApi
      .get(`cdn/stories/${contentType}/${slug}`, {
        version: "draft",
      })
      .catch((e) => {
        console.log("e", e);
        return { data: null };
      });
    invariantResponse(data, `there is no page with slug ${slug}`, {
      status: 404,
    });

    const story = data?.story;

    const seo = story?.content?.seo_plugin?.title
      ? story?.content?.seo_plugin
      : story?.content?.seo[0];

    const page = Number.isNaN(Number(params.pageNumber))
      ? 1
      : Number(params.pageNumber);

    const perPage = await getPerPage(sbApi);

    const { data: postsByContentType } = await sbApi.get(`cdn/stories/`, {
      version: "draft",
      starts_with: "blog/",
      is_startpage: false,
      per_page: perPage,
      page,
      sort_by: "first_published_at:desc",
      search_term: data.story.uuid,
      resolve_relations: resolveRelations,
    });
    const total = await getTotal(data);

    const headers = {
      ...cacheControl,
    };

    return json(
      {
        blok: story.content,
        uuid: story.uuid,
        name: story.name,
        posts: postsByContentType?.stories.map((p: PostStoryblok) =>
          getPostCardData(p)
        ),
        perPage,
        total,
        seo,
      },
      { headers }
    );
  };
