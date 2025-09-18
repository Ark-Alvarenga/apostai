import React from "react";

interface LinkProps {
  url: string;
  text: string;
  color?: string;
  hoverColor?: string;
  fontWeight?: string;
  externalLink?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  url,
  text,
  color = "text-blue-600",
  hoverColor = "text-blue-800",
  fontWeight = "font-bold",
  externalLink = false,
}) => {
  if (externalLink) {
    return (
      <a
        href={url}
        className={`${color} hover:${hoverColor} transition-colors duration-300 ${fontWeight}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }
  return (
    <a
      href={url}
      className={`${color} hover:${hoverColor} transition-colors duration-300 ${fontWeight}`}
    >
      {text}
    </a>
  );
};
