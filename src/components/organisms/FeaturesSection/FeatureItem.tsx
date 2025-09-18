import { useTranslations } from "@/hooks/useTranslations";

interface FeatureItemProps {
  title: string;
  imgName: string;
  textItems: { title?: string; text: string }[];
  index: number;
  anchor: string;
}

export const FeatureItem = ({
  title,
  imgName,
  textItems,
  index,
  anchor,
}: FeatureItemProps) => {
  const translations = useTranslations("featureItems");
  const isEven = index % 2 === 0;

  const containerClasses = `w-full h-auto flex flex-col justify-start items-center gap-4 ${
    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
  }`;

  const imageClasses = `bg-cover bg-center bg-no-repeat w-full lg:w-1/2 min-h-[60vw] lg:min-h-[22vw] rounded ${
    isEven
      ? "transition-transform duration-450 ease-in lg:[transform:perspective(500px)rotateY(-14deg)] hover:[transform:perspective(500px)rotateY(0deg)]"
      : "transition-transform duration-450 ease-in lg:[transform:perspective(500px)rotateY(14deg)] hover:[transform:perspective(500px)rotateY(0deg)]"
  }`;
  return (
    <div className={containerClasses} id={anchor}>
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-4">
        <h4 className="text-2xl font-bold text-primary-800">
          {translations(title)}
        </h4>
        {textItems.map(({ title, text }, index) => {
          return (
            <div key={`${title}-${index}`}>
              {title && (
                <h5 className="text-lg font-bold text-white">
                  {translations(title)}
                </h5>
              )}
              <p className="text-white">{translations(text)}</p>
            </div>
          );
        })}
      </div>

      <div
        className={imageClasses}
        style={{ backgroundImage: `url("images/${imgName}")` }}
      />
    </div>
  );
};
