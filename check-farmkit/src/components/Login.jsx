import React, { useContext, useState } from "react";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import { FaRegCircleUser, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import farmkit from "../Images/cover-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/context";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [showSuccess, setShowSuccess] = useState(false); // State to manage success visibility
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      console.log(backendUrl)
      const response = await axios.post(`${backendUrl}/login`, formData);
      if (response.status === 200 && response.data.message === "Login successful") {
        console.log("Login successful");

        if (!(formData.username === "admin" && formData.password === "admin")) {
          localStorage.setItem("username", formData.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("password", formData.password);
          localStorage.setItem("token", response.data.token);
        }

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          if (formData.username === "admin" && formData.password === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        console.log("Invalid username or password");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid username or password");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  return (
    <div className="Main-container flex">
      <div className="main w-1/2 h-screen">
        <img src={farmkit} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container w-1/2">
        <div className="heading flex flex-col items-center mt-12">
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

        <div className="input-details mt-14">
          <div className="flex justify-center items-center gap-5 text-2xl">
            <div className="user-icon mt-4">
              <FaRegCircleUser />
            </div>
            <div className="userName">
              <TextField
                id="username"
                name="username"
                label="UserName"
                type="search"
                value={formData.username}
                onChange={handleChange}
                variant="standard"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 text-2xl mt-12">
            <div className="user-icon mt-4">
              <FaKey />
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
              />
            </div>
          </div>
        </div>
        <div className="btns flex flex-col items-center mt-16">
          <div className="signin">
            <button className="text-white bg-[#388e3c] border-none py-2.5 px-6 font-semibold rounded-md hover:bg-green-800" onClick={handleLogin}>
              Sign In
            </button>
          </div>

          <div className="sign-google mt-12">
            <button className="flex items-center gap-4 bg-[#b2aaaa] py-2.5 px-6 rounded-md">
              <FcGoogle />
              Continue with Google
            </button>
          </div>

          <div className="mt-12">
            <p className="pb-1">Don't have an account?</p>
            <Link to="/signup">
              <button className="py-2.5 px-6 border border-green-900 text-green-900 rounded-md hover:bg-green-700 hover:text-white">
                Create account{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Alert Popup */}
      {showAlert && (
        <div className="fixed top-30 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-gray-900 bg-opacity-75 p-5 rounded-md text-white">
            <p>Invalid username or password</p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-30 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-green-900 bg-opacity-75 p-5 rounded-md text-white">
            <p>Login successful</p>
          </div>
        </div>
      )}
    </div>
  );
}
