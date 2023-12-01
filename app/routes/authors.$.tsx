import { useStoryblokData } from "~/hooks";
import { createLoader } from "~/utils";

export const loader = createLoader("authors");

const AuthorPage = () => useStoryblokData("routes/authors.$");

export default AuthorPage;
