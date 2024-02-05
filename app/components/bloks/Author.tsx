import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import { PostsList } from "~/components/PostsList";
import type { loader } from "~/routes/authors.$";
import type { AuthorStoryblok } from "~/types";
import MD from "markdown-to-jsx";

export const Author = ({ blok }: AuthorStoryblok) => {
  const { uuid, name } = useLoaderData<typeof loader>();

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <h1>Posts from: {name}</h1>
      {blok.bio && <MD>{blok.bio}</MD>}
      <PostsList grid={blok.grid} uuid={uuid} />
    </div>
  );
};
