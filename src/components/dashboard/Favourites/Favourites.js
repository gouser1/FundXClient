import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  Avatar,
  Paper,
  CardContent,
  CardHeader,
  Badge,
  IconButton,
  CardMedia,
  CardActions,
  Button as NormalButton,
} from "@material-ui/core";
import axios from "axios";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.png";
import Favorite from "@material-ui/icons/Favorite";
import userIcon from "../../../images/dashboard/usericon.png";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./FavouritesStyle";

const Favourites = () => {
  let history = useHistory();
  const classes = useStyles();
  const [favouritedPitches, setFavouritedPitches] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(
        "https://fundx-jamesgilliland.herokuapp.com/favourite/userfavourites",
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setFavouritedPitches(response.data);
        setIsSet(true);
      });
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, [history]);

  const favouritePitch = (pitchId) => {
    axios
      .post(
        "https://fundx-jamesgilliland.herokuapp.com/favourite",
        { PitchId: pitchId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (!response.data.favourited) {
          const newListOfFavouritedPitches = favouritedPitches.filter(function (
            el
          ) {
            return el.PitchId !== pitchId;
          });
          setFavouritedPitches([...newListOfFavouritedPitches]);
        }
      });
  };
  if (isSet) {
    if (favouritedPitches.length === 0) {
      return (
        <div className={classes.root}>
          {" "}
          <Grid
            container
            justify="center"
            style={{ minHeight: "100vh", maxWidth: "100%" }}
          >
            <Grid item xs={12} style={{ paddingTop: "2%" }}>
              <Container maxWidth="lg">
                <Typography
                  className={classes.h1}
                  style={{ paddingBottom: "5%" }}
                >
                  You have no favourited pitches
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <div className={classes.root}>
            <Grid
              container
              justify="center"
              style={{ minHeight: "100vh", maxWidth: "100%" }}
            >
              <Grid item xs={12} style={{ paddingTop: "2%" }}>
                <Container maxWidth="lg">
                  <Typography
                    className={classes.h1}
                    style={{ paddingBottom: "5%" }}
                  >
                    Your Favourites
                  </Typography>
                  <Grid container spacing={3}>
                    {favouritedPitches.map((value, key) => {
                      return (
                        <Grid item xs={12} md={4} lg={4}>
                          <Paper className={classes.paper}>
                            <Card className={classes.card}>
                              <CardContent>
                                <CardHeader
                                  avatar={
                                    <Link to={`profile/${value.Pitch.UserId}`}>
                                      <Avatar>
                                        <img
                                          src={userIcon}
                                          alt=""
                                          width="50px"
                                          height="35px"
                                        />
                                      </Avatar>
                                    </Link>
                                  }
                                  titleTypographyProps={{ variant: "h6" }}
                                  title={value.Pitch.pitchTitle}
                                  subheader={
                                    <Badge className={classes.badge}>
                                      {value.Pitch.location},{" "}
                                      {value.Pitch.country}
                                      <Location />{" "}
                                    </Badge>
                                  }
                                />
                                <CardMedia
                                  className={classes.media}
                                  image={cardImage}
                                />
                                <Typography
                                  className={classes.p1}
                                  style={{ marginTop: "3%" }}
                                >
                                  {value.Pitch.pitchInfo.length > 100
                                    ? `${value.Pitch.pitchInfo.substring(
                                        0,
                                        100
                                      )}...`
                                    : value.Pitch.pitchInfo}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "0.5em",
                                  }}
                                >
                                  <Typography
                                    className={classes.p1}
                                    style={{ marginTop: "3%" }}
                                  >
                                    Amount raised: £{value.Pitch.capitalRaised}
                                  </Typography>

                                  <Typography
                                    className={classes.p1}
                                    style={{ marginTop: "3%" }}
                                  >
                                    Amount needed: £{value.Pitch.capitalNeeded}
                                  </Typography>
                                </div>
                                <Typography
                                  className={classes.p1}
                                  style={{ marginTop: "3%", fontSize: "0.9em" }}
                                >
                                  Industry: {value.Pitch.industry}
                                  {""}
                                  {value.Pitch.industry && value.Pitch.industry2
                                    ? ","
                                    : ""}{" "}
                                  {value.Pitch.industry2}
                                </Typography>
                              </CardContent>

                              <CardActions
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <NormalButton
                                  size="small"
                                  className={classes.button}
                                  style={{ marginTop: "3%" }}
                                  onClick={() => {
                                    history.push(
                                      `/dashboard/pitch/${value.Pitch.id}`
                                    );
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    More Info
                                  </Typography>
                                </NormalButton>

                                <IconButton
                                  aria-label="add to favorites"
                                  onClick={() => {
                                    favouritePitch(value.Pitch.id);
                                  }}
                                >
                                  <Favorite
                                    style={{
                                      color: favouritedPitches.includes(
                                        value.Pitch.id
                                      )
                                        ? "#f44336"
                                        : "#f44336",
                                    }}
                                    className={
                                      favouritedPitches.includes(value.Pitch.id)
                                        ? "unfavouriteButton"
                                        : "FavouriteButton"
                                    }
                                  />
                                  <Typography
                                    className={classes.h1}
                                    style={{}}
                                  ></Typography>
                                </IconButton>
                              </CardActions>
                            </Card>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </div>
        </AuthContext.Provider>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Favourites;
