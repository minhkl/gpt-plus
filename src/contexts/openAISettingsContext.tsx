"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ISettings = {
  model: string;
  temperature: number;
};
type IContextValues = {
  settings: ISettings;
  setModel: (model: ISettings["model"]) => void;
  setTemperature: (temperature: ISettings["temperature"]) => void;
};

const defaultSettings = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
};

const Context = createContext<IContextValues>({
  settings: defaultSettings,
  setModel: () => {},
  setTemperature: () => {},
});

export const OpenAISettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useState<ISettings>(defaultSettings);

  const setModel = useCallback(
    (newModel: string) =>
      setSettings((prevState) => ({
        ...prevState,
        model: newModel,
      })),
    []
  );

  const setTemperature = useCallback((newTemperature: number) => {
    setSettings((prevState) => ({
      ...prevState,
      temperature: newTemperature,
    }));
  }, []);

  const values = useMemo(
    () => ({
      settings,
      setModel,
      setTemperature,
    }),
    [settings, setModel, setTemperature]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useOpenAISettingsContext = () => useContext(Context);
