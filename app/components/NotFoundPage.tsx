import { useLocation, Link } from "@remix-run/react";

export const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1>We can't find this page:</h1>
        <pre className="text-body-lg whitespace-pre-wrap break-all">
          {location.pathname}
        </pre>
      </div>
      <Link to="/" className="text-body-md underline">
        Back to home
      </Link>
    </div>
  );
};
