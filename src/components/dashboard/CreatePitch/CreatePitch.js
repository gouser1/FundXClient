import React, { useState, useEffect } from "react";
import { Grid, Container, Hidden, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Textfield from "../../FormsUI/Textfield/index";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "../../FormsUI/Select/index";
import Button from "../../FormsUI/Button/index";
import countries from "../../../data/countries.json";
import locations from "../../../data/locations.json";
import industries from "../../../data/industries.json";
import investmentRoles from "../../../data/investmentRoles.json";
import capitalAmounts from "../../../data/capitalAmounts.json";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./CreatePitchStyle";

function CreatePitch(props) {
  let history = useHistory();
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    pitchTitle: "",
    contactEmail: "",
    website: "",
    location: "",
    country: "",
    industry: "",
    industry2: "",
    idealInvestmentRole: "",
    capitalNeeded: "",
    capitalRaised: "",
    pitchInfo: "",
  };

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, [history]);

  const FORM_VALIDATION = Yup.object().shape({
    pitchTitle: Yup.string()
      .required("Please enter a pitch title")
      .max(25)
      .min(10),
    website: Yup.string().max(100),
    contactEmail: Yup.string().email().required("Required").max(50),
    location: Yup.string().required("Please select your location"),
    country: Yup.string().required("Please select your country"),
    industry: Yup.string().required("Please select an industry"),
    industry2: Yup.string(),
    idealInvestmentRole: Yup.string().required(
      "Please select an investment role"
    ),
    capitalNeeded: Yup.string().required("Please select capital needed"),
    capitalRaised: Yup.string().required("Please select capital raised"),
    pitchInfo: Yup.string()
      .required("Please enter your pitch info")
      .max(5000)
      .min(100),
  });

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
                  axios
                    .post(
                      "https://fundx-jamesgilliland.herokuapp.com/pitches",
                      data,
                      {
                        headers: {
                          accessToken: localStorage.getItem("accessToken"),
                        },
                      }
                    )
                    .then((response) => {
                      history.push("/dashboard/mypitches");
                    });
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
                        Create Pitch
                      </Typography>
                      <Typography className={classes.h2}>
                        {" "}
                        Pitch Title
                      </Typography>
                      <Tooltip
                        title="What are you going to call your pitch? "
                        placement="top-end"
                      >
                        <Textfield name="pitchTitle"></Textfield>
                      </Tooltip>

                      <Typography className={classes.h2}>
                        {" "}
                        Website (Optional)
                      </Typography>
                      <Tooltip
                        title="Please include the full web address. "
                        placement="top-end"
                      >
                        <Textfield name="website"></Textfield>
                      </Tooltip>

                      <Typography className={classes.h2}>
                        {" "}
                        Contact Email
                      </Typography>
                      <Tooltip
                        title="This email is how investors will contact you"
                        placement="top-end"
                      >
                        <Textfield name="contactEmail"></Textfield>
                      </Tooltip>

                      <Typography className={classes.h2}> Location</Typography>
                      <Select name="location" options={locations}></Select>

                      <Typography className={classes.h2}> Country</Typography>
                      <Select name="country" options={countries}></Select>

                      <Typography className={classes.h2}> Industry</Typography>
                      <Tooltip
                        title="Which industry best suits your business? "
                        placement="top-end"
                      >
                        <Select name="industry" options={industries}></Select>
                      </Tooltip>

                      <Typography className={classes.h2}>
                        {" "}
                        Industry 2 (optional)
                      </Typography>
                      <Tooltip
                        title="A 2nd option will define your pitch for more investors "
                        placement="top-end"
                      >
                        <Select name="industry2" options={industries}></Select>
                      </Tooltip>

                      <Typography className={classes.h2}>
                        {" "}
                        Ideal Investment Role
                      </Typography>
                      <Tooltip
                        title="How active woul you like your investor to be?"
                        placement="top-end"
                      >
                        <Select
                          name="idealInvestmentRole"
                          options={investmentRoles}
                        ></Select>
                      </Tooltip>
                      <Typography className={classes.h2}>
                        {" "}
                        Capital needed
                      </Typography>
                      <Select
                        label="£"
                        name="capitalNeeded"
                        options={capitalAmounts}
                      ></Select>

                      <Typography className={classes.h2}>
                        {" "}
                        Capital raised
                      </Typography>
                      <Select
                        name="capitalRaised"
                        label="£"
                        options={capitalAmounts}
                      ></Select>

                      <Typography className={classes.h2}>
                        {" "}
                        Pitch Info
                      </Typography>
                      <Tooltip
                        title="This section is where you sell your pitch so don't be shy! "
                        placement="top-end"
                      >
                        <Textfield
                          multiline
                          rows={6}
                          name="pitchInfo"
                          style={{ paddingBottom: "2%" }}
                        ></Textfield>
                      </Tooltip>
                      <Button>
                        {" "}
                        <Typography
                          className={classes.p2}
                          style={{ color: "white" }}
                        >
                          Post Pitch
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
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
}

export default CreatePitch;
