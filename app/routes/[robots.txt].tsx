import { type LoaderFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let url = new URL(request.url);

  const sbApi = getStoryblokApi();
  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: "draft",
    resolve_links: "url",
  });
  console.log("config", config);

  const robotsTxt = config?.story?.content?.robots_txt_content;

  const robotText = `
    ${robotsTxt}
    Sitemap: ${url?.origin}/sitemap.xml
    `;
  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
