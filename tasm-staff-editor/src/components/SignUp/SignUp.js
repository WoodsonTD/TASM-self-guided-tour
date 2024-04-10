import React, { useState } from "react";
import Button from "../ButtonPanel/Button";

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up form submission, e.g., send data to the server
    console.log(formData);
    // Clear form fields and hide the modal after successful sign-up
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    onClose();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-gray shadow-md rounded-lg px-8 py-6 mb-4 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-black text-center mb-4">Sign Up</h1>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-lg text-black font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              label="Sign Up"
              type="submit"
              className="btn rounded-xl p-2 text-lg drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
