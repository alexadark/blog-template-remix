import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import type { PostStoryblok } from "~/types";
import { Categories } from "~/components/Categories";
import type { loader } from "~/routes/blog.$";
import { Tags } from "~/components/Tags";
import { DisqusComments } from "~/components/DisqusComments";
import { SocialShare } from "~/components/SocialShare";
import { AuthorBox } from "~/components/AuthorBox";

export const Post = ({ blok }: PostStoryblok) => {
  const { publishDate, id, name } = useLoaderData<typeof loader>();

  const { headline, categories, image, tags, author, post_content } = blok;

  const url = typeof window !== "undefined" && window.location.href;
  return (
    <>
      <article
        {...storyblokEditable(blok)}
        key={blok._uid}
        className="max-w-full xl:max-w-[760px] 2xl:max-w-content"
      >
        <div className="flex flex-wrap justify-between align-middle mb-7">
          <div className="mr-5 text-lg font-bold text-primary">
            {format(new Date(publishDate), "MMMM dd, yyyy")}
          </div>
          <Categories categories={categories} className="space-x-2" />
        </div>
        {image && (
          <img
            src={`${image?.filename}/m/800x300/smart/filters:grayscale():quality(60)/`}
            alt={image?.alt}
          />
        )}
        <h1>{headline}</h1>
        <Tags tags={tags} className="space-x-2" />

        {post_content?.map((nestedBlok: any) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}

        <div className="flex justify-center xl:hidden">
          <AuthorBox author={author} component={"author"} />
        </div>
        {url && <SocialShare url={url} />}
      </article>

      <aside className="fixed z-10 top-[4.6rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-6 px-8 overflow-y-auto hidden xl:block">
        <AuthorBox author={author} component={"author"} />
      </aside>

      <DisqusComments
        shortname="remix-blog"
        identifier={id}
        title={name}
        url={`${typeof window !== "undefined" && window.location.href}`}
      />
    </>
  );
};

export default Post;
