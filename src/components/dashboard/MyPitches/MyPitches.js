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
  CardMedia,
  CardActions,
  Button as NormalButton,
} from "@material-ui/core";
import axios from "axios";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.jpg";
import userIcon from "../../../images/dashboard/usericon.png";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./MyPitchesStyle";

function Alert(props) {}

const MyPitches = () => {
  let history = useHistory();
  const classes = useStyles();
  const [usersPitches, setUsersPitches] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [openDeleteSnackBar, setOpenDeleteSnackBar] = React.useState(false);

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/pitches/userspitches", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUsersPitches(response.data);
        setIsSet(true);
        console.log(response.data);
      });
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const deletePitch = (id) => {
    axios
      .delete(`http://localhost:3001/pitches/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          history.go(0);
        }
      });
  };

  const handleDeleteSnackBar = () => {
    setOpenDeleteSnackBar(true);
  };

  const handleDeleteSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackBar(false);
  };

  if (isSet) {
    if (usersPitches.length === 0) {
      return (
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
                  You have no pitches
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
                    Your Pitches
                  </Typography>
                  <Grid container spacing={3}>
                    {usersPitches.map((value, key) => {
                      return (
                        <Grid item xs={12} md={4} lg={4}>
                          <Paper className={classes.paper}>
                            <Card className={classes.card}>
                              <CardContent>
                                <CardHeader
                                  avatar={
                                    <Link to={`profile/${value.UserId}`}>
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
                                  style={{ marginTop: "3%", fontSize: "0.9em" }}
                                >
                                  Industry: {value.industry}
                                  {""}
                                  {value.industry && value.industry2
                                    ? ","
                                    : ""}{" "}
                                  {value.industry2}
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
                                      `/dashboard/pitch/${value.id}`
                                    );
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    More Info
                                  </Typography>
                                </NormalButton>
                                <NormalButton
                                  size="small"
                                  className={classes.button}
                                  style={{
                                    marginTop: "3%",
                                    backgroundColor: "#f44336",
                                  }}
                                  onClick={() => {
                                    deletePitch(value.id);
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    Delete
                                  </Typography>
                                </NormalButton>
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

export default MyPitches;
