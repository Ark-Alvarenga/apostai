import { useTranslations } from "@/hooks/useTranslations";
import { SolutionItem } from "./SolutionItem";
import { SolutionCTA } from "./SolutionCTA";

const items = [
  {
    icon: "📊",
    title: "smartBetsTitle",
    text: "smartBets",
  },
  {
    icon: "💼",
    title: "happyUsersTitle",
    text: "happyUsers",
  },
  {
    icon: "💵",
    title: "revenueTitle",
    text: "revenue",
  },
];

export const TheSolutionSection = () => {
  const translations = useTranslations("solutionSection");

  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, #121212 0, #1E1E1E 100%)",
        }}
      >
        <div className="max-w-[1200px] min-h-screen flex flex-col justify-end items-start gap-6 px-6 pt-8 mx-auto">
          <div className="w-full lg:w-1/2 lg:h-screen flex flex-col justify-center items-center lg:items-start gap-6">
            <p className="text-sm font-bold text-primary-600">
              {translations("pretitle")}
            </p>
            <h2 className="max-w-[550px] text-2xl lg:text-5xl font-bold text-center lg:text-left text-primary-600">
              {translations("title")}
            </h2>
            <p className="text-sm lg:text-xl text-center lg:text-left text-white">
              {translations("subtitle")}
            </p>
            <SolutionCTA />
            <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-4 mt-6 lg:mt-24">
              {items.map(({ icon, title, text }, index) => (
                <SolutionItem
                  key={`${title}-${index}`}
                  icon={icon}
                  title={title}
                  text={text}
                />
              ))}
            </div>
          </div>
          <div
            className="bg-cover bg-no-repeat w-full h-[90vw] lg:w-[40vw] lg:h-[40vw] lg:absolute right-0 border border-background-light-500 rounded-t-lg lg:rounded-ss-lg lg:rounded-se-none border-b-0 lg:border-r-0 shadow-[-2px_-11px_40px_4px_rgba(255,255,255,0.14)]"
            style={{ backgroundImage: 'url("images/feature_example.png")' }}
          />
        </div>
      </div>
    </>
  );
};
