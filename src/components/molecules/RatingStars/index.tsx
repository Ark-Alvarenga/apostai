import Image from "next/image";

interface RatingStarsProps {
  rate: number;
  active: boolean;
}

export const RatingStars = ({ rate, active }: RatingStarsProps) => {
  const stars = Array.from({ length: rate }, (_, index) => index < rate);

  return (
    <>
      {stars.map((_, index) => {
        return (
          <Image
            style={{
              filter: active
                ? "brightness(0) saturate(100%) invert(67%) sepia(94%) saturate(5038%) hue-rotate(26deg) brightness(130%) contrast(101%)"
                : "invert(1) saturate(0) brightness(2)",
              mixBlendMode: "lighten",
              verticalAlign: "middle",
            }}
            src="/images/star.svg"
            alt={`${index + 1} Star`}
            key={`${index + 1} Star`}
            width="13"
            height="13"
          />
        );
      })}
    </>
  );
};
