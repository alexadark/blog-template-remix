import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/tailwind.css";
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

  const {
    logo,
    header_nav,
    social_items,
    footer_text,
    default_post_image,
    posts_per_page,
    title,
    logo_title,
    site_url,
    google_analytics_code,
    google_tag_manager,
  } = config?.story?.content || {};

  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
    headerNav: header_nav,
    socialItems: social_items,
    footerText: footer_text,
    perPage: posts_per_page,
    logo,
    blogTitle: title,
    logoTitle: logo_title,
    defaultPostImage: default_post_image,
    seo,
    siteUrl: site_url,
    googleAnalyticsCode: google_analytics_code,
    googleTagManager: google_tag_manager,
  });
};

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return [
    ...implementSeo(data?.seo, data?.blogTitle),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: `${data.siteUrl ? data.siteUrl : ""}`,
      },
    },
  ];
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
  accessToken,
  use: [apiPlugin],
  components,
});

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Inter:wght@400..700&display=swap",
    as: "style",
  },
  { rel: "stylesheet", href: styles },
];

const Document = ({ children }: { children: React.ReactNode }) => {
  const { googleAnalyticsCode } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsCode}`}
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${googleAnalyticsCode});
`,
          }}
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
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
