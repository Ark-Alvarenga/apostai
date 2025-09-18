"use client";
import { decodeHtmlEntity } from "@/helpers/formatters/text";
import { useCountries } from "@/hooks";
import React, { useMemo } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Skeleton from "react-loading-skeleton";
import Select from "react-select";
interface CountrySelectProps {
  setSelectedCountryId: (key: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  setSelectedCountryId,
}) => {
  const translations = useTranslations("gameSelector");
  const { countries, isLoading, isError } = useCountries();

  if (isError) return <div>Failed to load</div>;
  if (!isLoading && !countries)
    return <div>No countries available at the moment</div>;

  const specialCountries = ["br", "world", "gb-eng", "es", "it", "de", "fr"];

  const sortedCountries = countries?.sort((a, b) => {
    const aCode = a.code || "world";
    const bCode = b.code || "world";

    const aIndex = specialCountries.indexOf(aCode.toLowerCase());
    const bIndex = specialCountries.indexOf(bCode.toLowerCase());

    if (aIndex !== -1 && bIndex !== -1) {
      // Both countries are special; sort according to their index in specialCountries
      return aIndex - bIndex;
    } else if (aIndex !== -1) {
      // Only 'a' is special
      return -1;
    } else if (bIndex !== -1) {
      // Only 'b' is special
      return 1;
    } else {
      // Neither is special; maintain original order or sort alphabetically
      return 0;
    }
  });

  const options = useMemo(() => {
    return sortedCountries?.map((country) => {
      const isWorld = !country.code;
      return {
        value: isWorld ? "world" : country.code,
        label: (
          <div className="text-background-heavy-500" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                isWorld
                  ? "/images/flags/worldFlag.webp"
                  : `/images/flags/${country.code.toLowerCase()}.svg`
              }
              alt={country.code}
              loading="lazy"
              style={{ width: "20px", height: "15px", marginRight: "10px" }}
            />
            {decodeHtmlEntity(country.name)}
          </div>
        ),
      };
    });
  }, [sortedCountries]);

  const customFilter = (option: any, inputValue: string): boolean => {
    const labelFromOption = decodeHtmlEntity(option.label.props.children[1]);
    return labelFromOption.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div>
      <h4 className="text-lg text-white font-bold">
        {translations("selectCountry")}
      </h4>
      {isLoading ? (
        <Skeleton height={38} width="100%" count={1} />
      ) : (
        <Select
          onChange={(option) => setSelectedCountryId(option?.value ?? "")}
          options={options}
          className="w-full mt-1 text-black"
          classNamePrefix="react-select"
          filterOption={customFilter}
          placeholder={translations("selectCountryPlaceholder")}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />
      )}
    </div>
  );
};
