import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1',
  },
  typography: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: '1.2em',
    color: '#46637f',
  },
  button: {
    marginRight: '2%',
    fontFamily: "'Karla', sans-serif;",
    fontSize: '1.2em',
    color: 'white',
    backgroundColor: '#3bc693',
    '&:hover': {
      backgroundColor: '#34b384',
    },
    textTransform: 'none',
    '@media (max-width:420px)': {
      fontSize: '0.8em',
    },
    '@media (max-height:620px)': {
      fontSize: '0.6em',
    },
  },
  button2: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: '1.2em',
    '&:hover': {
      backgroundColor: '#ecf0f1',
    },
    textTransform: 'none',
    '@media (max-width:420px)': {
      fontSize: '0.8em',
      '@media (max-height:620px)': {
        fontSize: '0.6em',
      },
    },
  },
  h1: {
    textAlign: 'center',
    fontFamily: "'Karla', sans-serif;",
    fontSize: '2.2em',
    color: '#22303d',
    fontWeight: '700',
    '@media (min-width:700px)': {
      fontSize: '3rem',
    },
  },
  h2: {
    textAlign: 'center',
    fontFamily: "'Rubik', sans-serif;",
    fontSize: '1em',
    color: '#22303d',
    '@media (min-width:700px)': {
      fontSize: '1.3rem',
    },
  },
  paper: {
    padding: 20,
    height: '50vh',
    '@media (max-width:800px)': {
      height: '60vh',
    },
    width: 280,
    margin: '20px auto',
  },
  paper2: {
    padding: 20,
    height: '70vh',
    '@media (max-width:800px)': {
      height: '80vh',
    },
    width: 280,
    margin: '20px auto',
  },
  paper3: {
    padding: 20,
    height: '45vh',
    width: '40%',
    '@media (max-width:800px)': {
      height: '60vh',
      width: '80%',
    },
    '@media (max-width:1100px)': {
      height: '70vh',
      width: '80%',
    },
    margin: '20px auto',
  },
  paper4: {
    padding: 20,
    height: '45vh',
    width: '40%',
    '@media (max-width:800px)': {
      height: '60vh',
      width: '80%',
    },
    '@media (max-width:1100px)': {
      width: '80%',
      height: '50vh',
    },
    '@media (max-height:620px)': {
      width: '80%',
      height: '60vh',
    },
    margin: '20px auto',
  },
  avatarStyle: { backgroundColor: '#3bc693' },

  textfield: {
    fontFamily: "'Karla', sans-serif;",
    color: '#22303d',
  },
}));
