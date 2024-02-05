import MD from "markdown-to-jsx";
import { useMemo } from "react";
import { Link } from "@remix-run/react";

interface MDRendererProps {
  children: string;
  className?: string;
}

export const MDRenderer = ({ children, className }: MDRendererProps) => {
  /**
   * Custom options for the MDRenderer component.
   */
  const options = useMemo(() => {
    return {
      overrides: {
        a: {
          component: ({
            href,
            children,
          }: {
            href: string;
            children: React.ReactNode;
          }) => {
            const isExternal =
              href &&
              (href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:"));
            if (isExternal) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <Link to={href}>{children}</Link>;
          },
        },
      },
    };
  }, []);

  return (
    <MD options={options} className={className}>
      {children}
    </MD>
  );
};
