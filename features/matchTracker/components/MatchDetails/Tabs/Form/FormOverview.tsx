import React from "react";
import { FaRunning, FaShieldAlt } from "react-icons/fa";

type FormOverviewProps = {
  played: number | any;
  att: string | any;
  def: string | any;
};

export const FormOverview: React.FC<FormOverviewProps> = ({
  played,
  att,
  def,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-background-heavy-700 p-4 rounded-md text-center">
        <h4 className="text-white font-bold">Jogos Disputados</h4>
        <p className="text-secondary-400 text-lg">{played}</p>
      </div>
      <div className="bg-background-heavy-700 p-4 rounded-md text-center flex flex-col items-center">
        <FaRunning className="text-green-400 text-2xl mb-2" />
        <h4 className="text-white font-bold">Ataque</h4>
        <p className="text-secondary-400 text-lg">{att}</p>
      </div>
      <div className="bg-background-heavy-700 p-4 rounded-md text-center flex flex-col items-center">
        <FaShieldAlt className="text-red-400 text-2xl mb-2" />
        <h4 className="text-white font-bold">Defesa</h4>
        <p className="text-secondary-400 text-lg">{def}</p>
      </div>
    </div>
  );
};
