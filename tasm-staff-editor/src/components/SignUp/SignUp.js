import React, { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../ButtonPanel/Button";
import logo from '../../assets/images/tasm-logo-p-500.png';
import { CheckIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();  // Close the modal if click is outside
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

    if (!emailError && !passwordError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User created successfully
          console.log(userCredential);
          onClose(); // Close the sign-up modal or redirect the user
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;

          // Display different error messages based on errorCode
          if (errorCode === 'auth/email-already-in-use') {
            setEmailError('This email is already in use.');
          } else if (errorCode === 'auth/invalid-email') {
            setEmailError('The email address is invalid.');
          } else if (errorCode === 'auth/weak-password') {
            setPasswordError('The password is too weak.');
          } else {
            setEmailError('Failed to sign up. Please try again later.');
          }

          // If the error is with the password, set focus back to the password field
          if (errorCode.startsWith('auth/weak-password') || errorCode.startsWith('auth/wrong-password')) {
            passwordRef.current && passwordRef.current.focus();
          } else {
            emailRef.current && emailRef.current.focus();
          }
        });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center h-screen bg-black bg-opacity-30 backdrop-blur-md">
      <div className="absolute top-0 mt-2">
        <img src={logo} alt='TASM Logo' className="object-scale-down h-48 m-2" />
      </div>
      <div ref={modalRef} className="w-full max-w-xs">
        <form
          noValidate
          className="bg-gray shadow-md rounded-lg px-8 py-6 mb-4 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-black text-center mb-4">Sign Up</h1>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={emailRef}
              className="input"
              id="email"
              type="email"
              placeholder="Email"
              aria-invalid={emailError ? "true" : "false"}
              aria-labelledby="email-label"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="text-red text-xs italic mt-2" aria-live="assertive">
                <p>{emailError}</p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                className="input"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={passwordError ? "true" : "false"}
                aria-labelledby="password-label"
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
              <div className="text-xs italic mt-2" aria-live="assertive">
                <p>Your password needs to:</p>
                <div>{generatePasswordErrorMessage(password)}</div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              label="Cancel"
              type="button"
              icon={XMarkIcon}
              iconProps={{ className: "w-6 h-6" }}
              iconPosition="left"
              className="btn rounded-xl py-2 pr-2.5 pl-1.5 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
              onClick={onClose}
            />
            <Button
              label="Sign Up"
              type="submit"
              icon={CheckIcon}
              iconProps={{ className: "w-6 h-6" }}
              iconPosition="left"
              className="btn rounded-xl py-2 pr-2.5 pl-1.5 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
