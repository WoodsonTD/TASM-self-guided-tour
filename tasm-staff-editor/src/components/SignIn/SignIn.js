import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../ButtonPanel/Button";
import logo from '../../assets/images/tasm-logo-p-500.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Refs for input fields to manage focus
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        onClose(); // Close the sign-in component
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setPasswordError("Invalid password. Please try again.");
          passwordRef.current && passwordRef.current.focus();
        } else if (error.code === "auth/user-not-found") {
          setEmailError("No user found with this email.");
          emailRef.current && emailRef.current.focus();
        } else {
          setEmailError("Failed to sign in. Please check your credentials and try again.");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
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
            <div className="relative">
              <input
                ref={passwordRef}
                className="input"
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={passwordError ? "true" : "false"}
                aria-labelledby="login-password-label"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-darkGray" /> : <EyeIcon className="h-5 w-5 text-darkGray" />}
              </button>
            </div>
            {passwordError && (
              <div aria-live="assertive" className="text-xs italic mt-2">
                <div>{passwordError}</div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <Button
              label="Log In"
              type="submit"
              className="btn rounded-xl py-2 px-3 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
