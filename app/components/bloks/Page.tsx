import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { PageStoryblok } from "~/types";

export const Page = ({ blok }: PageStoryblok) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
