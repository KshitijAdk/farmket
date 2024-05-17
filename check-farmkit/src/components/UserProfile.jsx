import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import user from "../Images/user.png"
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";


export default function UserProfile() {
  const navigate = useNavigate()


  const changePassword = async (e) => {
    e.preventDefault();
    // Access formData from the component's state
    const formData = {
      currentPassword: e.target.currentPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    // Check if the new password and confirm new password match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm new password do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/change-password", {
        username: username,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      if (response.status === 200) {
        console.log("Password updated successfully");
        // Clear form fields after successful password change
        e.target.reset(); // Reset the form
        alert("Password Updated !!!");
      } else {
        console.log("Error updating password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };




  const openCart = () => {
    navigate("/cart")
  }
  const openOrderHistory = () => {
    navigate("/history")
  }
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login")
  }

  const username = localStorage.getItem("username")
  const email = localStorage.getItem("email")

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:max-w-6xl md:space-x-8">
        <div className="flex flex-col items-center p-4 border-r md:border-r-2">
          <img
            src={user}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="text-lg font-semibold mb-2">{username}</div>
          <div className="text-sm mb-2">{email}</div>
          <nav className="mt-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCartArrowDown className="mr-2" />
                <button className="text-blue-600 hover:text-blue-800" onClick={openCart}>
                  Your Cart
                </button>
              </li>
              <li className="flex items-center">
                <FaHistory className="mr-2" />
                <button className="text-blue-600 hover:text-blue-800" onClick={openOrderHistory}>
                  Order History
                </button>
              </li>
              <li className="flex items-center">
                <IoLogOut className="mr-2" />
                <button className="text-blue-600 hover:text-blue-800" onClick={logOut}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1 p-4">
          <form onSubmit={changePassword}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
            <Link to="/">            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <IoMdArrowBack className="mr-2" />
              Back
            </button></Link>
          </form>
        </div>
      </div>

    </div>
  );
}