import { Select } from 'antd';
import { Country, getCountries } from 'interface';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';

interface Props {
  country: Country;
  handleSelectCountry: (country: Country) => void;
}

const { Option } = Select;
const CountrySelecter: FC<Props> = ({ country, handleSelectCountry }: Props) => {
  const renderCountrySelecter = () => {
    const countriesTexts: Map<Country, string> = new Map();
    const { languagePackage } = useContext(LanguageContext);
    countriesTexts.set(Country.China, languagePackage?.China || '');
    countriesTexts.set(Country.Indonesia, languagePackage?.Indonesia || '');
    countriesTexts.set(Country.Uzbekistan, languagePackage?.Uzbekistan || '');
    const countries = getCountries(countriesTexts);
    const CountryOptions = countries.map((item) => {
      return (
        <Option value={item.value} key={item.value}>
          <img src={item.nationalFlag} style={{ width: '1.4vw', marginRight: '0.3vw' }} />
          <strong>{item.text}</strong>
        </Option>
      );
    });
    return (
      <Select
        style={{ width: '50%' }}
        size="middle"
        value={country}
        onChange={(val: Country) => handleSelectCountry(val)}
      >
        {CountryOptions}
      </Select>
    );
  };
  return <>{renderCountrySelecter()}</>;
};

export default CountrySelecter;
