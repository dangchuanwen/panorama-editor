import React, { useContext } from 'react';

import styles from './style.module.css';
import { Link, useHistory } from 'react-router-dom';

import { Container, Grid, Button, TextField } from '@material-ui/core';

import Logo from 'assets/logo.png';
import { showHttpError } from 'requests/requests';
import { message } from 'antd';
import { useAuth } from 'auth/auth';

const SignIn: React.FC = () => {
  const { authContext } = useAuth();
  const { login } = useContext(authContext);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const handleClickLogin = async () => {
    try {
      await login(userName, password);
      message.success('登录成功！');
      history.replace('/');
    } catch (err) {
      showHttpError(err);
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
                <span>还没有没有账户？</span>
                <Link to="/signup">
                  <Button variant="outlined">注册</Button>
                </Link>
              </div>
              <div className={styles.titleLine}>
                <h1>欢迎回来</h1>
                <p>登录你的账号</p>
              </div>
              <div className={styles.inputLine}>
                <p>
                  <strong>用户名</strong>
                </p>
                <TextField
                  variant="outlined"
                  value={userName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                  label="你的账号"
                  fullWidth
                  size="small"
                ></TextField>
              </div>
              <div className={styles.inputLine}>
                <p>
                  <strong>密码</strong>
                </p>
                <TextField
                  variant="outlined"
                  value={password}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  label="你的密码"
                  fullWidth
                  type="password"
                  size="small"
                ></TextField>
                <p className={styles.forgetPasswordLink}>
                  <span>忘记密码？</span>
                </p>
              </div>
              <div>
                <Button variant="contained" className={styles.submitButton} onClick={handleClickLogin}>
                  登录
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
