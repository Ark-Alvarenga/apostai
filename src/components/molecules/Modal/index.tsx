import React from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full"; // Controle de tamanhos
  closeOnOverlayClick?: boolean; // Fechar ao clicar no overlay
  onClose?: () => void; // Callback para fechar o modal
  extraClasses?: string; // Classes extras para personalização
  noScroll?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  size = "md",
  closeOnOverlayClick = true,
  onClose,
  extraClasses = "",
  noScroll,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-11/12 lg:w-1/4 max-h-[90%]",
    md: "w-11/12 lg:w-1/3 max-h-[90%]",
    lg: "w-11/12 lg:w-1/2 max-h-[90%]",
    xl: "w-11/12 lg:w-3/4 max-h-[90%]",
    full: "w-full h-full",
  };

  const scrollClasses = noScroll ? "" : "overflow-y-auto";

  const handleOverlayClick = () => {
    if (closeOnOverlayClick && onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-medium-500 bg-opacity-75 flex justify-center items-center">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={handleOverlayClick}
        role="button"
        aria-label="Close Modal"
      ></div>

      {/* Modal Content */}
      <div
        className={clsx(
          "relative bg-background-heavy-800 rounded-lg shadow-lg flex flex-col overflow-hidden",
          sizeClasses[size],
          extraClasses
        )}
      >
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        )}

        {/* Content with Scroll */}
        <div className={clsx("flex-1", scrollClasses)}>{children}</div>
      </div>
    </div>
  );
};
