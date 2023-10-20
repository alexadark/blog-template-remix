import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import type { TagStoryblok } from "~/types";
import { PostsList } from "~/components/PostsList";
import type { loader } from "~/routes/tags.$";

export const Tag = ({ blok }: TagStoryblok) => {
  const { story } = useLoaderData<typeof loader>();
  const filterQuery = {
    tags: {
      in_array: story.uuid,
    },
  };
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <div className="mb-10">
        <h1>Posts for:{blok.headline}</h1>
        {blok.description ? <p>{blok.description}</p> : null}
      </div>
      <PostsList grid={blok?.grid} filterQuery={filterQuery} />
    </div>
  );
};
