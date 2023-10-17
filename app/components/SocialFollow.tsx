import { useLoaderData } from "@remix-run/react";
import { SocialItem } from "./bloks";
import type { SocialItemStoryblok } from "~/types";
import { type loader } from "~/root";

export const SocialFollow = () => {
  const { socialItems } = useLoaderData<typeof loader>();
  return (
    <div>
      {socialItems.map((item: SocialItemStoryblok) => (
        <SocialItem
          key={item._uid}
          blok={item}
          _uid={item._uid}
          component={"social-item"}
        />
      ))}
    </div>
  );
};
