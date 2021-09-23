import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "15%",
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
    marginBottom: "2%",
    color: "#22303d",
    fontWeight: "700",
    "@media (min-width:700px)": {
      fontSize: "2rem",
    },
  },
  h2: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.6em",
    fontWeight: "700",
    color: "#46637f",
    "@media (max-width:700px)": {
      fontSize: "1.3em",
      marginBottom: "4%",
      textAlign: "center",
    },
  },
  p1: {
    marginTop: "1%",
    textAlign: "left",
    fontFamily: "'Rubik', sans-serif;",
    fontSize: "1.2em",
    color: "#22303d",
    letterSpacing: "0.02em",
    lineHeight: "1.4em",
    "@media (max-width:700px)": {
      fontSize: "1.3rem",
      textAlign: "center",
    },
    "@media (max-width:1400px)": {
      fontSize: "1.1rem",
    },
  },
  box: {
    "@media (min-width:1500px)": {
      paddingTop: "8em",
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
