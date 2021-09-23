import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  InputAdornment,
  Box,
  Avatar,
  IconButton,
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import LogoNav from '../../images/home/LogoNav.png';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import useStyles from './authStyle';
import { AuthContext } from '../../helpers/AuthContext';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthState } = useContext(AuthContext);

  const { history } = props;
  const btnstyle = {
    margin: '8px 0',
    color: 'white',
    backgroundColor: '#3bc693',
  };

  const handleLinkClick = (pageURL) => {
    history.push(pageURL);
  };

  const classes = useStyles();

  const LogoButton = withStyles(() => ({}))(IconButton);

  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required('Required').email(),
    password: Yup.string().required('Required'),
  });

  const loginSubmit = () => {
    const data = { email: email, password: password };
    axios
      .post('https://fundx-jamesgilliland.herokuapp.com/auth/login', data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('accessToken', response.data);
          setAuthState(true);
          history.push('/dashboard/pitches');
        }
      });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <LogoButton
          onClick={() => handleLinkClick('/')}
          style={{ backgroundColor: 'transparent' }}
        >
          <img src={LogoNav} alt='' width='130px' height='35px' />
        </LogoButton>
        <Paper elevation={10} className={classes.paper}>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
          >
            <Form>
              <Grid align='center'>
                <Avatar class={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2 className={classes.h2}>Sign In</h2>
              </Grid>
              <Box pb={3}>
                <TextField
                  name='email'
                  fullWidth
                  label={
                    <Typography className={classes.textfield}>Email</Typography>
                  }
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Email style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <TextField
                name='password'
                type='password'
                fullWidth
                label={
                  <Typography className={classes.textfield}>
                    Password
                  </Typography>
                }
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LockIcon style={{ fill: '#c8c8c8' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={loginSubmit}
                type='submit'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </Form>
          </Formik>

          <Typography className={classes.textfield}>
            <Link
              href='#'
              onClick={() => handleLinkClick('/register')}
              style={{ textDecoration: 'none' }}
            >
              I am a new user and I want to Sign Up
            </Link>
          </Typography>
          <Box pt={2}>
            <Typography className={classes.textfield}>
              <Link
                href='#'
                onClick={() => handleLinkClick('/dashboard/pitches')}
                style={{ textDecoration: 'none' }}
              >
                Continue as a guest.
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default withRouter(Login);
