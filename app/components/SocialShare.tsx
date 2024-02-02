import {
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon,
  Facebook as FbIcon,
  Mail as MailIcon,
} from "lucide-react";

interface SocialShareType {
  url: string | false;
}

export const SocialShare = ({ url }: SocialShareType) => {
  const subject = "Check this out!"; // The subject of the email
  const body = `I thought you might be interested in this: ${url}`;
  const iconStyle =
    "text-2xl hover:text-secondary transition duration-500 hover:-translate-y-1";
  return (
    <div className="flex flex-col items-center mb-10">
      <h4 className="text-2xl mb-5">Share this!</h4>
      <div className="flex gap-3 ">
        <a
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon className={iconStyle} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FbIcon className={iconStyle} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className={iconStyle} />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailIcon className={iconStyle} />
        </a>
      </div>
    </div>
  );
};
