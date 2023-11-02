export async function getTotal(data: { story: { uuid: any } }) {
  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=blog/&version=draft&is_startpage=false&search_term=${data.story.uuid}`
  );
  const total = await response?.headers.get("total");
  return total;
}
