import { customerReviews } from "@/constants";
import { ReviewItem } from "./ReviewItem";
import { useTranslations } from "@/hooks/useTranslations";

export const UserReviewSection = () => {
  const translations = useTranslations("userReview");

  return (
    <div className="max-w-[1200px] min-h-screen flex flex-col justify-center items-center gap-6 px-6 py-8 mx-auto">
      <p className="text-xs lg:text-sm font-bold text-primary-600">
        {translations("pretitle")}
      </p>
      <h2 className="max-w-[550px] text-2xl lg:text-5xl font-bold text-center text-primary-600">
        {translations("title")}
      </h2>
      <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 mt-8 lg:mt-24">
        {customerReviews
          .slice(0, 3)
          .map(({ reviewer, score, comment }, index) => (
            <ReviewItem
              key={`${score}-${index}`}
              reviewer={reviewer}
              score={score}
              comment={comment}
            />
          ))}
      </div>
    </div>
  );
};
