import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Hidden,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Textfield from "../../FormsUI/Textfield/index";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "../../FormsUI/Select/index";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "../../FormsUI/Button/index";
import countries from "../../../data/countries.json";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./ProfileStyle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditProfile(props) {
  let history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState(false);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }

    axios
      .get("http://localhost:3001/auth/userinfo/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })

      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setDisplayName(response.data.displayName);
        setLocation(response.data.location);
        setProfession(response.data.profession);
        setAge(response.data.age);
        setBio(response.data.bio);
        setStatus(true);
      });
  }, [history]);

  const editProfile = (data) => {
    console.log("accessToken: ", localStorage.getItem("accessToken"));
    axios({
      method: "PUT", //you can set what request you want to be
      url: "http://localhost:3001/auth/updateprofile",
      data: data,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      handleSnackBar();
    });
  };

  const handleSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const INITIAL_FORM_STATE = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    location: location,
    age: age,
    profession: profession,
    bio: bio,
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email(),
    firstName: Yup.string().required("Please enter your first name").max(25),
    lastName: Yup.string().required("Please enter your last name").max(25),
    displayName: Yup.string().min(2).max(15),
    location: Yup.string().nullable(),
    proffession: Yup.string().max(25),
    age: Yup.number().max(150).nullable(),
    bio: Yup.string().max(1000).min(8).nullable(),
  });

  if (status) {
    return (
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Grid container>
          <Grid item xs={10} lg={6} style={{ paddingTop: "2%" }}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(data) => {
                    editProfile(data);
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.h1}
                          style={{ marginBottom: "10%" }}
                        >
                          {" "}
                          Edit Profile
                        </Typography>

                        <Typography className={classes.h2}>
                          Email (Required)
                        </Typography>

                        <Textfield name="email"></Textfield>

                        <Typography className={classes.h2}>
                          First Name (Required)
                        </Typography>

                        <Textfield name="firstName"></Textfield>

                        <Typography className={classes.h2}>
                          Last Name (Required)
                        </Typography>

                        <Textfield name="lastName"></Textfield>

                        <Typography className={classes.h2}>
                          Display Name (Required)
                        </Typography>

                        <Textfield name="displayName"></Textfield>

                        <Typography className={classes.h2}>Location</Typography>
                        <Select name="location" options={countries}></Select>

                        <Typography className={classes.h2}>
                          Profession
                        </Typography>

                        <Textfield name="profession"></Textfield>

                        <Typography className={classes.h2}>Age</Typography>

                        <Textfield name="age"></Textfield>

                        <Typography className={classes.h2}> Bio</Typography>
                        <Tooltip
                          title="This section is where you tell us about yourself! "
                          placement="top-end"
                        >
                          <Textfield
                            multiline
                            rows={6}
                            name="bio"
                            style={{ paddingBottom: "2%" }}
                          ></Textfield>
                        </Tooltip>

                        <Button>
                          {" "}
                          <Typography
                            className={classes.p2}
                            style={{ color: "white" }}
                          >
                            Save Changes
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
                <Snackbar
                  open={openSnackBar}
                  autoHideDuration={6000}
                  onClose={handleSnackBarClose}
                >
                  <Alert onClose={handleSnackBarClose} severity="success">
                    Profile Updated!
                  </Alert>
                </Snackbar>
              </div>
            </Container>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={10} lg={6}>
              <Container
                maxWidth="md"
                style={{ backgroundColor: "#edf0ef", height: "100%" }}
              >
                <Container style={{ paddingTop: "6%" }}>
                  <Typography
                    className={classes.p1}
                    style={{
                      backgroundColor: "#d4e3dd",
                      padding: "4px",
                      fontWeight: "500",
                    }}
                  >
                    Do you have any questions? Click <Link to="/">here</Link> to
                    view some helpful FAQ answers.
                  </Typography>
                </Container>
              </Container>
            </Grid>
          </Hidden>
        </Grid>
      </AuthContext.Provider>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default EditProfile;
