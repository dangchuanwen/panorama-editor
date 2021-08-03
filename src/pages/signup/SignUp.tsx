import React from 'react';

import styles from '../signin/style.module.css';

import { Container, Grid, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Container maxWidth={false} className={styles.container}>
        <Grid container>
          <Grid item xs={5}>
            <div className={styles.posterWrapper}>
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
              <div>
                <p>
                  <strong>用户名</strong>
                </p>
                <TextField
                  style={{ marginTop: '15px' }}
                  variant="outlined"
                  label="输入一个用户名"
                  fullWidth
                  size="small"
                ></TextField>
              </div>
              <div>
                <p>
                  <strong>密码</strong>
                </p>
                <TextField
                  style={{ marginTop: '15px' }}
                  variant="outlined"
                  label="输入你的密码"
                  fullWidth
                  type="password"
                  size="small"
                ></TextField>
                <p className={styles.forgetPasswordLink}>
                  <span>&nbsp;</span>
                </p>
              </div>
              <div>
                <Button variant="contained" className={styles.submitButton}>
                  立即创建
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
