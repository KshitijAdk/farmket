import React from "react"; // Importing React library to use JSX syntax
import {
  FaPhone,
  FaInstagram,
  FaTwitter,
  // FaFacebookMessenger,
} from "react-icons/fa"; // Importing icons
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function ConnectWithUs() {
  return (
    <footer className="bg-[#ebff00] p-5 rounded-2xl mx-7 my-5 max-w-[calc(100%-60px)]">
      <center>
        <div className="connectus mt-2">
          <h3 className="text-xl font-semibold">Connect With Us</h3>
          <div className="flex justify-center items-center mt-5 pl-4">
            {/* Container for social media links */}
            <a className="hover:text-blue-600 mx-2" href="https://facebook.com">
              <FaFacebook />
            </a>
            <a className="hover:text-red-500 mx-2" href="https://instagram.com">
              <FaInstagram />
            </a>
            <a className="hover:text-blue-500 mx-2" href="https://twitter.com">
              <FaTwitter />
            </a>
            <a className="mx-2" href="https://mail.google.com">
              <FcGoogle />
            </a>
            <a
              className="hover:text-blue-600 mx-2"
              href="https://mail.google.com"
            >
              <FaPhone />
            </a>
          </div>
        </div>
      </center>
    </footer>
  );
}
