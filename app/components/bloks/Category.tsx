import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import type { CategoryStoryblok } from "~/types";
import { PostsList } from "~/components/PostsList";
import type { loader } from "~/routes/categories.$";

export const Category = ({ blok }: CategoryStoryblok) => {
  const { story } = useLoaderData<typeof loader>();
  const filterQuery = {
    categories: {
      in_array: story.uuid,
    },
  };

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <div className="mb-10">
        <h1>Posts for:{blok.headline}</h1>
        {blok.description && <p>{blok.description}</p>}
      </div>

      <PostsList grid={blok.grid} filterQuery={filterQuery} />
    </div>
  );
};
