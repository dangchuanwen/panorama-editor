import React, { useContext } from 'react';

import styles from './style.module.css';
import { Link, useHistory } from 'react-router-dom';

import { Container, Grid, Button, TextField } from '@material-ui/core';

import Logo from 'assets/vr-logo.png';
import { message } from 'antd';
import { useAuth } from 'auth/auth';
import LanguageSelecter from 'components/LanguageSelecter';
import { LanguageContext } from 'language';

const SignIn: React.FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const { authContext } = useAuth();
  const { login } = useContext(authContext);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const handleClickLogin = async () => {
    try {
      await login(userName, password);
      message.success(languagePackage?.LoginSuccessfully);
      history.replace('/');
    } catch (err) {
      message.warn(languagePackage?.UsernameOrPasswordError);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Container maxWidth={false} className={styles.container}>
        <Grid container>
          <Grid xs={5}>
            <div className={styles.posterWrapper}>
              <img
                src="https://images.pexels.com/photos/4145356/pexels-photo-4145356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt=""
              />
              <p>
                <img src={Logo} alt="" />
                <span className={styles.appTitle}>VR TOUR</span>
              </p>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={styles.formWrapper}>
              <div className={styles.childrenInRight}>
                <LanguageSelecter />
                <span>{languagePackage?.HaveAccountYet}</span>
                <Link to="/signup">
                  <Button variant="outlined">{languagePackage?.Register}</Button>
                </Link>
              </div>
              <div className={styles.titleLine}>
                <h1>{languagePackage?.WelcomeBack}</h1>
                <p>{languagePackage?.LoginYourAccount}</p>
              </div>
              <div className={styles.inputLine}>
                <p>
                  <strong>{languagePackage?.Username}</strong>
                </p>
                <TextField
                  variant="outlined"
                  value={userName}
                  InputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                  label={languagePackage?.YourUsername}
                  fullWidth
                  size="small"
                ></TextField>
              </div>
              <div className={styles.inputLine}>
                <p>
                  <strong>{languagePackage?.Password}</strong>
                </p>
                <TextField
                  variant="outlined"
                  value={password}
                  InputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  label={languagePackage?.YourPassword}
                  fullWidth
                  type="password"
                  size="small"
                ></TextField>
                <p className={styles.forgetPasswordLink}>
                  <span
                    onClick={() => {
                      message.warn(languagePackage?.PleaseContactAdmin);
                    }}
                  >
                    {languagePackage?.ForgetPassword}
                  </span>
                </p>
              </div>
              <div>
                <Button variant="contained" className={styles.submitButton} onClick={handleClickLogin}>
                  {languagePackage?.Login}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
