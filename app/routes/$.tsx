import { json } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";
import { useStoryblokData } from "~/hooks";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { implementSeo, getPostCardData, invariantResponse } from "~/utils";
import type { PostStoryblok } from "~/types";
import { useParams } from "@remix-run/react";
import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";

  const sbApi = getStoryblokApi();

  const resolveRelations = ["post.categories"];

  const { data }: { data: any } = await sbApi
    .get(`cdn/stories/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      console.log("e", e);
      return { data: null };
    });
  invariantResponse(data, `there is no page with slug ${slug}`, {
    status: 404,
  });

  const numberOfPosts = data.story.content.body?.find(
    (item: { component: string }) => item.component === "last-posts"
  )?.number_of_posts;

  const { data: lastPosts } = await sbApi.get(`cdn/stories`, {
    version: "draft",
    starts_with: "blog/",
    per_page: numberOfPosts,
    is_startpage: false,
    resolve_relations: resolveRelations,
  });
  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  return json({
    blok: story.content,
    name: story.name,
    lastPosts: lastPosts?.stories?.map((p: PostStoryblok) =>
      getPostCardData(p)
    ),
    seo,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return implementSeo(data?.seo, data?.name);
};

const RootPage = () => {
  const params = useParams();
  const routeFile = params["*"] === undefined ? "routes/_index" : "routes/$";
  const data = useStoryblokData(routeFile);

  return data;
};

export default RootPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
