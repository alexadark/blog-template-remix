import { Link } from "@remix-run/react";
import { SlideSidebar } from "./SlideSidebar";
import { Search } from "~/components/search";

export const Header = () => {
  return (
    <header className=" top-0 z-40 flex-none w-full py-3 border-b backdrop-blur border-dark-25  bg-dark-100 lg:bg-transparent">
      <div className="max-w-site flex justify-between mx-auto align-center px-5">
        <Link to="/">
          <h1 className="my-0 text-3xl font-bold font-heading">
            Alexandra Spalato
          </h1>
        </Link>
        <div className="flex justify-between gap-5">
          <SlideSidebar className="mt-2 xl:hidden" />
          <Search />
        </div>
      </div>
    </header>
  );
};
