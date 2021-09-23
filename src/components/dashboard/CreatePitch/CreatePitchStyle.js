import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "#46637f",
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
      fontSize: "2rem",
    },
  },
  h2: {
    fontFamily: "'Rubik', sans-serif;",
    fontSize: "0.9em",
    color: "black",
    fontWeight: "700",
    marginTop: "2%",
  },
}));
