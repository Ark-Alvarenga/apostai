import React from "react";
import { ExternalAnalysisLink } from "@/types";

export type ExternalAnalysisItemProps = {
  label: string;
  analysis: string;
  relatedLinks: ExternalAnalysisLink[];
};

export const ExternalAnalysisItem = ({
  label,
  analysis,
  relatedLinks,
}: ExternalAnalysisItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-white font-semibold">{label}</h6>
      <span className="text-sm text-white">{analysis}</span>
      <div className="w-full flex justify-start items-center">
        <p className="text-sm text-white font-bold">Related Links: </p>
        {relatedLinks.map((link) => (
          <a
            href={link.url}
            className="text-sm text-primary-400 px-2 cursor-pointer border-r border-background-light-500 last:border-r-0"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};
