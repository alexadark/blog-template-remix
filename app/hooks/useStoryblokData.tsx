import { useMatches, useLoaderData } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import type { StoryblokStory } from "storyblok-generate-ts";
import type { loader } from "~/routes/$";

export const useStoryblokData = () => {
  const matches = useMatches();
  const data = matches[1].data as unknown as { story: StoryblokStory<unknown> };

  // const data = useLoaderData<typeof loader>();
  const story = useStoryblokState(data.story, {
    resolveRelations: [
      "post.categories",
      "post.tags",
      "post.author",
      "post.comments",
    ],
  });

  return <StoryblokComponent blok={story?.content} />;
};
