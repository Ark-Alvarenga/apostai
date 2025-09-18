import { useTeamLogo } from "@/hooks";

type TeamLogoImageProps = {
  logo: string | undefined;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  sizeLg?: "sm" | "md" | "lg" | "xl";
};

const sizeClasses = {
  "2xs": "w-4 h-4", // 16px
  xs: "w-5 h-5", // 20px
  sm: "w-6 h-6", // 24px
  md: "w-8 h-8", // 32px
  lg: "w-12 h-12", // 48px
  xl: "w-16 h-16", // 64px
  "2xl": "w-20 h-20", // 80px
  "3xl": "w-24 h-24", // 96px
  "4xl": "w-32 h-32", // 128px
};

export const TeamLogoImage: React.FC<TeamLogoImageProps> = ({
  logo,
  alt,
  size = "md",
  sizeLg = "md",
}) => {
  const localLogo = useTeamLogo(logo) || logo;

  return (
    localLogo && (
      <img
        src={localLogo}
        alt={alt || "Logo do time"}
        width={64}
        height={64}
        className={`${sizeClasses[size]} lg:${sizeClasses[sizeLg]} object-contain`}
      />
    )
  );
};
