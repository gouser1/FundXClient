import React from "react";
import { Grid, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import { Link, useHistory } from "react-router-dom";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./FaqStyle";

function Faq(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item lg={6} md={6} sm={10} xs={12}>
          <Box textAlign="center" pt={10} pb={5}>
            <Typography className={classes.h1}>
              Frequently Asked Questions
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={10} xs={12}>
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.h2}>
                  Do I have to sign up to use FundX?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  No, you can use our application as a guest user and still have
                  access to a range of our features. Guest users will be able to
                  see pitches and contact users.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>What is FundX</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  FundX is an Angel-led Investment platform that connects high
                  grow potentional companies with experienced investors.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>
                  What can I do with FundX?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  FundX allows you to create or find pitches from companies
                  looking to grow and expand their business.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>How do I start?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  Sign up for free{" "}
                  <Link
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    {" "}
                    here{" "}
                  </Link>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>
                  How reliable is FundX?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  We have an average uptime of 99,9%. Any system related issues
                  are reported and updated
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>
                  How does FundX ensure security?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  FundX enforces a password complexity standard and credentials
                  are encrypted when stored in the database.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.h2}>
                  How do I track pitches I am intersted in?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.p1}>
                  FundX has a favourite system for registered users so you can
                  easily keep track of them.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Faq;
