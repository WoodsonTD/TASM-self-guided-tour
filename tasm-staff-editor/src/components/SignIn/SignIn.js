import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../ButtonPanel/Button";
import logo from '../../assets/images/tasm-logo-p-500.png';

const SignIn = ({ onClose, onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Refs for input fields to manage focus
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return {
          length: password.length >= 8,
          numberOrSymbol: /[0-9\W]/.test(password),
          upperAndLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
        };
  };

  const generatePasswordErrorMessage = (password) => {
    const validationResult = validatePassword(password);
    const messages = {
      length: "be at least 8 characters long.",
      numberOrSymbol: "include at least one number or symbol.",
      upperAndLowerCase: "include both lower and upper case characters.",
    };

    return Object.keys(validationResult).map((key) => {
      const isValid = validationResult[key];
      return (
        <p key={key} className={isValid ? "validation-check" : "validation-cross"}>
          {isValid ? "✓" : "✕"} {messages[key]}
        </p>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      emailRef.current && emailRef.current.focus();
      return; // Stop the submission
    }

    // Check if all password validation conditions are true
    const passwordConditions = validatePassword(password);
    const allPasswordConditionsMet = Object.values(passwordConditions).every(Boolean);

    if (!password || !allPasswordConditionsMet) {
      setPasswordError("Password must have 8 characters, a number or special character, and uppercase letter");
      passwordRef.current && passwordRef.current.focus();
      return; // Stop the submission
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onClose(); // Close the sign-in component
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setEmailError("No user found with this email.");
          emailRef.current && emailRef.current.focus();
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Wrong password. Please try again.");
          passwordRef.current && passwordRef.current.focus();
        }
      });
  };

  return (
    <div className=" relative flex justify-center items-center h-screen">
      <div className="absolute top-0 mt-2">
        <img src={logo} alt='TASM Logo' className="object-scale-down h-48 m-2" />
      </div>
      <div className="w-full max-w-xs">
        <form
          noValidate
          className="bg-gray shadow-md rounded-lg px-8 py-6 mb-4 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-black text-center mb-4">Log In</h1>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text gray-900"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              ref={emailRef}
              className="input"
              id="login-email"
              type="email"
              placeholder="Email"
              aria-invalid={emailError ? "true" : "false"}
              aria-labelledby="login-email-label"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div aria-live="assertive" className="text-red text-xs italic mt-2">
                <p>Oops! There was a problem:</p>
                <p>{emailError}</p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-lg font-medium text-gray-900"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              className="input"
              id="login-password"
              type="password"
              placeholder="Password"
              aria-invalid={passwordError ? "true" : "false"}
              aria-labelledby="login-password-label"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div aria-live="assertive" className="text-xs italic mt-2">
                <p>Oops! There was a problem with your password:</p>
                <div>{generatePasswordErrorMessage(password)}</div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button
              label="Log In"
              type="submit"
              className="btn rounded-xl py-2 px-3 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            />
            <Button
              label="Sign Up"
              type="button"
              className="btn rounded-xl p-2 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
              onClick={onSignUpClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
