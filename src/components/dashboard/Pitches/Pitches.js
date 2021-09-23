import React from "react";
import {
  IconButton,
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
  Hidden,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.jpg";
import userIcon from "../../../images/dashboard/usericon.png";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import useStyles from "./PitchesStyle";

const Pitches = () => {
  const [listOfPitches, setListOfPitches] = useState([]);
  const [favouritedPitches, setFavouritedPitches] = useState([]);
  const [selected, setSelected] = useState(0);
  let history = useHistory();
  const classes = useStyles();

  const handleNextPitch = () => {
    setSelected((prev) => {
      if (prev === listOfPitches.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handlePreviousPitch = () => {
    setSelected((prev) => {
      if (prev === 0) {
        return listOfPitches.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://fundx-jamesgilliland.herokuapp.com/pitches", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfPitches(response.data.pitchList);
        setSelected(Math.floor(Math.random() * response.data.pitchList.length));
      });
  }, []);

  const favouritePitch = (pitchId) => {
    axios
      .post(
        "https://fundx-jamesgilliland.herokuapp.com/favourite",
        { PitchId: pitchId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // setting state of list to modified list
        setListOfPitches(
          listOfPitches.map((pitch) => {
            if (pitch.id === pitchId) {
              if (response.data.favourited) {
                // Destructure pitch and modify favourites field and adding 0 so the length is modified to favourite the post
                return { ...pitch, Favourites: [...pitch.Favourites, 0] };
              } else {
                // Remove last element from array to update state of favourited post to remove favourite
                const FavouritesArray = pitch.Favourites;
                FavouritesArray.pop();
                return { ...pitch, Favourites: FavouritesArray };
              }
            } else {
              return pitch;
            }
          })
        );
        if (favouritedPitches.includes(pitchId)) {
          setFavouritedPitches(
            favouritedPitches.filter((id) => {
              return id !== pitchId;
            })
          );
        } else {
          setFavouritedPitches([...favouritedPitches, pitchId]);
        }
      });
  };

  return (
    <div>
      {listOfPitches.length > 0 ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          {" "}
          <Grid item xs={11} sm={10} md={6} lg={4}>
            <Card className={classes.card}>
              <CardContent>
                <CardHeader
                  avatar={
                    <Link to={`profile/${listOfPitches[selected].UserId}`}>
                      <Avatar>
                        <img src={userIcon} alt="" width="50px" height="35px" />
                      </Avatar>
                    </Link>
                  }
                  titleTypographyProps={{ variant: "h6" }}
                  title={listOfPitches[selected].pitchTitle}
                  subheader={
                    <Badge className={classes.badge}>
                      {listOfPitches[selected].location},{" "}
                      {listOfPitches[selected].country}
                      <Location />{" "}
                    </Badge>
                  }
                />
                <CardMedia className={classes.media} image={cardImage} />
                <Hidden lgUp>
                  <Typography
                    className={classes.p1}
                    style={{ marginTop: "3%" }}
                  >
                    {listOfPitches[selected].pitchInfo.length > 100
                      ? `${listOfPitches[selected].pitchInfo.substring(
                          0,
                          100
                        )}...`
                      : listOfPitches[selected].pitchInfo}
                  </Typography>
                </Hidden>
                <Hidden mdDown>
                  <Typography
                    className={classes.p1}
                    style={{ marginTop: "3%" }}
                  >
                    {listOfPitches[selected].pitchInfo.length > 300
                      ? `${listOfPitches[selected].pitchInfo.substring(
                          0,
                          300
                        )}...`
                      : listOfPitches[selected].pitchInfo}
                  </Typography>
                </Hidden>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1em",
                  }}
                >
                  <Typography
                    className={classes.p1}
                    style={{ marginTop: "3%" }}
                  >
                    Amount raised: £{listOfPitches[selected].capitalRaised}
                  </Typography>

                  <Typography
                    className={classes.p1}
                    style={{ marginTop: "3%" }}
                  >
                    Amount needed: £{listOfPitches[selected].capitalNeeded}
                  </Typography>
                </div>
                <Typography className={classes.p1} style={{ marginTop: "3%" }}>
                  Industry: {listOfPitches[selected].industry}
                </Typography>
              </CardContent>

              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="small"
                  className={classes.button}
                  style={{ marginTop: "3%", marginLeft: "2%" }}
                  onClick={() => {
                    history.push(
                      `/dashboard/pitch/${listOfPitches[selected].id}`
                    );
                  }}
                >
                  <Typography style={{ color: "white" }}>More Info</Typography>
                </Button>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    favouritePitch(listOfPitches[selected].id);
                  }}
                >
                  <Favorite
                    style={{
                      color: favouritedPitches.includes(
                        listOfPitches[selected].id
                      )
                        ? "#f44336"
                        : "#f44336",
                    }}
                    className={
                      favouritedPitches.includes(listOfPitches[selected].id)
                        ? "unfavouriteButton"
                        : "FavouriteButton"
                    }
                  />
                  <Typography>
                    {listOfPitches[selected].Favourites.length}
                  </Typography>
                </IconButton>
              </CardActions>

              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "2%",
                }}
              >
                <Button
                  onClick={() => {
                    handlePreviousPitch();
                  }}
                >
                  <ArrowBack color="primary" />
                  <Typography className={classes.p1}>Previous Pitch</Typography>
                </Button>
                <Button
                  onClick={() => {
                    handleNextPitch();
                  }}
                >
                  <Typography
                    className={classes.p1}
                    style={{ paddingRight: "5px" }}
                  >
                    Next Pitch
                  </Typography>
                  <ArrowForward color="primary" />
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pitches;
