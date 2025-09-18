import { Button, SliderInput } from "@/components";
import { createUsage, getPrediction } from "@/services";
import { Analysis, SelectedGameObj } from "@/types";
import {
  generateBetAnalysisPrompt,
  processOddsIntoText,
} from "@betSlayer/helpers";
import { useState } from "react";
import { toast } from "react-toastify";
import { GameSelector } from "../GameSelector";
import { FaDollarSign, FaX } from "react-icons/fa6";
import { TooltipIcon } from "@/components/molecules/Tooltip/TooltipIcon";
import { useTranslations } from "@/hooks/useTranslations";
import { useGetSubscriptions } from "@/hooks";
import { InputField } from "@/components/atoms/InputField";
import { TextAreaField } from "@/components/atoms/TextAreaField/TextAreaField";
import { IUsage } from "@/models";

interface PromptBarProps {
  isLoading: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setActualAnalysis: React.Dispatch<React.SetStateAction<Analysis | undefined>>;
  addUsageToHistory: (usage: IUsage) => void;
  closeBar?: () => void;
  setIsGeneratingAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PromptBar = ({
  isLoading,
  setIsLoading,
  setActualAnalysis,
  closeBar,
  addUsageToHistory,
  setIsGeneratingAnalysis,
}: PromptBarProps) => {
  const translations = useTranslations("promptBar");

  const [userPrompt, setUserPrompt] = useState("");
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [selectedGames, setSelectedGames] = useState<SelectedGameObj[]>([]);
  const [betAmmount, setBetAmmount] = useState<string>();
  const { subscription } = useGetSubscriptions();

  const handleSubmit = async () => {
    if (!selectedGames.length)
      return toast.error(translations("selectAtLeast"));

    if (!betAmmount) return toast.error(translations("addBetAmmount"));
    setIsGeneratingAnalysis(true);
    setIsLoading(true);
    try {
      const enrichedGamesPromises = selectedGames.map(async (game) => {
        const prediction = await getPrediction({
          fixtureId: String(game.fixture.id),
        });

        return {
          ...game,
          comparison: prediction[0].comparison,
          teams: prediction[0].teams,
          predictions: prediction[0].predictions,
        };
      });

      const enrichedGames = await Promise.all(enrichedGamesPromises);

      const games = processOddsIntoText(enrichedGames);

      const requestData = generateBetAnalysisPrompt({
        betAmmount,
        games,
        riskTolerance,
        userPrompt,
      });

      const res = await createUsage({
        subscription,
        requestData,
        betAmmount: Number(betAmmount),
      });

      setActualAnalysis(res.data.responseData as Analysis);
      addUsageToHistory(res.data);
    } catch (error) {
      toast.error(translations("somethingWentWrong"));
    }

    closeBar?.();
    setIsLoading(false);
    setIsGeneratingAnalysis(false);
  };

  return (
    <div className="w-full lg:min-w-[375px] lg:max-w-[375px] h-full flex flex-col bg-theme-gray-500 border-r border-t border-theme-gray-300">
      <div className="lg:max-w-[375px] w-full flex-grow overflow-y-auto px-4 py-4">
        {/* Conteúdo Principal */}
        <div className="flex flex-col gap-4">
          {/* Fechar Barra */}
          {closeBar && (
            <button
              onClick={() => closeBar()}
              className="w-full flex justify-end text-xl text-white"
            >
              <FaX />
            </button>
          )}

          {/* Valor da Aposta */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <InputField
                label={translations("betAmmount")}
                tooltip={translations("betAmmountTooltip")}
                onChange={(event) => setBetAmmount(event.target.value)}
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                value={betAmmount}
                min={1}
                type="number"
                iconLeft="dollar"
                placeholder="Digite o valor da aposta"
                className="w-full pl-8 text-white py-2 px-3 rounded-lg bg-background-heavy-700 border border-theme-gray-300 focus:border-primary-600 transition-all text-sm"
              />
            </div>
          </div>

          {/* Prompt do Usuário */}
          <div className="flex flex-col gap-1">
            <TextAreaField
              label={translations("prompt")}
              tooltip={translations("promptTooltip")}
              onChange={(event) => setUserPrompt(event.target.value)}
              value={userPrompt}
              placeholder={translations("promptPlaceholder")}
              rows={4}
              maxLength={250}
              className="w-full text-white py-2 px-3 rounded-lg bg-background-heavy-700 border border-theme-gray-300 focus:border-primary-600 transition-all text-sm"
            />
          </div>

          {/* Seletor de Jogos */}
          <GameSelector
            selectedGames={selectedGames}
            setSelectedGames={setSelectedGames}
          />

          {/* Controle de Risco */}
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-white flex items-center gap-2">
              {translations("risk")}
              <TooltipIcon title={translations("riskTooltip")} />
            </h5>
            <SliderInput
              min={0}
              max={100}
              step={1}
              value={riskTolerance}
              onValueChange={setRiskTolerance}
            />
            <p className="text-right text-sm text-gray-500">{`${riskTolerance}%`}</p>
          </div>
        </div>
      </div>

      {/* Botão de Envio */}
      <div className="w-full px-4 py-4 bg-theme-gray-500 ">
        <Button
          round="round"
          variant="outlined"
          text={translations("cta")}
          weight="bold"
          onClick={handleSubmit}
          isLoading={isLoading}
          className="w-full"
        />
      </div>
    </div>
  );
};
