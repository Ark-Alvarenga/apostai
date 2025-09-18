import { SeenInItems } from "@/constants";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";

export const SeenInSection = () => {
  const translations = useTranslations("seenIn");

  return (
    <div className="w-full h-auto z-10 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="-mt-[22vw] lg:-mt-[22vw]"
      >
        <path
          fill="#121212"
          fillOpacity="1"
          d="M0,288L80,261.3C160,235,320,181,480,186.7C640,192,800,256,960,272C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>

      {/* <div className="flex justify-start lg:justify-center items-start overflow-x-auto scrollbar-hide gap-8 py-8 px-16 lg:px-6 -mt-[10px] lg:-mt-[45px] text-white bg-background-heavy-500">
        <p className="min-w-[78px] caption opacity-35">
          {translations("title")}
        </p>
        {SeenInItems.map((image, index) => (
          <Image
            key={index}
            style={{
              filter: "invert(1) saturate(0) brightness(2)",
              mixBlendMode: "lighten",
              verticalAlign: "middle",
            }}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            src={image.src}
          />
        ))}
      </div> */}

      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 bg-background-heavy-500 px-6">
        {/* <div className="max-w-full w-[340px] min-h-[200px] flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-lg border border-primary-500 transition-transform duration-450 ease-in lg:[transform:perspective(500px)rotateY(14deg)] hover:[transform:perspective(500px)rotateY(0deg)]">
          <p className="text-black text-center font-bold">
            &quot;{translations("techCrunch")}&quot;
          </p>
          <Image
            alt="TechCrunch"
            width="163"
            height="25"
            loading="lazy"
            src="/images/techcrunch.png"
          />
        </div>
        <div className="max-w-full w-[340px] min-h-[200px] flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-lg border border-primary-500 transition-all duration-450 ease-in lg:scale-90 hover:scale-100">
          <p className="text-black text-center font-bold">
            &quot;{translations("zdNet")}&quot;
          </p>
          <Image
            alt="ZDNet"
            width="38"
            height="25"
            loading="lazy"
            src="https://photoai.com/assets/zdnet.png?1708109686"
          />
        </div>
        <div className="max-w-full w-[340px] min-h-[200px] flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-lg border border-primary-500 transition-transform duration-450 ease-in lg:[transform:perspective(500px)rotateY(-14deg)] hover:[transform:perspective(500px)rotateY(0deg)]">
          <p className="text-black text-center font-bold">
            &quot;{translations("fastCompany")}&quot;
          </p>
          <Image
            alt="FastCompany"
            width="176"
            height="25"
            loading="lazy"
            src="/images/fastcompany.svg"
          />
        </div> */}
      </div>
    </div>
  );
};
