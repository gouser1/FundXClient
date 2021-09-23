import React, { useState, useEffect } from "react";
import { Grid, Container, Box, Typography, Snackbar } from "@material-ui/core";
import { Formik, Form } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Textfield from "../../FormsUI/Textfield/index";
import Button from "../../FormsUI/Button/index";
import MuiAlert from "@material-ui/lab/Alert";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./ChangePasswordStyle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ChangePassword(props) {
  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });
  let history = useHistory();
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const changePassword = (data) => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data === "SUCCESS") {
          handleSuccessSnackBar();
        } else {
          handleErrorSnackBar();
        }
      });
  };

  const INITIAL_FORM_STATE = {
    oldPassword: "",
    newPassword: "",
  };

  const handleSuccessSnackBar = () => {
    setOpenSuccessSnackBar(true);
  };

  const handleSuccessSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackBar(false);
  };

  const handleErrorSnackBar = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackBar(false);
  };

  return (
    <div className={classes.root}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Grid
          container
          spacing={24}
          justify="center"
          style={{ minHeight: "100vh", maxWidth: "100%" }}
        >
          <Grid item xs={12} style={{ paddingTop: "2%" }}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  onSubmit={(data) => {
                    changePassword(data);
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
                          Change Password
                        </Typography>

                        <Typography className={classes.h2}>
                          Current Password
                        </Typography>

                        <Textfield
                          name="oldPassword"
                          type="password"
                        ></Textfield>

                        <Typography
                          className={classes.h2}
                          style={{ marginTop: "1%" }}
                        >
                          New Password
                        </Typography>

                        <Textfield
                          name="newPassword"
                          type="password"
                        ></Textfield>

                        <Box mt={2}>
                          <Button className={classes.button}>
                            <Typography
                              className={classes.p2}
                              style={{ color: "white" }}
                            >
                              Save Changes
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
                <Snackbar
                  open={openSuccessSnackBar}
                  autoHideDuration={6000}
                  onClose={handleSuccessSnackBarClose}
                >
                  <Alert
                    onClose={handleSuccessSnackBarClose}
                    severity="success"
                  >
                    Password Updated!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openErrorSnackBar}
                  autoHideDuration={6000}
                  onClose={handleErrorSnackBarClose}
                >
                  <Alert onClose={handleErrorSnackBarClose} severity="error">
                    Passwords do not match!
                  </Alert>
                </Snackbar>
              </div>
            </Container>
          </Grid>
        </Grid>
      </AuthContext.Provider>
    </div>
  );
}

export default ChangePassword;
