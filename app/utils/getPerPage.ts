export async function getPerPage(sbApi) {
  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: "draft",
    resolve_links: "url",
  });
  return config?.story?.content?.posts_per_page;
}
