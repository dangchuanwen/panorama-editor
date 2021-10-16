import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Gender } from 'interface';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';

interface Props {
  gender: Gender;
  handleSelectGender: (gender: Gender) => void;
}

const GenderSelecter: FC<Props> = ({ gender, handleSelectGender }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  return (
    <RadioGroup
      aria-label="gender"
      value={gender}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectGender(Number(e.target.value))}
      style={{ flexDirection: 'row' }}
    >
      <FormControlLabel
        value={Gender.Female}
        control={<Radio size="small" color="secondary" />}
        label={languagePackage?.Female}
      />
      <FormControlLabel
        value={Gender.Male}
        control={<Radio size="small" color="primary" />}
        label={languagePackage?.Male}
      />
    </RadioGroup>
  );
};

export default GenderSelecter;
