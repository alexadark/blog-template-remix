import { storyblokEditable } from "@storyblok/react";

import type { AllPostsStoryblok } from "~/types";
import { render } from "storyblok-rich-text-react-renderer";

import { PostsList } from "~/components/PostsList";

export const AllPosts = ({ blok }: AllPostsStoryblok) => {
  const { _uid, headline, intro, grid } = blok;

  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div className="mb-10">
        <h1>{headline}</h1>
        <p>{render(intro)}</p>
      </div>
      <PostsList grid={grid} />
    </div>
  );
};
