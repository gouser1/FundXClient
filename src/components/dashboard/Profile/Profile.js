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
  Container,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import Favorite from "@material-ui/icons/Favorite";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.png";
import userIcon from "../../../images/dashboard/usericon.png";
import useStyles from "./ProfileStyle";

function Profile(props) {
  let { id } = useParams();
  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [listOfPitches, setListOfPitches] = useState([]);
  const [favouritedPitches, setFavouritedPitches] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fundx-jamesgilliland.herokuapp.com/auth/userinfo/`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setDisplayName(response.data.displayName);
      });

    axios
      .get(`https://fundx-jamesgilliland.herokuapp.com/pitches/byuserId/${id}`)
      .then((response) => {
        setListOfPitches(response.data);
      });
  }, [id]);

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
    <div className={classes.root}>
      <Button
        size="small"
        onClick={goBack}
        className={classes.button}
        style={{ margin: "2%" }}
      >
        <ArrowBack color="white" />
        Back
      </Button>
      <Grid
        container
        justify="center"
        style={{ minHeight: "100vh", maxWidth: "100%" }}
      >
        <Grid item xs={12} style={{ paddingTop: "2%" }}>
          <Container maxWidth="lg">
            <Typography className={classes.h1} style={{ paddingBottom: "5%" }}>
              {displayName}'s Pitches
            </Typography>
            <Grid container spacing={3}>
              {listOfPitches.map((value, key) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                      <Card className={classes.card}>
                        <CardContent>
                          <CardHeader
                            avatar={
                              <Avatar>
                                <img
                                  src={userIcon}
                                  alt=""
                                  width="50px"
                                  height="35px"
                                />
                              </Avatar>
                            }
                            titleTypographyProps={{ variant: "h6" }}
                            title={value.pitchTitle}
                            subheader={
                              <Badge className={classes.badge}>
                                {value.location}, {value.country}
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
                            {value.pitchInfo.length > 100
                              ? `${value.pitchInfo.substring(0, 100)}...`
                              : value.pitchInfo}
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
                              Amount raised: £{value.capitalRaised}
                            </Typography>

                            <Typography
                              className={classes.p1}
                              style={{ marginTop: "3%" }}
                            >
                              Amount needed: £{value.capitalNeeded}
                            </Typography>
                          </div>
                          <Typography
                            className={classes.p1}
                            style={{ marginTop: "3%" }}
                          >
                            Industry: {value.industry}
                          </Typography>
                        </CardContent>

                        <CardActions
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            size="small"
                            className={classes.button}
                            style={{ marginTop: "3%" }}
                            onClick={() => {
                              history.push(`/dashboard/pitch/${value.id}`);
                            }}
                          >
                            <Typography style={{ color: "white" }}>
                              More Info
                            </Typography>
                          </Button>
                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => {
                              favouritePitch(value.id);
                            }}
                          >
                            <Favorite
                              style={{
                                color: favouritedPitches.includes(value.id)
                                  ? "#f44336"
                                  : "#f44336",
                              }}
                              className={
                                favouritedPitches.includes(value.id)
                                  ? "unfavouriteButton"
                                  : "FavouriteButton"
                              }
                            />
                            <Typography>{value.Favourites.length}</Typography>
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
  );
}

export default Profile;
