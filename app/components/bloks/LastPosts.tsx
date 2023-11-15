import { storyblokEditable } from "@storyblok/react";
import { useLoaderData, Link } from "@remix-run/react";
import type { LastPostsStoryblok, PostStoryblok } from "~/types";
import { PostCard } from "~/components/PostCard";
import type { loader } from "~/routes/$";

export const LastPosts = ({ blok }: LastPostsStoryblok) => {
  const { headline, grid } = blok;
  const { lastPosts } = useLoaderData<typeof loader>();

  return (
    <div {...storyblokEditable(blok)} className="center-container">
      <h2>{headline}</h2>
      <div className={grid && "grid sm:grid-cols-2 gap-5"}>
        {lastPosts.map((post: PostStoryblok) => {
          return <PostCard post={post} key={post.id} grid={grid} />;
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Link prefetch="intent" to={`/blog`} className="button py-4 px-7">
          View all posts
        </Link>
      </div>
    </div>
  );
};
