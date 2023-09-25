import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("2ND EFFECT RUN");

    return () => {
      console.log("2ND CLEANUP");
    };
    // The 2ND CLEANUP would run once the component is removed, aka after the user logs in. Since it has no dependencies given
    // useEffect cleanups RUN before the first time useEffect activates BASED ON IT'S DEPENDENCIES that is why, for this useEffect, the 2ND CLEANUP runs after the main login page unmounts
    // since it has no dependencies, it's just looking for a general component unmount
  }, []);

  // Remember, useEffect() with no dependencies included, meaning not addinga ", []" at all, and runs after every component render cycle,
  // including the first time component mounts (when you first enter the site)
  // but when you do include ", []" with nothing inside as the second argument, it will only run once, when the component mounts.

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("1ST EFFECT RUN");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log("1ST CLEANUP");
      clearTimeout(identifier);
    };

    // useEffect needs a clear out function, which you inside of the useEffect codeblock, you can set a return statement with an anonymous function that includes a clearTimeout() function
    // reason being for this is, whenever the "const identifier" is being used, it's actively looking at every keystroke
    // we wouldn't want it to do that in the case that we're sending Http requests, it would account for unneeded extra requests sent to the server.
    // in that case we, include that setFormIsValid checker inside of useEffect, INSIDE of a setTimeout function of 500 ms + the return statement with the clearTimeout pointing to that setTimeout below it
    // Now, which that code, whenever a user starts typing, it will account for all of the typing as 1 "Action", wait 500ms before it starts accounting for the next time the user starts typing
    // This actively reduces the amount of "actions" it's recording.
    // Again, very important usecase for when coding for a Http request type codeblock.
  }, [enteredEmail, enteredPassword]);

  // You never want to get rid of the ",[]" portion since you don't want to ever get rid of the codeblock having to read to dependencies.
  // You also don't want to ever put nothing in there since it would only run once, which is not good.
  // Dependencies do NOT need state updating functions, like setFormIsValid. React guarantees those will never change
  // do NOT need "built-in" APIS or functions like fetch() or localStorage as they're not related to React component render cycles
  // do NOT need variables/functions that might've been defined outside of your components
  // Dependencies only need "things" that can change because of your components re-rendered i.e. Variables/State defined in component functions/props/functions defined in Component functinos

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
    // You typically do NOT want to check an updated state based on another state, the setState function it is checking, in this case, enteredEmail, might not update in time therefore it
    // can possibly return an inaccurate reading
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
    // You typically do NOT want to check an updated state based on another state, the setState function it is checking, in this case, enteredEmail, might not update in time therefore it
    // can possibly return an inaccurate reading
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
