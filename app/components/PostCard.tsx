import { Link, useMatches } from "@remix-run/react";
import type { PostStoryblok } from "~/types";
import { Categories } from "./Categories";
import { format } from "date-fns";

interface PostCardType {
  post: PostStoryblok;
  grid?: boolean;
}
const LinkWrapper = ({ children, slug, url }: any) => {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  } else {
    return (
      <Link prefetch="intent" to={`/${slug}`}>
        {children}
      </Link>
    );
  }
};

export const PostCard = ({ post, grid }: PostCardType) => {
  const { full_slug, published_at: date, content, url } = post;
  const {
    data: { defaultPostImage },
  } = useMatches()[0];

  const headline = post.headline ? post.headline : content.headline;
  const teaser = post.teaser ? post.teaser : content.teaser;
  const image = post.image?.id ? post.image : defaultPostImage;
  const categories = post.categories ? post.categories : content.categories;

  return (
    <article
      className={`${
        !grid && "mb-7"
      } bg-dark-50 border border-dark-25  px-5 py-7 rounded-lg shadow-xl duration-500 transition-[box-shadow,transform] hover:shadow-dark-25  relative hover:-translate-y-1`}
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div
        className={` ${
          grid ? "space-y-3" : "flex flex-wrap"
        } justify-between items-center gap-3 mb-4`}
      >
        <time
          className="mr-5 text-lg font-bold text-primary"
          itemProp="datePublished"
          dateTime={format(new Date(date), "yyyy-MM-dd")}
        >
          {format(new Date(date), "MMMM dd, yyyy")}
        </time>
        <div className="">
          <Categories categories={categories} />
        </div>
      </div>
      <LinkWrapper url={url?.url} slug={full_slug}>
        <div className={`${!grid && "md:flex justify-between gap-5"}`}>
          {image && (
            <div
              className="flex items-center"
              itemProp="image"
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={`${image?.filename}/m/400x200/smart/filters:quality(60)/`}
                  itemProp="contentUrl"
                />
                <img
                  src={`${image?.filename}/m/750x400/smart/filters:quality(60)/`}
                  alt={image?.alt}
                  className="rounded-lg"
                  itemProp="url"
                />
              </picture>
              <meta itemProp="description" content={image?.alt} />
            </div>
          )}
          <div>
            <h2 className="font-bold text-2xl mb-2" itemProp="headline">
              {headline}
            </h2>
            <p itemProp="description">{teaser}</p>
          </div>
        </div>
      </LinkWrapper>
    </article>
  );
};
