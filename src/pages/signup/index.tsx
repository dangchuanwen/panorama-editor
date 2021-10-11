import React, { useContext } from 'react';

import styles from '../signin/style.module.css';

import { Container, Grid, Button, TextField, Radio, FormControlLabel, RadioGroup, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Logo from 'assets/logo.png';
import { useAuth } from 'auth/auth';
import { message } from 'antd';
import { showHttpError } from 'requests/requests';
import { Country, Gender, getCountries } from 'interface';

import { Select } from 'antd';
import LanguageSelecter from 'components/LanguageSelecter';
import { LanguageContext } from 'language';

const { Option } = Select;

const SignUp: React.FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState<Gender>(Gender.Female);
  const [country, setCountry] = React.useState<Country>(Country.China);

  const { authContext } = useAuth();
  const { register } = useContext(authContext);

  const renderCountrySelecter = () => {
    const countriesTexts: Map<Country, string> = new Map();
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
      <Select style={{ width: '50%' }} size="small" value={country} onChange={(val: Country) => setCountry(val)}>
        {CountryOptions}
      </Select>
    );
  };

  const handleClickCreate = async () => {
    if (!userName) {
      message.warn(languagePackage?.PleaseEnterYourUsername);
      return;
    }
    if (!password) {
      message.warn(languagePackage?.PleaseEnterYourPassword);
      return;
    }
    try {
      await register(userName, password, gender, country);
      message.success(languagePackage?.CreateSuccessfully);
    } catch (err) {
      showHttpError(err, '用户');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Container maxWidth={false} className={styles.container}>
        <Grid container>
          <Grid item xs={5}>
            <div className={styles.posterWrapper}>
              <img
                src="https://images.pexels.com/photos/4145356/pexels-photo-4145356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt=""
              />
              <p>
                <img src={Logo} alt="" />
                <span>360°</span>
              </p>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={styles.formWrapper}>
              <div className={styles.childrenInRight}>
                <LanguageSelecter />
                <span>{languagePackage?.HaveAccountYet}</span>
                <Link to="/signin">
                  <Button variant="outlined">{languagePackage?.Login}</Button>
                </Link>
              </div>

              <div className={styles.titleLine}>
                <h1>{languagePackage?.WelcomeToPanoramicWorld}</h1>
                <p>{languagePackage?.Register}</p>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>{languagePackage?.Username}</strong>
                </p>
                <TextField
                  variant="outlined"
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  label={languagePackage?.PleaseEnterUsername}
                  fullWidth
                  value={userName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                  size="small"
                ></TextField>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>{languagePackage?.Password}</strong>
                </p>
                <TextField
                  variant="outlined"
                  label={languagePackage?.PleaseEnterPassword}
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  fullWidth
                  value={password}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  type="password"
                  size="small"
                ></TextField>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>{languagePackage?.Country}</strong>
                </p>
                {renderCountrySelecter()}
              </div>

              <div className={styles.inputLine}>
                <strong>{languagePackage?.Gender}</strong>
                <RadioGroup
                  aria-label="gender"
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(Number(e.target.value))}
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
              </div>

              <Box marginTop="2vh">
                <Button onClick={() => handleClickCreate()} variant="contained" className={styles.submitButton}>
                  {languagePackage?.CreateRightNow}
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
