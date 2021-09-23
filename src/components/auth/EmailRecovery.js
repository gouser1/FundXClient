import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  Paper,
  withStyles,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import LogoNav from '../../images/home/LogoNav.png';
import Email from '@material-ui/icons/Email';
import useStyles from './authStyle';

const EmailConfirm = (props) => {
  const { history } = props;

  const handleLinkClick = (pageURL) => {
    history.push(pageURL);
  };

  const classes = useStyles();

  const LogoButton = withStyles(() => ({}))(IconButton);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <LogoButton
          onClick={() => handleLinkClick('/')}
          style={{ backgroundColor: 'transparent' }}
        >
          <img src={LogoNav} alt='' width='130px' height='35px' />
        </LogoButton>
        <Paper elevation={10} className={classes.paper4}>
          <h1 className={classes.h1}>Recover Password</h1>
          <Box pb={1}>
            <h2 className={classes.h2}>
              Please enter your email address to request a password reset.
            </h2>{' '}
          </Box>
          <Box pt={5} pb={3}>
            {' '}
            <TextField
              id='email'
              label={
                <Typography className={classes.textfield}>Email</Typography>
              }
              variant='outlined'
              color='primary'
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Email style={{ fill: '#c8c8c8' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid item xs={12}>
            <Box textAlign='center'>
              <Button
                fullWidth
                onClick={() => handleLinkClick('/')}
                className={classes.button}
              >
                Reset Password
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default withRouter(EmailConfirm);
