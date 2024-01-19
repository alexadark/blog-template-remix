import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";
import type { HeadersFunction } from "@remix-run/node";

export const loader = createLoader("authors");

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") };
};

const AuthorPage = () => useStoryblokData("routes/authors.$");

export default AuthorPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
