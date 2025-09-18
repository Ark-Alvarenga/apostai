"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  theme: string;
  changeTheme: (theme: string) => void;
}

interface VariablesConfig {
  apiKey: string;
  apiUrl: string;
  gtmId: string;
  hotJarId: string;
}

interface LogoConfig {
  logoUrl: string;
}

interface AppConfig {
  theme: ThemeConfig;
  variables: VariablesConfig;
  logo: LogoConfig;
}

const defaultConfig: AppConfig = {
  theme: {
    primaryColor: "#0070f3",
    secondaryColor: "#ff4081",
    theme: "light",
    changeTheme: () => {},
  },
  variables: {
    apiKey: "default-api-key",
    apiUrl: "https://api.example.com",
    gtmId: "GTM-TSRBS8LH",
    hotJarId: "",
  },
  logo: {
    logoUrl: "/images/logo.png",
  },
};

const AppConfigContext = createContext<AppConfig>(defaultConfig);

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(defaultConfig.theme.theme);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  const config: AppConfig = {
    ...defaultConfig,
    theme: {
      ...defaultConfig.theme,
      theme: theme,
      changeTheme: changeTheme,
    },
  };

  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  return useContext(AppConfigContext);
};
