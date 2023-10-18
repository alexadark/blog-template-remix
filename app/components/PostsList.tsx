import { useState } from "react";
import { getStoryblokApi } from "@storyblok/react";
import { useLoaderData } from "@remix-run/react";
import type { PostStoryblok } from "~/types";
import { PostCard } from "./PostCard";
import type { loader } from "~/routes/blog.$";

interface PostsListType {
  grid?: boolean;
  filterQuery?: Object;
}
export const PostsList = ({ grid, filterQuery = {} }: PostsListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts: firstsPosts, total, perPage } = useLoaderData<typeof loader>();
  const [posts, setPosts] = useState(firstsPosts);
  console.log("total", total, "posts", firstsPosts);

  const sbApi = getStoryblokApi();
  const resolveRelations = [
    "post.categories",
    "post.tags",
    "post.author",
    "post.comments",
  ];

  const fetchPosts = async (page: number, filterQuery: Object) => {
    const { data: blog } = await sbApi.get(`cdn/stories`, {
      version: "draft",
      starts_with: "blog/",
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      filter_query: filterQuery,
    });

    const nextPosts = blog.stories.map((p: PostStoryblok) => {
      return {
        date: p.published_at,
        id: p.id,
        title: p.content.headline,
        slug: p.full_slug,
        teaser: p.content.teaser,
        image: p.content.image,
        categories: p.content.categories,
      };
    });

    setPosts((prevPosts: PostStoryblok[]) => [...prevPosts, ...nextPosts]);
  };

  const loadMore = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPosts(nextPage, filterQuery);
  };
  return (
    <div>
      <div className={grid ? "grid grid-cols-2 gap-5" : ""}>
        {posts?.map((p: PostStoryblok) => {
          const post = p.content;
          return <PostCard post={p} key={post?._uid} grid={grid} />;
        })}
      </div>
      {total && posts.length < total && (
        <div className={`flex items-center ${grid ? "mt-5" : ""}`}>
          <button className="button mx-auto py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
