import { type LoaderFunctionArgs, type LoaderFunction } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const sbApi = getStoryblokApi();
  let { data } = await sbApi.get(`cdn/links`, {
    version: "published",
  });
  let url = new URL(request.url);
  const links = Object.values(data.links);

  // 001 define the prefix of URL with HTTPS protocol and the hostname
  const prefixUrl = url.href;
  // 002 loop through the links via map() function
  let sitemap_entries = links.map((link) => {
    // 003 skipping the folders
    if (link.is_folder) return "";
    // 004 creating the URL loc element with the real_path
    return `\n    <url><loc>${prefixUrl}${link.real_path}</loc></url>`;
  });
  // 005 compose the whole XML with the header
  let sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap_entries.join("")}
  </urlset>`;
  return sitemap;
};
