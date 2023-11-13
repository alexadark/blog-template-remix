import { NavLink } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import type { NavItemStoryblok } from "~/types";

export const NavItem = ({ blok }: NavItemStoryblok) => {
  const { label, link, _uid } = blok;

  return (
    <>
      {link.linktype === "story" ? (
        <NavLink
          key={_uid}
          prefetch="intent"
          to={`/${link.cached_url}`}
          {...storyblokEditable(blok)}
          className="menu-item"
        >
          {label}
        </NavLink>
      ) : (
        <a
          key={_uid}
          href={link.url}
          target={link.target}
          {...storyblokEditable(blok)}
          className="menu-item"
        >
          {label}
        </a>
      )}
    </>
  );
};
