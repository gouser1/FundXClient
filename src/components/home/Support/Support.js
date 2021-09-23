import React from "react";
import {
  Grid,
  Box,
  Hidden,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Select,
  TextField,
} from "@material-ui/core";
import emailjs from "emailjs-com";
import MuiAlert from "@material-ui/lab/Alert";
import ContactImage from "../../../images/home/contact.svg";
import useStyles from "./SupportStyle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Support(props) {
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const classes = useStyles();

  const sendEmail = (e) => {
    e.preventDefualt();
    emailjs.sendForm(
      "service_97nbygu",
      "service_97nbygu",
      e.target,
      "user_8kEbzGq4FkNruvj1rGfFW"
    );
    e.target.reset();
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "0vh" }}
      >
        <Grid item xs={12}>
          <Box className={classes.box} textAlign="center">
            <Typography className={classes.h1}>Ask us a Question</Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Box className={classes.box}>
            <Typography className={classes.h2}>
              Need help with using FundX?
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.p1}>
              Our Support team is always on call to help you with any questions
              or problems you may have. From technical support to bug issues, we
              are here. We also even offer a guided demo of the application if
              requested.
            </Typography>
          </Box>
          <Box pt={2} xs={12}>
            <Button
              onClick={() => handleButtonClick("/")}
              className={classes.button}
            >
              Contact us
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <form onSubmit={sendEmail}>
                <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
                <DialogTitle id="form-dialog-title">
                  What can we help you with?
                </DialogTitle>
                <DialogContent>
                  <Select
                    native
                    fullWidth
                    margin="dense"
                    id="category"
                    label="How can we help?"
                    autoFocus
                    name="helpOption"
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>I need Technical Support</option>
                    <option value={10}>I need help with my Account</option>
                    <option value={20}>I'd like a Guided Demo</option>
                    <option value={30}>I'd like to Report a Bug</option>
                    <option value={30}>I'd like to Report a Legal Issue</option>
                    <option value={30}>I need help with Something Else</option>
                  </Select>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="name"
                    fullWidth
                    name="name"
                  />
                  <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                  />
                  <TextField
                    id="message"
                    label="Message"
                    fullWidth
                    name="message"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    value="Send Email"
                    onClick={handleClose}
                    color="#3bc693"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => {
                      handleSnackBar();
                      handleClose();
                    }}
                    color="#3bc693"
                  >
                    Send
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Hidden mdDown>
            <Box pt={15} pl={10} justifyContent="center" display="flex">
              <img src={ContactImage} alt="" width="600px" height="300px" />
            </Box>
          </Hidden>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          Message Sent!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Support;
