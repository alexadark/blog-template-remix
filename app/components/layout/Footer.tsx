import { useLoaderData } from "@remix-run/react";
import { render } from "storyblok-rich-text-react-renderer";
import { type loader } from "~/root";

export const Footer = () => {
  const { footerText } = useLoaderData<typeof loader>();
  return (
    <footer className="py-10 ">
      <div className="max-w-content mx-auto px-5">
        <div>
          {render(footerText)} &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};
