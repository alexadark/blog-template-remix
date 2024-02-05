import { storyblokEditable } from "@storyblok/react";
import { MDRenderer } from "~/utils";

import type { ContentStoryblok } from "~/types";

export const Content = ({ blok }: ContentStoryblok) => {
  const { _uid, text } = blok;
  return (
    <>
      {text && (
        <MDRenderer {...storyblokEditable(blok)} key={_uid} className="content">
          {text}
        </MDRenderer>
      )}
    </>
  );
};
