import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";

export const loader = createLoader("authors");

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
