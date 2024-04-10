import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../ButtonPanel/Button";

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onClose(); // Close the sign-in component
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
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
              className="input"
              id="login-email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-lg font-medium text-gray-900"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              className="input"
              id="login-password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex justify-end">
            <Button
              label="Log In"
              type="submit"
              className="btn rounded-xl p-2 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
