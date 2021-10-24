import { Box } from '@material-ui/core';
import { Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { CultureTheme, getCultureThemes } from 'requests/requests';
import styles from './styles.module.css';
type CultureThemeProps = CultureTheme & {
  activated?: boolean;
};
type Props = {
  handleClickCultureThemeTag: (cultureThemeNames: string[]) => void;
};
const ClassificationTags: FC<Props> = ({ handleClickCultureThemeTag }: Props) => {
  const [showAll, setShowAll] = useState(true);
  const [cultureThemes, setCultureThemes] = useState<CultureThemeProps[]>([]);
  useEffect(() => {
    const fetchCultureThemes = async () => {
      const res = await getCultureThemes();
      const data: CultureTheme[] = res.data;
      setCultureThemes(data);
    };
    fetchCultureThemes();
  }, []);
  useEffect(() => {
    handleClickCultureThemeTag(
      cultureThemes.filter((cultureTheme) => cultureTheme.activated).map((cultureTheme) => cultureTheme.name),
    );
  }, [cultureThemes]);
  const handleClickTag = (cultureThemeName: string) => {
    if (cultureThemeName === 'All') {
      setCultureThemes(
        cultureThemes.map((cultureTheme) => {
          cultureTheme.activated = false;
          return cultureTheme;
        }),
      );
      setShowAll(true);
      return;
    }
    const newDatas = cultureThemes.map((cultureTheme) => {
      cultureTheme.activated =
        cultureTheme.name === cultureThemeName ? !cultureTheme.activated : cultureTheme.activated;
      return cultureTheme;
    });
    const all = !newDatas.some((item) => item.activated);
    setShowAll(all);
    setCultureThemes(newDatas);
  };
  const renderCultureThemes = () => {
    const allTag: CultureThemeProps = { _id: 'mock id', activated: showAll, name: 'All', description: '', rules: '' };
    const tags = [allTag, ...cultureThemes].map((cultureTheme) => {
      return (
        <Tag
          onClick={() => handleClickTag(cultureTheme.name)}
          className={styles.tag}
          color={cultureTheme.activated ? '#2db7f5' : 'default'}
          key={cultureTheme.name}
        >
          {cultureTheme.name}
        </Tag>
      );
    });
    return <>{tags}</>;
  };
  return <Box>{renderCultureThemes()}</Box>;
};

export default ClassificationTags;
