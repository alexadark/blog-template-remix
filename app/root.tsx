import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import { Layout } from "./components/layout";
import {
  Page,
  SocialItem,
  NavItem,
  Content,
  AllPosts,
  Post,
  Category,
  Tag,
  LastPosts,
  Author,
} from "./components/bloks";
import { implementSeo, invariantResponse } from "~/utils";
import { GeneralErrorBoundary } from "./components/GeneralErrorBoundary";
import "./styles/tailwind.css";

const isServer = typeof window === "undefined";

const accessToken = isServer
  ? process.env.STORYBLOK_PREVIEW_TOKEN
  : //@ts-ignore
    window.env.STORYBLOK_PREVIEW_TOKEN;

export const loader = async (args: LoaderFunctionArgs) => {
  invariantResponse(
    accessToken,
    "You need to provide an access token to interact with Storyblok API.",
    {
      status: 401,
    }
  );
  const sbApi = getStoryblokApi();
  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: "draft",
    resolve_links: "url",
  });

  const { data } = await sbApi.get(`cdn/stories/home`, {
    version: "draft",
  });

  const story = data?.story;
  const seo = story?.content?.seo_plugin?.title
    ? story?.content?.seo_plugin
    : story?.content?.seo[0];
  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
    headerNav: config?.story?.content?.header_nav,
    socialItems: config?.story?.content?.social_items,
    footerText: config?.story?.content?.footer_text,
    perPage: config?.story?.content?.posts_per_page,
    logo: config?.story?.content?.logo,
    blogTitle: config?.story?.content?.title,
    logoTitle: config?.story?.content?.logo_title,
    defaultPostImage: config?.story?.content?.default_post_image,
    seo,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return implementSeo(data?.seo, data?.story?.name);
};

const components = {
  page: Page,
  "social-item": SocialItem,
  "nav-item": NavItem,
  content: Content,
  "all-posts": AllPosts,
  post: Post,
  category: Category,
  tag: Tag,
  "last-posts": LastPosts,
  author: Author,
};

storyblokInit({
  accessToken: "m0vTtwyhWYYtVur9BRccXgtt",
  use: [apiPlugin],
  components,
});

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Inter:wght@400..700&display=swap",
    as: "style",
  },
];

const Document = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(env)}`,
        }}
      />
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document>
      <div className="flex-1">
        <GeneralErrorBoundary
          statusHandlers={{
            401: (e) => (
              <div className="container max-w-2xl  h-full bg-primary mx-auto text-2xl text-white font-bold text-center p-10 mt-20 rounded-lg">
                You need to provide an access token to interact with Storyblok
                API.
              </div>
            ),
          }}
        />
      </div>
    </Document>
  );
}
