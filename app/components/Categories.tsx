import type { CategoryStoryblok } from "~/types";
import { Link } from "@remix-run/react";
import { LuFolderClosed as FolderIcon } from "react-icons/lu/index.js";

type CategoriesProps = {
  categories: CategoryStoryblok[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Categories = ({ categories, ...props }: CategoriesProps) => {
  return (
    <div {...props} className="flex items-center space-x-2">
      <FolderIcon className="text-xl text-secondary mr-2" />
      {categories?.map((c: CategoryStoryblok) => (
        <Link to={`/${c.full_slug}`} key={c.id}>
          <span className="button">{c.name}</span>
        </Link>
      ))}
    </div>
  );
};
