import { Link } from "@remix-run/react";
import img404 from "~/assets/404.png";

export const NotFoundPage = () => {
  return (
    <div className="text-center mx-auto">
      <h1>Lost in space...</h1>
      <div className="flex justify-center">
        <img src={img404} alt="" />
      </div>

      <Link to="/" className="text-xl underline">
        Back to home
      </Link>
    </div>
  );
};
