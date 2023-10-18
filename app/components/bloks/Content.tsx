import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import type { ContentStoryblok } from "~/types";

export const Content = ({ blok }: ContentStoryblok) => {
  const { _uid, text } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="content">
      {render(text)}
    </div>
  );
};
