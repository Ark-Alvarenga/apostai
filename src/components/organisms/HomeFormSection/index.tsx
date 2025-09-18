import { Laurel, LoginForm } from "@/components/molecules";
import { useTranslations } from "@/hooks/useTranslations";

export const HomeFormSection = () => {
  const translations = useTranslations("homeForm");

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-start gap-8 pt-24 lg:pt-40 pb-16 lg:pb-0 mx-auto"
      // style={{ backgroundImage: 'url("images/heroBG.jpg")' }}
    >
      <div className="min-h-full absolute inset-0 bg-gradient-to-b from-black via-black to-black">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          loop
          muted
          src="/videos/banner.mp4"
        />
      </div>
      <div
        className="min-h-full absolute inset-0 bg-gradient-to-b from-black via-black to-black"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 0.95) 90%, rgba(0, 0, 0, 1) 100%)",
        }}
      />
      <div className="max-w-[1200px] flex flex-col-reverse md:flex-col lg:flex-row justify-center items-start gap-8 px-6 lg:p-0">
        <div className="w-full lg:w-7/12 flex flex-col gap-4 text-white z-10 lg:mb-32">
          <div className="mx-auto lg:mr-auto lg:ml-10 my-4 lg:mb-4">
            <Laurel />
          </div>
          <div>
            <h1 className="text-3xl lg:text-6xl font-bold">
              {translations("title")}
            </h1>
            <p className="lg:text-2xl font-bold">{translations("subtitle")}</p>
          </div>
          <ul className="flex flex-col gap-4">
            <li>
              <p className="text-sm lg:text-xl font-bold">
                {translations("selectGames")}
              </p>
            </li>
            <li>
              <div className="text-sm lg:text-xl font-bold">
                {translations("realTime")}
              </div>
            </li>
            <li>
              <p className="text-sm lg:text-xl font-bold">
                {translations("aiCalculates")}
              </p>
            </li>
            <li>
              <p className="text-sm lg:text-xl font-bold">
                {translations("trackEarnings")}
              </p>
            </li>
          </ul>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
