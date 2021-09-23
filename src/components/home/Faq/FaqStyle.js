import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    paddingBottom: "15%",
  },

  button: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "white",
    backgroundColor: "#3bc693",
    "&:hover": {
      backgroundColor: "#34b384",
    },
    textTransform: "none",
  },
  h1: {
    textAlign: "center",
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.5em",
    color: "#22303d",
    fontWeight: "700",
    "@media (min-width:700px)": {
      fontSize: "3em",
    },
  },
  h2: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "#46637f",
    fontWeight: "500",
    "@media (min-width:700px)": {
      fontSize: "1.2rem",
    },
  },

  p1: {
    textAlign: "left",
    fontFamily: "'Rubik', sans-serif;",
    fontSize: "1em",
    color: "#22303d",
    letterSpacing: "0.02em",
    lineHeight: "1.4em",
    "@media (max-width:700px)": {
      fontSize: "1rem",
      textAlign: "center",
    },
    "@media (max-width:1400px)": {
      fontSize: "1rem",
    },
  },
}));
