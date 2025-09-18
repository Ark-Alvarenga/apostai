import { FAQItems } from "@/constants";
import { FAQItem } from "./FAQItem";
import { useTranslations } from "@/hooks/useTranslations";

export const FAQSection = () => {
  const translations = useTranslations("faq");

  return (
    <div className="max-w-[1200px] h-auto flex flex-col justify-center items-center px-6 py-8 mx-auto my-8 lg:my-24">
      <h2 className="text-2xl lg:text-5xl font-bold text-left mr-auto text-primary-600 mb-12">
        {translations("title")}
      </h2>
      {FAQItems.map(({ question, answer }, index) => {
        return (
          <FAQItem
            key={`${question}-${index}`}
            question={question}
            answer={answer}
          />
        );
      })}
    </div>
  );
};
