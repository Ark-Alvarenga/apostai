import React, { useState } from "react";
import Select from "react-select";
import { FiChevronDown, FiChevronUp, FiDollarSign } from "react-icons/fi";
import { FilterCriteria } from "@/hooks/useArbitrage";
import { InputField } from "@/components/atoms/InputField";
import { CustomSelect } from "@/components/atoms/CustomSelect";

type FiltersProps = {
  allMarkets: { value: string; label: string }[];
  selectedMarkets: string[];
  onMarketChange: (selectedMarkets: string[]) => void;
  filterCriteria: {
    minOdd?: number;
    maxOdd?: number;
    minBookmakers?: number;
    arbitrageThreshold?: number;
    allowedBookmakers?: string[];
  };
  onCriteriaChange: (newCriteria: Partial<FilterCriteria>) => void;
};

export const Filters: React.FC<FiltersProps> = ({
  allMarkets,
  selectedMarkets,
  onMarketChange,
  filterCriteria,
  onCriteriaChange,
}) => {
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  return (
    <div className="space-y-6 mb-6">
      {/* Filtro por mercado */}
      <div className="bg-background-heavy-800 p-4 rounded-lg shadow-md">
        <CustomSelect
          options={allMarkets}
          isMulti
          value={selectedMarkets.map((market) => ({
            value: market,
            label: market,
          }))}
          onChange={(selectedOptions) => {
            const selected = selectedOptions.map((option) => option.value);
            onMarketChange(selected);
          }}
          placeholder="Selecione os mercados"
          label="Filtrar por mercado:"
        />
      </div>

      {/* Filtros adicionais */}
      <div className="bg-background-heavy-800 p-4 rounded-lg shadow-md">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowAdditionalFilters((prev) => !prev)}
        >
          <h4 className="text-white font-bold text-sm">Filtros adicionais:</h4>
          {showAdditionalFilters ? (
            <FiChevronUp className="text-white" size={20} />
          ) : (
            <FiChevronDown className="text-white" size={20} />
          )}
        </div>
        {showAdditionalFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Odd mínima"
              type="number"
              step={0.01}
              value={filterCriteria.minOdd || ""}
              onChange={(e) =>
                onCriteriaChange({ minOdd: parseFloat(e.target.value) })
              }
              tooltip="O valor mínimo de odds que serão consideradas nos mercados."
            />
            <InputField
              label="Odd máxima"
              type="number"
              step={0.01}
              value={filterCriteria.maxOdd || ""}
              onChange={(e) =>
                onCriteriaChange({ maxOdd: parseFloat(e.target.value) })
              }
              tooltip="O valor máximo de odds que serão consideradas nos mercados."
            />
            <InputField
              label="Mínimo de casas de apostas"
              type="number"
              value={filterCriteria.minBookmakers || ""}
              onChange={(e) =>
                onCriteriaChange({
                  minBookmakers: parseInt(e.target.value, 10),
                })
              }
              tooltip="O número mínimo de casas de apostas necessário para incluir um mercado."
            />
          </div>
        )}
      </div>
    </div>
  );
};
