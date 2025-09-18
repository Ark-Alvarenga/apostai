"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export const GoBackButton: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return <FaArrowLeft onClick={handleGoBack} />;
};
