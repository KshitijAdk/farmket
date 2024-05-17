import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import farmkit from "../Images/cover-image.jpg";
import { backendUrl } from "../../url";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_num: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = {};
    switch (name) {
      case "username":
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
          error[name] =
            "Username must start with an alphabet and contain only alphanumeric characters.";
        } else {
          error[name] = "";
        }
        break;
      case "email":
        if (!/^[\w.%+-]+@gmail\.com$/.test(value)) {
          error[name] = "Email must be a valid Gmail address.";
        } else {
          error[name] = "";
        }
        break;
      case "phone_num":
        if (!/^(98|97)\d{8}$/.test(value)) {
          error[name] =
            "Phone number must start with 98 or 97 and be 10 digits long.";
        } else {
          error[name] = "";
        }
        break;
      case "password":
        if (!/^(?=.*[0-9]).{8,}$/.test(value)) {
          error[name] =
            "Password must be at least 8 characters long and contain at least one number.";
        } else {
          error[name] = "";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error[name] = "Passwords do not match.";
        } else {
          error[name] = "";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...error,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (
      !formData.username ||
      !/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.username)
    ) {
      errors.username =
        "Username must start with an alphabet and contain only alphanumeric characters.";
      isValid = false;
    }

    if (!formData.email || !/^[\w.%+-]+@gmail\.com$/.test(formData.email)) {
      errors.email = "Email must be a valid Gmail address.";
      isValid = false;
    }

    if (!formData.phone_num || !/^(98|97)\d{8}$/.test(formData.phone_num)) {
      errors.phone_num =
        "Phone number must start with 98 or 97 and be 10 digits long.";
      isValid = false;
    }

    if (
      !formData.password ||
      !/^(?=.*[0-9]).{8,}$/.test(formData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one number.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${backendUrl}/signup`, formData);
        if (response.status === 200 && response.data === "User data saved successfully") {
          showPopupMessage("Account created successfully");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          showPopupMessage("Error signing up: " + response.data);
        }
      } catch (error) {
        showPopupMessage("Error signing up: " + error.message);
      }
    }
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage("");
    }, 1000);
  };

  return (
    <div className="Container flex">
      <div className="main w-1/2 h-screen">
        <img src={farmkit} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container w-1/2">
        {popupMessage && (
          <div className="popup-message fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
            {popupMessage}
          </div>
        )}
        <div className="heading flex flex-col items-center mt-4">
          <h1 className="italic">
            <span className="text-black font-kaushan text-6xl">FARMKIT</span>
            <span className="text-[#D9D9D9] font-kaushan text-6xl italic">
              ORG
            </span>
          </h1>
          <h3 className="text-black italic font-kaushan text-2xl">
            From Farmers to Farmers
          </h3>
        </div>

        <div className="input-details mt-10">
          <div className="flex justify-center flex-col items-center gap-5 text-2xl">
            <div className="userName">
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                variant="standard"
                error={!!errors.username}
                helperText={errors.username}
              />
            </div>
            <div className="Email">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div className="Phone-Num">
              <TextField
                id="phone_num"
                name="phone_num"
                label="Phone Number"
                type="tel"
                value={formData.phone_num}
                onChange={handleChange}
                variant="standard"
                error={!!errors.phone_num}
                helperText={errors.phone_num}
                inputProps={{ maxLength: 10 }}
              />
            </div>
            <div className="Password">
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="standard"
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>
            <div className="Password">
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="standard"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </div>
          </div>
        </div>
        <div className="btns flex flex-col items-center ">
          <div className="mt-12">
            <button
              className="py-2.5 px-6 border border-green-900 text-green-900 rounded-md hover:bg-green-700 hover:text-white"
              onClick={handleSignUp}
            >
              Create account
            </button>
          </div>

          <div className="mt-[10px]">
            <p>
              Already have an account?{" "}
              <span className="text-blue-700 cursor-pointer underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>

          <div className="font-extrabold text-xl mt-3">
            <p>Or</p>
          </div>
          <div className="sign-google mt-5">
            <button className="flex items-center gap-4 bg-[#b2aaaa] py-2.5 px-6 rounded-md">
              <FcGoogle />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
