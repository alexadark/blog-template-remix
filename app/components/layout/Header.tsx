import { Link, useLoaderData } from "@remix-run/react";
import { SlideSidebar } from "./SlideSidebar";
import { Search } from "~/components/search";
import type { loader } from "~/root";

export const Header = () => {
  const { logo, blogTitle } = useLoaderData<typeof loader>();

  const title = (
    <h1 className="my-0 text-3xl font-bold font-heading">{blogTitle}</h1>
  );
  const logoImage = (
    <img
      src={logo.filename}
      alt={logo.alt}
      className="h-8 w-8 mr-2 rounded-full border-2 border-secondary"
    />
  );
  const branding = (
    <div className="flex items-center space-x-2">
      {logo.filename && logoImage} {blogTitle && title}
    </div>
  );

  return (
    <header className="fixed top-0 z-40 flex-none w-full py-3 border-b border-dark-25 backdrop-filter backdrop-blur-lg bg-transparent">
      <div className="max-w-site flex justify-between mx-auto align-center px-5">
        <Link prefetch="intent" to="/">
          {branding}
        </Link>
        <div className="flex justify-between gap-5">
          <SlideSidebar className="mt-2 xl:hidden" />
          <Search />
        </div>
      </div>
    </header>
  );
};
