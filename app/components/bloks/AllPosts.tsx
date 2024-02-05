import { storyblokEditable } from "@storyblok/react";

import type { AllPostsStoryblok } from "~/types";
import MD from "markdown-to-jsx";

import { PostsList } from "~/components/PostsList";

export const AllPosts = ({ blok }: AllPostsStoryblok) => {
  const { _uid, headline, intro, grid } = blok;

  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div className="mb-10">
        <h1>{headline}</h1>

        <MD className="content">{intro}</MD>
      </div>
      <PostsList grid={grid} />
    </div>
  );
};
