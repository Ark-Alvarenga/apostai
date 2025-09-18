import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";
import { useEffect, useState } from "react";

export const PageLoader = ({
  isLoading,
  showText = true,
}: {
  isLoading: boolean;
  showText?: boolean;
}) => {
  const translations = useTranslations("common");
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const messages = [
    "Analisando estatísticas...",
    "Calculando probabilidades...",
    "Otimizando sua aposta...",
    "Consultando a IA para insights...",
    "Ajustando estratégias...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      setFadeOut(false);
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);

      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 1 : prev));
      }, 111); // Aproximadamente 90% em 10 segundos

      messageInterval = setInterval(() => {
        setCurrentMessage(
          messages[Math.floor(Math.random() * messages.length)]
        );
      }, 5000);
    } else {
      setProgress(100);
      setTimeout(() => setFadeOut(true), 500);
    }

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  if (fadeOut) return null;

  return isLoading || progress < 100 ? (
    <div className="fixed top-0 w-[100vw] h-[100vh] bg-background-heavy-800 opacity-[97%] flex flex-col justify-center items-center z-50 transition-opacity duration-500">
      <Image
        src="/images/ballLoader.gif"
        width={350}
        height={100}
        alt="spinner"
      />
      {showText && (
        <>
          <div className="w-3/4 lg:w-[300px] bg-gray-700 h-2 lg:h-4 rounded-md mt-4 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h4 className="text-white text-xl md:text-4xl font-bold mt-4">
            {currentMessage}
          </h4>
        </>
      )}
    </div>
  ) : null;
};
