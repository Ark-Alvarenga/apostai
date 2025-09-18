import React from "react";
import { FaCheckCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa";

interface Last5ResultsProps {
  form: string; // Sequência de resultados: "WDLDWLDLDWLWDDWWDLWWLWLLDWWDWDWWWWDWDW"
}

const Last5Results: React.FC<Last5ResultsProps> = ({ form }) => {
  // Extrai os últimos 5 resultados
  const last5 = form.slice(-5).split("");

  // Mapeia cada resultado para um ícone correspondente
  const resultIcons = last5.map((result, index) => {
    if (result === "W") {
      return (
        <FaCheckCircle
          key={index}
          className="text-primary-500 text-sm md:text-2xl"
        />
      );
    } else if (result === "D") {
      return (
        <FaMinusCircle
          key={index}
          className="text-gray-400 text-sm md:text-2xl"
        />
      );
    } else if (result === "L") {
      return (
        <FaTimesCircle key={index} className="text-alert text-sm md:text-2xl" />
      );
    } else {
      return null; // Caso de formato inválido
    }
  });

  return <div className="flex gap-2 py-2">{resultIcons}</div>;
};

export default Last5Results;
