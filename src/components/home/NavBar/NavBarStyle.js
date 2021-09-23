import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {},
  logo: {
    flexGrow: 1,
    color: "primary",
  },
  navOptions: {
    display: "flex",
    flex: 1,
  },
  appBar: {
    position: "static",
    background: "white",
    boxShadow: "none",
  },
  typography: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "#46637f",
  },
  navLink: {
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.2em",
    color: "#46637f",
    textTransform: "none",
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
}));
