import React, { useContext } from 'react';

import styles from '../signin/style.module.css';

import { Container, Grid, Button, TextField, Radio, FormControlLabel, RadioGroup, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Logo from 'assets/logo.png';
import { useAuth } from 'auth/auth';
import { message } from 'antd';
import { showHttpError } from 'requests/requests';
import { Country, Gender, countries } from 'interface';

import { Select } from 'antd';

const { Option } = Select;

const SignUp: React.FC = () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState<Gender>(Gender.Female);
  const [country, setCountry] = React.useState<Country>(Country.China);

  const { authContext } = useAuth();
  const { register } = useContext(authContext);

  const renderCountrySelecter = () => {
    const CountryOptions = countries.map((item) => {
      return (
        <Option value={item.value} key={item.value}>
          <img src={item.nationalFlag} style={{ width: '1.4vw', marginRight: '0.3vw' }} />
          <strong>{item.text}</strong>
        </Option>
      );
    });
    return (
      <Select style={{ width: '50%' }} value={country} onChange={(val: Country) => setCountry(val)}>
        {CountryOptions}
      </Select>
    );
  };

  const handleClickCreate = async () => {
    if (!userName) {
      message.warn('请输入用户名');
      return;
    }
    if (!password) {
      message.warn('请输入密码');
      return;
    }
    try {
      await register(userName, password, gender, country);
      message.success('注册成功！');
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
                <span>已有账户？</span>
                <Link to="/signin">
                  <Button variant="outlined">登录</Button>
                </Link>
              </div>

              <div className={styles.titleLine}>
                <h1>欢迎来到全景世界</h1>
                <p>注册你的账号</p>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>用户名</strong>
                </p>
                <TextField
                  variant="outlined"
                  label="输入一个用户名"
                  fullWidth
                  value={userName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                  size="small"
                ></TextField>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>密码</strong>
                </p>
                <TextField
                  variant="outlined"
                  label="输入你的密码"
                  fullWidth
                  value={password}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  type="password"
                  size="small"
                ></TextField>
              </div>

              <div className={styles.inputLine}>
                <p>
                  <strong>国家</strong>
                </p>
                {renderCountrySelecter()}
              </div>

              <div className={styles.inputLine}>
                <strong>性别</strong>
                <RadioGroup
                  aria-label="gender"
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(Number(e.target.value))}
                  style={{ flexDirection: 'row' }}
                >
                  <FormControlLabel value={Gender.Female} control={<Radio color="secondary" />} label="女" />
                  <FormControlLabel value={Gender.Male} control={<Radio color="primary" />} label="男" />
                </RadioGroup>
              </div>

              <Box marginTop="2vh">
                <Button onClick={() => handleClickCreate()} variant="contained" className={styles.submitButton}>
                  立即创建
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
