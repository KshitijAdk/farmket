import React from "react";
//Imported icons
import { FaPhone, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Footer() {
  return (
    <div className="bg-[#FFA800] text-black p-4 flex flex-col items-center rounded-tl-[20px] rounded-tr-[20px]">
      <div className="w-full flex justify-between items-center">
        <div className="footer-section ml-[65px]">
          <h3 className="font-semibold text-[32px]">Categories</h3>
          <ul>
            <li>&#8226; Fruits</li>
            <li>&#8226; Vegetables</li>
            <li>&#8226; Meat</li>
            <li>&#8226; Dairy</li>
          </ul>
        </div>

        <div className="connectus">
          <h3 className="text-[32px] font-medium">Connect With Us</h3>
          <div className="flex justify-center items-center mt-5">
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
            <a className="hover:text-blue-600 mx-2" href="tel:+1234567890">
              <FaPhone />
            </a>
          </div>
        </div>

        <div className="footer-section mr-[65px]">
          <h3 className="font-semibold text-[32px]">Products</h3>
          <ul>
            <li>&#8226; Fruits</li>
            <li>&#8226; Vegetables</li>
            <li>&#8226; Meat</li>
            <li>&#8226; Dairy</li>
          </ul>
        </div>
      </div>
      <div className="line w-full border-t-2 border-black my-4"></div>
      <p className="text-center font-medium">Copyright © 2024 FarmKet</p>
    </div>
  );
}
