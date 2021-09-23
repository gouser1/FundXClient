import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Grid,
  Container,
  Snackbar,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useHistory } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import MuiAlert from "@material-ui/lab/Alert";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./AdminPanelStyle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdminPanel(props) {
  let history = useHistory();

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newProfession, setNewProfession] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newBio, setNewBio] = useState("");

  const [userList, setuserList] = useState([]);

  const [openedModal, setOpenedModal] = useState({ id: null });

  const [openAddSnackBar, setOpenAddSnackBar] = React.useState(false);
  const [openDeleteSnackBar, setOpenDeleteSnackBar] = React.useState(false);

  const addUser = () => {
    axios
      .post("https://fundx-jamesgilliland.herokuapp.com/auth", {
        email: email,
        displayName: displayName,
        firstName: firstName,
        lastName: lastName,
        password: password,
        location: location,
        profession: profession,
        age: age,
        bio: bio,
      })
      .then(() => {
        getUsers();
        handleAddSnackBar();
      });
  };

  const handleAddSnackBar = () => {
    setOpenAddSnackBar(true);
  };

  const handleAddSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddSnackBar(false);
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

  const getUsers = () => {
    axios
      .get("https://fundx-jamesgilliland.herokuapp.com/auth/users", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setuserList(response.data);
      });
  };

  const openModal = (id) => {
    setOpenedModal({ openedModal: id });
  };
  const closeModal = () => {
    setOpenedModal({ openedModal: null });
  };

  const updateUser = (id) => {
    axios({
      method: "put", //you can set what request you want to be
      url: "https://fundx-jamesgilliland.herokuapp.com/updateuser",
      data: {
        email: newEmail,
        id: id,
        displayName: newDisplayName,
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
        location: newLocation,
        profession: newProfession,
        age: newAge,
        bio: newBio,
      },
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.status === 200) {
        getUsers();
      }
    });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://fundx-jamesgilliland.herokuapp.com/auth/delete/${id}`)
      .then((response) => {
        if (response.status === 200) {
          getUsers();
          handleDeleteSnackBar();
        }
      });
  };

  const [open, setOpen] = React.useState(false);
  const [openNewUser, setopenNewUser] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newUserHandleClickOpen = () => {
    setopenNewUser(true);
  };

  const newUserHandleClose = () => {
    setopenNewUser(false);
  };

  useEffect(() => {
    axios
      .get("https://fundx-jamesgilliland.herokuapp.com/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })

      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            displayName: response.data.displayName,
            id: response.data.id,
            status: true,
          });
        }
      });
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  return (
    <div className={classes.root}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Grid
          container
          spacing={24}
          justifyContent="center"
          style={{ minHeight: "100vh", maxWidth: "100%" }}
        >
          <Grid item xs={12} align="center">
            <h1 style={{}} className={classes.h1}>
              User Control Panel
            </h1>

            <Box textAlign="center" p={2}>
              <Button
                className={classes.button}
                onClick={() => {
                  getUsers();
                }}
              >
                {" "}
                Get users
              </Button>
              <Button
                style={{ margin: "2%" }}
                className={classes.button}
                onClick={() => {
                  newUserHandleClickOpen();
                }}
              >
                {" "}
                Add User
              </Button>
            </Box>

            <Dialog open={openNewUser}>
              <DialogTitle />
              <DialogContent>
                <form>
                  {" "}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    autocomplete="off"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <TextField
                    name="firstName"
                    autocomplete="off"
                    margin="dense"
                    label="First Name"
                    fullWidth
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="lastName"
                    autocomplete="off"
                    margin="dense"
                    label="Last Name"
                    fullWidth
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="displayName"
                    autocomplete="off"
                    margin="dense"
                    label="Display Name"
                    fullWidth
                    onChange={(event) => {
                      setDisplayName(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="location"
                    autocomplete="off"
                    fullWidth
                    label="Location"
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="profession"
                    autocomplete="off"
                    margin="dense"
                    label="Profession"
                    fullWidth
                    onChange={(event) => {
                      setProfession(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="age"
                    autocomplete="off"
                    margin="dense"
                    label="Age"
                    fullWidth
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    name="password"
                    margin="dense"
                    autocomplete="off"
                    label="Password"
                    fullWidth
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    margin="dense"
                    label="Bio"
                    fullWidth
                    autocomplete="off"
                    multiline
                    rows={4}
                    name="bio"
                    style={{ paddingBottom: "2%" }}
                    onChange={(event) => {
                      setBio(event.target.value);
                    }}
                  ></TextField>
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    addUser();
                  }}
                  color="primary"
                >
                  submit
                </Button>
                <Button
                  onClick={() => {
                    newUserHandleClose();
                  }}
                  color="secondary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <Container fixed>
              <TableContainer component={Paper} fixed>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Display Name</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Profession</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Bio</TableCell>
                      <TableCell>Edit User</TableCell>
                      <TableCell>Delete User</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map((value, key) => (
                      <TableRow key={value.displayName}>
                        <TableCell>{value.email}</TableCell>

                        <TableCell>{value.displayName}</TableCell>

                        <TableCell>{value.firstName}</TableCell>
                        <TableCell>{value.lastName}</TableCell>
                        <TableCell>{value.profession}</TableCell>
                        <TableCell>{value.location}</TableCell>
                        <TableCell>{value.age}</TableCell>
                        <TableCell>{value.bio}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              openModal(value.id);
                              // handleClickOpen();
                            }}
                          >
                            Edit User
                          </Button>
                          <Dialog
                            open={openedModal.openedModal === value.id}
                            onClose={closeModal}
                            key={key}
                          >
                            <DialogTitle />
                            <DialogContent>
                              <form>
                                {" "}
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  autocomplete="off"
                                  id="name"
                                  label="Email Address"
                                  type="email"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewEmail(event.target.value);
                                  }}
                                />
                                <TextField
                                  name="firstName"
                                  autocomplete="off"
                                  margin="dense"
                                  label="First Name"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewFirstName(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="lastName"
                                  margin="dense"
                                  label="Last Name"
                                  autocomplete="off"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewLastName(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="displayName"
                                  margin="dense"
                                  autocomplete="off"
                                  label="Display Name"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewDisplayName(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="password"
                                  margin="dense"
                                  autocomplete="off"
                                  label="Password"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewPassword(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="Location"
                                  margin="dense"
                                  autocomplete="off"
                                  label="Location"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewLocation(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="profession"
                                  margin="dense"
                                  autocomplete="off"
                                  label="Profession"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewProfession(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  name="age"
                                  margin="dense"
                                  autocomplete="off"
                                  label="Age"
                                  fullWidth
                                  onChange={(event) => {
                                    setNewAge(event.target.value);
                                  }}
                                ></TextField>
                                <TextField
                                  margin="dense"
                                  label="Bio"
                                  fullWidth
                                  autocomplete="off"
                                  multiline
                                  rows={4}
                                  name="bio"
                                  style={{ paddingBottom: "2%" }}
                                  onChange={(event) => {
                                    setNewBio(event.target.value);
                                  }}
                                ></TextField>
                              </form>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  console.log("updateUser");
                                  updateUser(value.id);
                                  closeModal();
                                }}
                                color="primary"
                              >
                                submit
                              </Button>
                              <Button
                                onClick={() => {
                                  closeModal();
                                  handleClose();
                                }}
                                color="secondary"
                              >
                                Cancel
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              deleteUser(value.id);
                            }}
                          >
                            Delete User
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
      </AuthContext.Provider>
      <Snackbar
        open={openAddSnackBar}
        autoHideDuration={6000}
        onClose={handleAddSnackBarClose}
      >
        <Alert onClose={handleAddSnackBarClose} severity="success">
          User Added!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeleteSnackBar}
        autoHideDuration={6000}
        onClose={handleDeleteSnackBarClose}
      >
        <Alert onClose={handleDeleteSnackBarClose} severity="error">
          User Deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminPanel;
