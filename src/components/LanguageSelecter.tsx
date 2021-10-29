import { Select } from 'antd';
import { LanguageContext, LanguageNames } from 'language';

import { FC, useContext } from 'react';

interface Language {
  name: LanguageNames;
  label: string;
}

const { Option } = Select;
const LanguageSelecter: FC = () => {
  const { updateLanguagePackage, languageName } = useContext(LanguageContext);
  const languages: Language[] = [
    { name: LanguageNames.cn, label: '中文简体' },
    { name: LanguageNames.en, label: 'English' },
  ];
  const language = languages.find((language) => language.name === languageName) || languages[0];
  const handleSelectLanguage = (val: LanguageNames) => {
    updateLanguagePackage(val);
  };
  return (
    <Select defaultValue={language.name} size="large" onChange={(val) => handleSelectLanguage(val)} bordered={false}>
      {languages.map((language) => (
        <Option key={language.name} value={language.name}>
          {language.label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelecter;
