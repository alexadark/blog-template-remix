import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import { PostsList } from "~/components/PostsList";
import type { loader } from "~/routes/authors.$";
import type { AuthorStoryblok } from "~/types";

export const Author = ({ blok }: AuthorStoryblok) => {
  const { uuid, name } = useLoaderData<typeof loader>();

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <h1>Posts from: {name}</h1>
      {blok.bio && <p>{render(blok.bio)}</p>}
      <PostsList grid={blok.grid} uuid={uuid} />
    </div>
  );
};
