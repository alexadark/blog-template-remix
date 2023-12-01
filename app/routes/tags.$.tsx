import { useStoryblokData } from "~/hooks";
<<<<<<< HEAD
import { createLoader } from "~/utils";
export const loader = createLoader("tags");

const TagPage = () => useStoryblokData("routes/tags.$");
=======
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  implementSeo,
  getPostCardData,
  getTotal,
  getPerPage,
  invariantResponse,
} from "~/utils";
import type { PostStoryblok } from "~/types";
import { getStoryblokApi } from "@storyblok/react";
import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";

  const resolveRelations = ["post.categories", "post.tags", "post.author"];
  const sbApi = getStoryblokApi();

  const { data } = await getStoryblokApi()
    .get(`cdn/stories/tags/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      console.log("e", e);
      return { data: null };
    });
  invariantResponse(data, `there is no post with slug ${slug}`, {
    status: 404,
  });

  let page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  let perPage = await getPerPage(sbApi);
  const { data: postsByTag } = await sbApi.get(`cdn/stories/`, {
    version: "draft",
    starts_with: "blog/",
    is_startpage: false,
    per_page: perPage,
    page,
    resolve_relations: resolveRelations,
    search_term: data.story.uuid,
  });

  const total = await getTotal(data);

  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  return json({
    blok: story.content,
    name: story.name,
    uuid: story.uuid,
    posts: postsByTag?.stories.map((p: PostStoryblok) => getPostCardData(p)),
    perPage,
    total,
    seo,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return implementSeo(data?.seo, data?.name);
};

const TagPage = () => useStoryblokData();
>>>>>>> refs/heads/error-handling

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}

export default TagPage;
