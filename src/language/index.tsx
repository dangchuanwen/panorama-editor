import { Context, createContext, FC, useEffect, useState } from 'react';
import { getLanguagePackage } from 'requests/requests';
import { WebsiteTexts } from './interface';

export enum LanguageNames {
  cn = 'cn',
  en = 'en',
}
interface ILanguageState {
  languageName: LanguageNames;
  languagePackage: WebsiteTexts | null;
  updateLanguagePackage: (languageName: LanguageNames) => Promise<void>;
}

const saveLanaugeToLocalStorage = (languageName: LanguageNames) => {
  localStorage.setItem('language', languageName);
};
const getLanguageFromLocalStorage = () => {
  return (localStorage.getItem('language') as LanguageNames) || LanguageNames.cn;
};

const useLanguageState: () => ILanguageState = () => {
  const [languageName, setLanguageName] = useState<LanguageNames>(getLanguageFromLocalStorage());
  const [languagePackage, setLanguagePackage] = useState<WebsiteTexts | null>(null);
  const updateLanguagePackage = async (languageName: LanguageNames) => {
    try {
      setLanguageName(languageName);
      saveLanaugeToLocalStorage(languageName);
      const res = await getLanguagePackage(languageName);
      setLanguagePackage(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    updateLanguagePackage(getLanguageFromLocalStorage());
  }, []);
  return { languagePackage, updateLanguagePackage, languageName };
};

export const LanguageContext: Context<ILanguageState> = createContext<ILanguageState>({
  languagePackage: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateLanguagePackage: async () => {},
  languageName: getLanguageFromLocalStorage(),
});

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const LanguageWrapper: FC<Props> = ({ children }: Props) => {
  return <LanguageContext.Provider value={useLanguageState()}>{children}</LanguageContext.Provider>;
};
