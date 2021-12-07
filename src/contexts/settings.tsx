import { Context, createContext, FC, useEffect, useState } from "react";
import { getSettings } from "../pages/Home/services";

interface Settings {
  clientHost: string;
}
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SettingsContext: Context<Settings> = createContext<Settings>({
  clientHost: "",
});

export const SettingsWrapper: FC<Props> = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [clientHost, setClientHost] = useState("");
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getSettings();
      if (res && res.data) {
        setClientHost(res.data.clientHost);
      }
    };
    fetchSettings();
  }, []);
  return (
    <SettingsContext.Provider value={{ clientHost }}>
      {children}
    </SettingsContext.Provider>
  );
};
