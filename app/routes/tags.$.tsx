import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";
import type { HeadersFunction } from "@remix-run/node";

export const loader = createLoader("tags");

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") };
};

const TagPage = () => useStoryblokData("routes/tags.$");

export default TagPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
