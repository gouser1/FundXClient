import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Box,
  Paper,
  InputAdornment,
  Avatar,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import Textfield from '../FormsUI/Textfield/index';
import Button from '../FormsUI/Button/index';
import Email from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonIcon from '@material-ui/icons/Person';
import LogoNav from '../../images/home/LogoNav.png';
import axios from 'axios';
import useStyles from './authStyle';

const Register = (props) => {
  const { history } = props;
  const btnstyle = {
    margin: '8px 0',
    color: 'white',
    backgroundColor: '#3bc693',
  };
  const handleLinkClick = (pageURL) => {
    history.push(pageURL);
  };

  const INITIAL_FORM_STATE = {
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email().required('Required').max(50),
    displayName: Yup.string().required('Required').min(2).max(15),
    firstName: Yup.string().required('Required').max(25),
    lastName: Yup.string().required('Required').max(25),
    password: Yup.string().required('Required').min(8),
  });

  const classes = useStyles();

  const LogoButton = withStyles(() => ({}))(IconButton);

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
          to='/'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => handleLinkClick('/')}
        >
          <img src={LogoNav} alt='' width='130px' height='35px' />
        </LogoButton>
        <Paper elevation={10} className={classes.paper2}>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              axios
                .post('https://fundx-jamesgilliland.herokuapp.com/auth', values)
                .then((response) => {
                  history.push('/login');
                });
            }}
          >
            <Form>
              <Grid align='center'>
                <Avatar class={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2 className={classes.h2}>Sign Up</h2>
              </Grid>
              <Box pb={3}>
                {' '}
                <Textfield
                  label={
                    <Typography className={classes.textfield}>Email</Typography>
                  }
                  name='email'
                  color='primary'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Email style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box pb={3}>
                <Textfield
                  name='displayName'
                  label={
                    <Typography className={classes.textfield}>
                      Display Name
                    </Typography>
                  }
                  color='primary'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box pb={3}>
                {' '}
                <Textfield
                  name='firstName'
                  label={
                    <Typography className={classes.textfield}>
                      First name
                    </Typography>
                  }
                  color='primary'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box pb={3}>
                <Textfield
                  name='lastName'
                  label={
                    <Typography className={classes.textfield}>
                      Last name
                    </Typography>
                  }
                  color='primary'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box pb={1}>
                <Textfield
                  name='password'
                  type='password'
                  autocomplete='off'
                  label={
                    <Typography className={classes.textfield}>
                      Password
                    </Typography>
                  }
                  color='primary'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LockIcon style={{ fill: '#c8c8c8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Button
                type='submit'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Create my account
              </Button>
            </Form>
          </Formik>

          <Typography className={classes.textfield}>
            Already have an account? <br></br>
            <Link
              href='#'
              onClick={() => handleLinkClick('/login')}
              style={{ textDecoration: 'none' }}
            >
              Click here.
            </Link>
          </Typography>
          <Box pt={2}>
            <Typography className={classes.textfield}>
              <Link
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

export default withRouter(Register);
