import type { AuthorStoryblok } from "~/types";
import { Link } from "@remix-run/react";
import { render } from "storyblok-rich-text-react-renderer";

export const AuthorBox = ({ author }: AuthorStoryblok) => {
  const {
    name,
    full_slug,
    content: { avatar, bio },
  } = author;
  return (
    <div className="flex flex-col justify-between items-center p-7 border border-dark-25 bg-dark-50 w-[248px] space-y-3 my-10 rounded-md">
      <Link to={`/${full_slug}`}>
        <div className="flex justify-center mb-3">
          <img
            src={avatar.filename}
            alt={`${name}`}
            className="rounded-full border-2 border-white w-[75px] h-[75px]"
          />
        </div>
        <h4 className="text-links uppercase text-center">{name}</h4>{" "}
      </Link>
      <div className="text-center">{render(bio)}</div>
    </div>
  );
};
