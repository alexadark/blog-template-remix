import { useEffect, useRef } from "react";
import { Form } from "@remix-run/react";
import clsx from "clsx";

export const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form
      action="search-results"
      className="flex justify-between md:w-[90%] relative "
    >
      <input
        ref={inputRef}
        type="text"
        minLength={3}
        name="query"
        placeholder="Search..."
        className={clsx(
          "w-full h-12",
          "bg-dark-50",
          "border-0 border-l-8 border-teal-200 focus:border-secondary",
          "text-teal-100",
          "text-xl tracking-wide",
          "focus:outline-none focus:ring-transparent  placeholder-teal-100"
        )}
      />
    </Form>
  );
};
