import { storyblokEditable } from "@storyblok/react";
import Markdown from "markdown-to-jsx";

import type { ContentStoryblok } from "~/types";

export const Content = ({ blok }: ContentStoryblok) => {
  const { _uid, text } = blok;
  return (
      <Markdown {...storyblokEditable(blok)} key={_uid} className="content">{text}</Markdown>
  );
};
