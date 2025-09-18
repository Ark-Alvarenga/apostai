import React from "react";
import { FaFilePdf } from "react-icons/fa6";

interface DownloadFileButtonProps {
  filename: string;
  label: string;
}

export const DownloadFileButton: React.FC<DownloadFileButtonProps> = ({
  filename,
  label,
}) => {
  const filePath = `/` + filename;

  return (
    <a href={filePath} download className="flex gap-2 text-blue-500">
      <FaFilePdf />
      {label}
    </a>
  );
};
