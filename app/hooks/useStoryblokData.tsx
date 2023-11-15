import { useMatches } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export const useStoryblokData = (route: string) => {
  const matches = useMatches();
  const { data } = matches?.find((m) => m?.id === route) ?? {};

  const blok = useStoryblokState(data.blok, {
    resolveRelations: [
      "post.categories",
      "post.tags",
      "post.author",
      "post.comments",
    ],
  });

  return <StoryblokComponent blok={blok} />;
};
