import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";
export const loader = createLoader("categories");

const CategoryPage = () => useStoryblokData("routes/categories.$");

export default CategoryPage;
