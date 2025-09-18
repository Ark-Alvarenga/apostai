import { useTranslations } from "@/hooks/useTranslations";

interface ReviewItemProps {
  reviewer: string;
  score: number;
  comment: string;
}

export const ReviewItem = ({ reviewer, score, comment }: ReviewItemProps) => {
  const translations = useTranslations("userReview");

  return (
    <div className="w-full lg:w-1/3 h-full flex flex-col justify-between items-center gap-3 px-6 py-4 bg-white border border-primary-600 rounded-lg text-black">
      <div className="text-xl text-primary-600 font-bold mr-auto">{`${score}/5`}</div>
      <h4 className="text-center">{translations(comment)}</h4>
      <div className="w-full flex justify-between">
        <p className="text-lg font-bold">{translations(reviewer)}</p>
        <span
          style={{
            marginTop: "7px",
            float: "right",
            opacity: "0.5",
            filter: "saturate(0)",
            fontSize: "10px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          ✅ {translations("verified")}
        </span>
      </div>
    </div>
  );
};
