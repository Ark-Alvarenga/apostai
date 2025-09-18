"use client";
import { useInternalFixtures } from "@/hooks/useInternalFixtures";
import MatchDetailsContainer from "@nextGames/components/MatchDetails";
import * as React from "react";

interface IAppProps {}

export const HomeOldMatchsSection = (props: IAppProps) => {
  const { fixtures } = useInternalFixtures({ period: "past" });

  return (
    <div className="flex text-lg gap-8 p-4 justify-center items-start py-16">
      {/* Texto à esquerda com comportamento sticky */}
      <div className="max-w-[500px] p-6 text-gray-300 shadow-md rounded-lg sticky top-4 self-start">
        <h2 className="text-4xl text-primary-500 font-bold mb-4">
          🎯 Maximize Suas Chances com o ApostAí
        </h2>
        <p className="mb-4">
          Eleve suas apostas ao próximo nível com o ApostAí, uma plataforma
          avançada que combina inteligência artificial com insights
          personalizados. Nossa ferramenta oferece dados em tempo real, ajudando
          você a tomar as decisões mais inteligentes e precisas em qualquer
          mercado de apostas.
        </p>
        <ul className="list-disc ml-6 space-y-3">
          <li>
            🧠 Inteligência Avançada: Previsões baseadas em dados atualizados,
            incluindo desempenho de times e estatísticas detalhadas.
          </li>
          <li>
            🔍 Filtragem Personalizada: Encontre rapidamente as melhores odds
            disponíveis em diversas casas de apostas, ajustando filtros como{" "}
            <strong>Odds mínimas</strong>, <strong>número de casas</strong> e
            até <strong>arbitragem</strong>.
          </li>
          <li>
            📊 Insights Gráficos: Visualize métricas como gols marcados,
            distribuídos por intervalo de tempo, cartões recebidos e outros
            fatores para identificar padrões de jogo.
          </li>
          <li>
            📈 Comparação de Mercados: Analise odds entre diferentes mercados
            (vencedor do jogo, handicaps, gols totais, etc.), com projeções que
            destacam probabilidades mais favoráveis.
          </li>
        </ul>
      </div>

      {/* Fixture à direita */}
      <div className="max-w-[700px] overflow-auto">
        {fixtures && fixtures?.length && (
          <MatchDetailsContainer details={fixtures[0]} />
        )}
      </div>
    </div>
  );
};
