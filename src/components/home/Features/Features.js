import React from "react";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";
import GrowthImage from "../../../images/home/growth.svg";
import ConnectImage from "../../../images/home/connect.svg";
import MobileImage from "../../../images/home/mobileview.png";
import useStyles from "./FeaturesStyle";

function Features(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Box className={classes.box} textAlign="center">
            <Typography className={classes.h1}>How does it work?</Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box className={classes.box}>
            <Typography className={classes.h2}>
              Connecting companies to investors for maximum growth
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.p1}>
              FundX makes it simple to connect companies to potential investors,
              making it easy for you to find the investment you need for your
              company to grow. Sign up today to create or Pitch or continue as a
              guest user to explore the wide range of pitches within FundX!
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Hidden mdDown>
            <Box pt={20} justifyContent="center" display="flex">
              <img src={GrowthImage} alt="" width="472px" height="451px" />
            </Box>
          </Hidden>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Hidden mdDown>
            <Box pt={20} justifyContent="center" display="flex">
              <img src={MobileImage} alt="" width="472px" height="451px" />
            </Box>
          </Hidden>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box className={classes.box}>
            <Typography className={classes.h2}>
              Create and publish your pitch
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.p1}>
              Add a pitch for your business using our create a Pitch section.
              The on-screen tips will guide you through the creation process of
              your Pitch. We've also got some great resources to help if you get
              stuck you should check our FAQ and support sections. When your
              pitch has been created, it will be listed on the site for
              prospective investors to browse and evaluate. Investors can then
              contact you if they are interested.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Box className={classes.box}>
            <Typography className={classes.h2}>
              Explore pitches and store them for later
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.p1}>
              Our main pitches section of FundX allows you to randomly search
              through the pitches to find something unique you may not have been
              looking for. You can also view all the pitches and sort through
              them to find a pitch tailored for your interest. Favouriting the
              pitches will store them in your Favourites in case you want to
              come back to it later on.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Hidden mdDown>
            <Box pt={20} justifyContent="center" display="flex">
              <img src={ConnectImage} alt="" width="472px" height="451px" />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}

export default Features;
