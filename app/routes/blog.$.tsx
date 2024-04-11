import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
  type HeadersFunction,
} from "@remix-run/node";
import { useStoryblokData } from "~/hooks";
import { getStoryblokApi } from "@storyblok/react";
import {
  implementSeo,
  getPostCardData,
  getPerPage,
  invariantResponse,
} from "~/utils";
import type { PostStoryblok } from "~/types";
import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import { cacheControl } from "~/utils/cacheControl";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";
  const sbApi = getStoryblokApi();
  const resolveRelations = ["post.categories", "post.tags", "post.author"];

  const { data } = await sbApi
    .get(`cdn/stories/blog/${slug}`, {
      version: "draft",
      resolve_relations: resolveRelations,
    })
    .catch((e) => {
      console.log("e", e);
      return { data: null };
    });
  invariantResponse(data, `there is no page with slug ${slug}`, {
    status: 404,
  });
  let headers = {
    ...cacheControl,
  };
  let page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  let perPage = await getPerPage(sbApi);

  const { data: blog } = await sbApi.get(`cdn/stories`, {
    version: "draft",
    starts_with: "blog/",
    per_page: perPage,
    page,
    is_startpage: false,
    resolve_relations: resolveRelations,
  });

  let response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=blog/&version=draft/&per_page=20&is_startpage=false`
  );
  let total = await response?.headers.get("total");
  const story = data?.story;

  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];

  const posts = blog?.stories?.map((p: PostStoryblok) => getPostCardData(p));

  return json(
    {
      blok: story.content,
      publishDate: story.published_at,
      id: story.id,
      name: story.name,
      posts,
      total,
      perPage,
      seo,
    },
    { headers }
  );
};
export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") };
};
export const meta: MetaFunction = ({ data }: { data: any }) => {
  console.log("data blok", data);
  const jsonLD =
    data.blok.component === "post"
      ? {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url,
          },
          headline: data.blok.headline,
          description: data.blok.teaser,
          author: {
            "@type": "Person",
            name: data.blok.author.name,
          },
          datePublished: data.blok.publishDate,
        }
      : {
          "@context": "http://schema.org",
          "@type": "Blog",
          url: data.url,
        };
  return [
    ...implementSeo(data?.seo, data?.name),
    {
      "script:ld+json": jsonLD,
    },
  ];
};

const PostPage = () => useStoryblokData("routes/blog.$");

export default PostPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
