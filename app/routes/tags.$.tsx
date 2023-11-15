import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";
export const loader = createLoader("tags");

const TagPage = () => useStoryblokData("routes/tags.$");

export default TagPage;
