import type { CategoryStoryblok } from "~/types";
import { Link } from "@remix-run/react";
import { FolderClosed } from "lucide-react";

type CategoriesProps = {
  categories: CategoryStoryblok[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Categories = ({ categories, ...props }: CategoriesProps) => {
  return (
    <div {...props} className="flex items-center space-x-2">
      <FolderClosed className="text-xl text-secondary mr-2" />
      {categories?.map((c: CategoryStoryblok) => (
        <Link prefetch="intent" to={`/${c.full_slug}`} key={c.id}>
          <span className="button">{c.name}</span>
        </Link>
      ))}
    </div>
  );
};
