import { useEffect, useState } from 'react';
import { CultureTheme, getCultureThemes } from 'requests/requests';

export const useCultureThemes: () => CultureTheme[] = () => {
  const [cultureThemes, setCultureThemes] = useState<CultureTheme[]>([]);
  useEffect(() => {
    const fetchCultureThemes = async () => {
      const res = await getCultureThemes();
      const data: CultureTheme[] = res.data;
      setCultureThemes(data);
    };
    fetchCultureThemes();
  }, []);
  return cultureThemes;
};
