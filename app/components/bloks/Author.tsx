import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import { PostsList } from "~/components/PostsList";
import type { loader } from "~/routes/authors.$";
import type { AuthorStoryblok } from "~/types";

export const Author = ({ blok }: AuthorStoryblok) => {
  const { story } = useLoaderData<typeof loader>();
  const filterQuery = {
    authors: {
      in_array: story.uuid,
    },
  };

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <h1>Posts from: {story.name}</h1>
      {story.content?.bio && <p>{render(story.content?.bio)}</p>}
      <PostsList grid={blok.grid} filterQuery={filterQuery} />
    </div>
  );
};
