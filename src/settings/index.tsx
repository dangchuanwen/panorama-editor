import { createContext, FC, useEffect, useState } from 'react';
import { getSettings, Settings } from 'requests/requests';

const useSettings: () => Settings | null = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSettings();
  }, []);

  return settings;
};

export const SettingsContext = createContext<Settings | null>(null);

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const SettingsWrapper: FC<Props> = ({ children }: Props) => {
  return <SettingsContext.Provider value={useSettings()}>{children}</SettingsContext.Provider>;
};
