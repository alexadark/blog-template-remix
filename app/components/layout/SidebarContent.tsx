import { MainMenu } from "./MainMenu";
import { SocialFollow } from "~/components/SocialFollow";

export const SidebarContent = () => {
  return (
    <>
      <MainMenu />
      <div className="border-b border-dark-25 my-7" />
      <SocialFollow />
    </>
  );
};
