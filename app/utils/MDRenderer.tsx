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
        themes: ["dracula", "rose-pine"],
        langs: ["javascript"],
      });
      setHighlighter(shikiHighlighter);
    };

    loadHighlighter();
  }, []);

  // Function to render code with syntax highlighting
  const options = useMemo(() => {
    const renderCode = (code: any, language: any) => {
      if (!highlighter) return code;
      return (highlighter as any).codeToHtml(code, {
        lang: language,
        theme: "dracula",
      });
    };

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
          component: ({
            children,
            className,
          }: {
            children: React.ReactNode;
            className: string;
          }) => {
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
  }, [highlighter]);

  return (
    <MD options={options} className={className}>
      {children}
    </MD>
  );
};
