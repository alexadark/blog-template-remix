import { useEffect } from "react";
interface DisqusCommentsProps {
  shortname: string;
  identifier: string;
  title: string;
  url: string;
}

export function DisqusComments({
  shortname,
  identifier,
  title,
  url,
}: DisqusCommentsProps) {
  useEffect(() => {
    (window as any).disqus_config = {
      page: {
        url,
        identifier,
        title,
      },
    };

    const script = document.createElement("script");
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute("data-timestamp", Date.now().toString());
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [shortname, identifier, title, url]);

  return <div id="disqus_thread" />;
}
