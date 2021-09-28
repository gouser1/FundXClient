import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Badge,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.png";
import userIcon from "../../../images/dashboard/usericon.png";
import useStyles from "./SinglePitchStyle";

const SingleListing = () => {
  let { id } = useParams();
  const [singlePitch, setSinglePitch] = useState({});
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://fundx-jamesgilliland.herokuapp.com/pitches/byId/${id}`)
      .then((response) => {
        setSinglePitch(response.data);
      });
  }, [id]);

  return (
    <div>
      <Button size="small" onClick={goBack} className={classes.button}>
        <ArrowBack color="white" />
        Back
      </Button>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {" "}
        <Grid item xs={12} sm={10} md={6} lg={10}>
          <Card className={classes.card}>
            <CardContent>
              <CardHeader
                avatar={
                  <Link to={`profile/${singlePitch.UserId}`}>
                    <Avatar>
                      <img src={userIcon} alt="" width="50px" height="35px" />
                    </Avatar>
                  </Link>
                }
                titleTypographyProps={{ variant: "h6" }}
                title={singlePitch.pitchTitle}
                subheader={
                  <Badge className={classes.badge}>
                    {singlePitch.location}, {singlePitch.country}
                    <Location />{" "}
                  </Badge>
                }
              />
              <CardMedia className={classes.media} image={cardImage} />

              <Typography className={classes.h2} style={{ marginTop: "3%" }}>
                Investment Information
              </Typography>

              <Typography className={classes.p1} style={{ marginTop: "2%" }}>
                Ideal Investor Role: {singlePitch.idealInvestmentRole}
              </Typography>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Typography
                  className={classes.p1}
                  style={{ marginTop: "2%", marginRight: "2%" }}
                >
                  Amount raised: £{singlePitch.capitalRaised}
                </Typography>

                <Typography className={classes.p1} style={{ marginTop: "2%" }}>
                  Amount needed: £{singlePitch.capitalNeeded}
                </Typography>
              </div>
              <Typography className={classes.h2} style={{ marginTop: "3%" }}>
                About {singlePitch.pitchTitle}
              </Typography>

              <Typography
                className={classes.p1}
                style={{
                  marginTop: "1%",
                  fontWeight: "600",
                }}
              >
                Industry
              </Typography>

              <Typography className={classes.p1} style={{ marginTop: "1%" }}>
                {singlePitch.industry}
                {""}
                {singlePitch.industry && singlePitch.industry2 ? "," : ""}{" "}
                {singlePitch.industry2}
              </Typography>

              <Typography
                className={classes.p1}
                style={{ marginTop: "2%", fontWeight: "600" }}
              >
                Pitch Info
              </Typography>
              <Typography className={classes.p1} style={{ marginTop: "1%" }}>
                {singlePitch.pitchInfo}
              </Typography>
              <Typography className={classes.h2} style={{ marginTop: "3%" }}>
                Contact Information
              </Typography>
              <Typography className={classes.p1} style={{ marginTop: "1%" }}>
                Email: {singlePitch.contactEmail}
              </Typography>

              <Typography className={classes.p1} style={{ marginTop: "1%" }}>
                <Link> {singlePitch.website} </Link>
              </Typography>
              <Typography className={classes.p1} style={{ marginTop: "1%" }}>
                Created by: {singlePitch.displayName}
              </Typography>
            </CardContent>

            <CardActions
              style={{ display: "flex", justifyContent: "space-between" }}
            ></CardActions>

            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "2%",
              }}
            >
              {" "}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleListing;
