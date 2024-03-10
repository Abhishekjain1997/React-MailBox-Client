import React, { useRef } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const navigate=useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.haveAccount);

  const emailInput = useRef();
  const passwordInput = useRef();

  const loginSignupHandler = () => {
    dispatch(authActions.haveAccount());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;


    if (!isLoggedIn) {
      sendRequest({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSYmNhsvJo572bZ6cIzJCCt5xqb9js1yY",
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      });
      alert("Your Account Has Been Sucessfully Created You Can Now Login");
    
    } else {
      const saveLoginData = (data) => {
        dispatch(
          authActions.login({ token: data.idToken, email: enteredEmail })
        );
      }
        sendRequest(
          {
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSYmNhsvJo572bZ6cIzJCCt5xqb9js1yY",
            method: "POST",
            body: {
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            },
          },
          saveLoginData
        );
    }
    emailInput.current.value = ''
    passwordInput.current.value = ''
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
 
  };

  return (
    <div>
      <div className={classes.auth}>
        <h1>{isLoggedIn ? "Login" : "SignUp"}</h1>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInput} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordInput} required />
          </div>
          <div className={classes.actions}>
            <button type="submit">{isLoggedIn ? "Login" : "SignUp"}</button>
          </div>
          <div className={classes.actions}>
          {isLoggedIn && (
            <button onClick={handleForgotPassword}>Forgot Password?</button>
            )}
          </div>
        </form>
      </div>
      <div className={classes.actions}>
        <button onClick={loginSignupHandler}>
          {isLoggedIn
            ? "Dont have an account? SignUp"
            : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;