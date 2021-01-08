import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import style from '../../styles/theme';

const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop: '20px',
  },
  optionContainer: {
    marginTop: '20px',
  },
  outer: {
    ["@media (max-width:512px)"]: { // eslint-disable-line no-useless-computed-key
      position: 'absolute',
      top: 200,
      left:0,
      paddingBottom: '100px',
    },
  },
  paper: {
    padding: "40px 60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // background: "rgba(41, 17, 37, 1)",
    background: 'white',
    borderRadius: "15px",
    ["@media (max-width:512px)"]: { // eslint-disable-line no-useless-computed-key
      background: "rgba(255, 255, 255, 0.8)",
      margin: '10px',
      padding: '30px',
      boxShadow: "none",
    },
  },
  title: {
    fontFamily: "Aclonica",
    fontSize: "23px",
    textAlign: 'center',
    color: style.colors.black,
    marginBottom: '10px',
    // ["@media (max-width:512px)"]: { // eslint-disable-line no-useless-computed-key
    //   fontSize: "24px",
    // },
  },
  underlined: {
    '&:hover': {
      borderBottom: `1px dotted #000`,
    }
  },
  prompt: {
    fontFamily: "IBM Plex Sans",
    fontSize: '17px',
    '& a': {
      borderBottom: '1px dotted #000',
      fontWeight: 'bold',
    }
  },
  option: {
    // background: style.colors.red,
    // fontFamily: "Aclonica",
    fontFamily: "IBM Plex Sans",
    background: (props) => props.icon ? style.colors.lightBlue : style.colors.white,
    // border: (props) => props.border ? '1px solid black' : '',
    color: style.colors.black,
    cursor: 'pointer',
    margin: '5px 0px',
    borderRadius: "10px",
    fontSize: '17px',
    width: '100%',
    textAlign: (props) => props.icon ? 'center' : 'left',
  },
  icon: {
    textAlign: 'left',
    width: '100%',
    marginLeft: '-28px', // don't come for me css gods
    marginBottom: '5px',
    cursor: 'pointer',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  button: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  helperRed: {
    color: style.colors.red, // TODO: check if contrast is okay
  },
}));

const Option = ({ text, icon, onClick }) => {
    const classes = useStyles({ icon: icon === undefined});

    return (
      <Grid item xs={12} className={classes.option} onClick={onClick}>
        <span
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {icon}
      </Grid>
    );
}


const AdventurePrompt = ({
  adventureList,
  step,
  changeStep,
  goBack,
  user,
  fieldErrors,
  handleInputChange,
  handleSubmit,
  handleStartOver,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.outer}>
        <div className={classes.paper}>
          {step === "0" && (
            <Typography component="h1" variant="h5" className={classes.title}>
              Choose Your Own Adventure
            </Typography>
          )}
          {step !== "0" && (
            <div onClick={() => goBack()} className={classes.icon}>
              <ArrowBackIcon fontSize="small" />
            </div>
          )}
          <Grid container spacing={3} className={classes.grid}>
            {!adventureList[step].status && (
              <span
                className={classes.prompt}
                dangerouslySetInnerHTML={{ __html: adventureList[step].prompt }}
              />
            )}
          </Grid>
          <Grid container spacing={3} className={classes.optionContainer}>
            {adventureList[step].options &&
              adventureList[step].options.map((option) => (
                <Option
                  text={option.text}
                  onClick={() => changeStep(option.goTo)}
                  key={option.text}
                />
              ))}
          </Grid>
          {adventureList[step].status === "success" && (
            <form className={classes.form} noValidate name="raffleEntry" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} className={classes.prompt}>
                  {adventureList[step].prompt}
                </Grid>
                <Grid item xs={12} className={classes.prompt}>
                  Please enter the utoronto email associated with your ticket to
                  have your raffle choices doubled! <br />
                  <br />
                  No ticket? No problem. First, enter your utoronto email so we
                  know you've completed this. Then, get your ticket at{" "}
                  <a href="/ticket">cannonball.skule.ca/ticket</a>!
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    required
                    name="emailuoft"
                    label="uToronto Email"
                    value={user.emailuoft}
                    onChange={handleInputChange}
                  />
                  {fieldErrors.emailuoft && (
                    <FormHelperText className={classes.helperRed}>
                      {fieldErrors.emailuoft}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Grid className={classes.button}>
                <Button text="Submit 🎉" onClick={handleSubmit} fullWidth />
              </Grid>
            </form>
          )}
          {adventureList[step].status === "failure" && (
            <form className={classes.form} noValidate name="startOver" onSubmit={handleStartOver}>
              <Grid container spacing={3}>
                <Grid item xs={12} className={classes.prompt}>
                  <span
                    className={classes.prompt}
                    dangerouslySetInnerHTML={{ __html: adventureList[step].prompt }}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.button}>
                <Button text="Start Over" onClick={handleStartOver} fullWidth />
              </Grid>
            </form>
          )}
          { step === "0" && (
            <Grid className={classes.button}>
              <Button text="Enter" onClick={() => changeStep("1")} fullWidth />
            </Grid>
          )}
        </div>
        <div className="footer">
          <span className="black">
            Questions? Well, we've got answers at{" "}
            <a
              className={classes.underlined}
              href="mailto:cannonball@skule.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              cannonball@skule.ca
            </a>
            .
          </span>
        </div>
      </div>
    </Container>
  );
};

export default AdventurePrompt;