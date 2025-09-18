import { useEffect, useState } from "react";

const LOCAL_LOGO_PATH = "/images/teams/"; // Caminho relativo ao `public/`
const API_LOGO_BASE_URL = "https://media.api-sports.io/football/teams/";
const FALLBACK_IMAGE = "/images/flags/worldFlag.webp";

export function useTeamLogo(logoUrl: string | undefined): string {
  const [finalLogo, setFinalLogo] = useState<string>(logoUrl || FALLBACK_IMAGE);

  useEffect(() => {
    if (!logoUrl || !logoUrl.includes(API_LOGO_BASE_URL)) {
      setFinalLogo(FALLBACK_IMAGE);
      return;
    }

    const teamIdMatch = logoUrl.match(/(\d+)\.png$/);
    if (!teamIdMatch) {
      setFinalLogo(FALLBACK_IMAGE);
      return;
    }

    const teamId = teamIdMatch[1];
    const localPath = `${LOCAL_LOGO_PATH}${teamId}.png`;

    async function fetchLocalLogo() {
      try {
        const response = await fetch(localPath, { method: "HEAD" });
        if (response.ok) {
          console.log(`✅ Logo local encontrada: ${localPath}`);
          setFinalLogo(localPath);
        } else {
          console.warn(
            `⚠️ Logo local NÃO encontrada: ${localPath}, usando API.`
          );
          setFinalLogo(logoUrl!); // Se a local não existir, mantém a da API
        }
      } catch (error) {
        console.error(`🚨 Erro ao buscar logo ${localPath}:`, error);
        setFinalLogo(logoUrl!); // Se houver erro, usa a logo da API
      }
    }

    fetchLocalLogo();
  }, [logoUrl]);

  return finalLogo;
}
