import { SidebarContent } from "./SidebarContent";

export const LeftSidebar = () => {
  return (
    <aside className="site-nav xl:block fixed z-30 inset-0 top-[80px] transition-all duration-300 left-[-240px] xl:left-[max(0px,calc(50%-45rem))] right-auto w-[14.5rem] pb-10  px-6 overflow-y-auto border-r border-light border-opacity-10 bg-dark-100  ">
      <SidebarContent />
    </aside>
  );
};
