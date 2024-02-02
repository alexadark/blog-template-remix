import type { TagStoryblok } from "~/types";
import { Link } from "@remix-run/react";
import { Tag as TagIcon } from "lucide-react";

type TagsProps = {
  tags: TagStoryblok[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Tags = ({ tags, ...props }: TagsProps) => {
  return (
    <div {...props} className="flex items-center space-x-2">
      <TagIcon className="text-2xl text-secondary mr-2 transform rotate-90" />
      {tags?.map((t: TagStoryblok) => (
        <Link prefetch="intent" to={`/${t.full_slug}`} key={t.id}>
          <span className="text-sm button">{t.name}</span>
        </Link>
      ))}
    </div>
  );
};
