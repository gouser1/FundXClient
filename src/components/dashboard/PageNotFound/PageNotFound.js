import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Typography, Hidden } from "@material-ui/core";
import pageNotFoundImage from "../../../images/dashboard/404.png";
import useStyles from "./PageNotFoundStyle";

const PageNotFound = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <h1 className={classes.h1}>Page Not Found</h1>
        </Grid>
        <Grid item xs={12}>
          <Hidden xsDown>
            <img src={pageNotFoundImage} alt="" width="500px" height="500px" />
          </Hidden>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} onClick={() => history.push("/")}>
            <Typography className={classes.p1} style={{ color: "white" }}>
              Home
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1%" }}>
          <Button
            className={classes.button}
            onClick={() => history.push("/dashboard/pitches")}
          >
            <Typography className={classes.p1} style={{ color: "white" }}>
              Dashboard
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PageNotFound;
