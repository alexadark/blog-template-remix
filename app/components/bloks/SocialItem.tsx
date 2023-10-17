import { storyblokEditable } from "@storyblok/react";
import type { SocialItemStoryblok } from "~/types";

export const SocialItem = ({ blok }: SocialItemStoryblok) => {
  const { icon, url, name, _uid } = blok;
  return (
    <a
      href={url.cached_url}
      target="_blank"
      key={_uid}
      rel="noopener noreferrer"
      {...storyblokEditable(blok)}
      className="flex items-center gap-2 mb-5 opacity-50 hover:opacity-100 transition-opacity duration-300"
    >
      <div>
        <img src={`${icon.filename}/m/24x24`} alt={icon.alt} />
      </div>
      <div>{name}</div>
    </a>
  );
};
