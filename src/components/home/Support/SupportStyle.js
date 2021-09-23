import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#3BC693",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "10%",
  },
  typography: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "#46637f",
  },
  h1: {
    textAlign: "center",
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.5em",
    color: "white",
    fontWeight: "700",
    "@media (min-width:700px)": {
      fontSize: "3em",
    },
  },
  h2: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.6em",
    fontWeight: "700",
    color: "white",
    "@media (max-width:700px)": {
      fontSize: "1.4em",
      marginBottom: "5%",
      textAlign: "center",
    },
  },
  p1: {
    textAlign: "left",
    marginTop: "3%",
    fontFamily: "'Rubik', sans-serif;",
    fontSize: "1.2em",
    color: "white",
    letterSpacing: "0.02em",
    lineHeight: "1em",
    "@media (max-width:700px)": {
      fontSize: "1.3rem",
      textAlign: "center",
    },
    "@media (max-width:1400px)": {
      fontSize: "1.1rem",
    },
  },
  button: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.4em",
    color: "white",
    backgroundColor: "#2EA076",
    "&:hover": {
      backgroundColor: "#0e5239",
    },
    textTransform: "none",
  },

  box: {
    "@media (min-width:1500px)": {
      paddingTop: "4em",
    },
    "@media (max-width:1400px)": {
      paddingTop: "4em",
    },
    "@media (max-width:1000px)": {
      paddingTop: "5em",
    },
    "@media (max-width:800px)": {
      paddingTop: "4em",
    },
  },
}));
