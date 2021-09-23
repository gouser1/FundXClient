import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
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
    fontSize: "1.1em",
    color: "white",
    backgroundColor: "#3bc693",
    "&:hover": {
      backgroundColor: "#34b384",
    },
    textTransform: "none",
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
    fontFamily: "'Karla', sans-serif;",
    fontSize: "1.6em",
    fontWeight: "700",
    color: "#46637f",
    "@media (max-width:700px)": {
      fontSize: "1.6rem",
      textAlign: "center",
    },
  },
  favourite: {
    color: "green",
  },
  badge: {
    marginRight: "5em",
  },
  card: {
    marginBottom: theme.spacing(5),

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));
