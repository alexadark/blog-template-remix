import MD from "markdown-to-jsx";
import { useMemo, useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { getHighlighter } from "shiki";

interface MDRendererProps {
  children: string;
  className?: string;
}

export const MDRenderer = ({ children, className }: MDRendererProps) => {
  const [highlighter, setHighlighter] = useState(null);

  // Asynchronously load the Shiki highlighter
  useEffect(() => {
    const loadHighlighter = async () => {
      const shikiHighlighter = await getHighlighter({
        themes: ["dracula"],
        langs: ["javascript"],
      });
      setHighlighter(shikiHighlighter);
    };

    loadHighlighter();
  }, []);

  // Function to render code with syntax highlighting
  const renderCode = (code: any, language: any) => {
    if (!highlighter) return code;
    return highlighter.codeToHtml(code, { lang: language, theme: "dracula" });
  };

  // Custom options for the MDRenderer component, including overrides for links and code blocks
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
        code: {
          component: ({ children, className }) => {
            const language = className
              ? className.replace("language-", "")
              : "javascript";
            return (
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: renderCode(children, language),
                  }}
                />
              </pre>
            );
          },
        },
      },
    };
  }, [renderCode]);

  return (
    <MD options={options} className={className}>
      {children}
    </MD>
  );
};
