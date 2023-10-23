import { useLoaderData, useMatches } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import { type loader } from "~/routes/$";

export const useStoryblokData = () => {
  const data = useLoaderData<typeof loader>();
  console.log("matches", useMatches());

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
