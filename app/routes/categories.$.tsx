import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";
export const loader = createLoader("categories");

const CategoryPage = () => useStoryblokData("routes/categories.$");

export default CategoryPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
