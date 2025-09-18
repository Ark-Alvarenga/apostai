"use client";

export * from "./TooltipIcon";
import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const [alignment, setAlignment] = useState<"left" | "right" | "center">(
    "center"
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        // Determine vertical position
        if (rect.top < viewportHeight / 2) {
          setPosition("bottom");
        } else {
          setPosition("top");
        }

        // Determine horizontal alignment
        if (rect.left < viewportWidth / 3) {
          setAlignment("left");
        } else if (rect.left + rect.width > (viewportWidth * 2) / 3) {
          setAlignment("right");
        } else {
          setAlignment("center");
        }
      }
    };

    // Initial position calculation
    handlePosition();

    // Recalculate position on window resize and scroll
    window.addEventListener("resize", handlePosition);
    window.addEventListener("scroll", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
      window.removeEventListener("scroll", handlePosition);
    };
  }, []);

  // Compute tooltip styles based on position and alignment
  const tooltipStyles: React.CSSProperties = {
    position: "absolute",
    zIndex: 40,
  };

  if (position === "top") {
    tooltipStyles.bottom = "125%";
  } else {
    tooltipStyles.top = "125%";
  }

  if (alignment === "left") {
    tooltipStyles.left = "0";
    tooltipStyles.transform = "translateX(0%)";
  } else if (alignment === "right") {
    tooltipStyles.right = "0";
    tooltipStyles.transform = "translateX(0%)";
  } else {
    tooltipStyles.left = "50%";
    tooltipStyles.transform = "translateX(-50%)";
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={containerRef}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="w-[200px] max-w-[48vw] inline-block px-3 py-2 text-sm font-medium text-white bg-background-heavy-500 rounded-lg shadow-sm dark:bg-background-medium-700 z-40"
          style={tooltipStyles}
        >
          {title}
        </div>
      )}
    </div>
  );
};
