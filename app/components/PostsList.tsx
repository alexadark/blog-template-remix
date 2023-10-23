import { useState } from "react";
import { getStoryblokApi } from "@storyblok/react";
import { useMatches } from "@remix-run/react";
import type { PostStoryblok } from "~/types";
import { PostCard } from "./PostCard";
import { getPostCardData } from "~/utils";

interface PostsListType {
  grid?: boolean;
  filterQuery?: Object;
}

interface RouteData {
  total: number;
  posts: PostStoryblok[];
}
export const PostsList = ({ grid, filterQuery = {} }: PostsListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, posts: firstsPosts } = matches[1].data as RouteData;
  const [posts, setPosts] = useState(firstsPosts);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations = [
    "post.categories",
    "post.tags",
    "post.author",
    "post.comments",
  ];

  const perPage = (globalData as GlobalData)?.perPage;

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

    const nextPosts = blog.stories.map((p: PostStoryblok) =>
      getPostCardData(p)
    );

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
          return <PostCard post={p} key={p?.d} grid={grid} />;
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
