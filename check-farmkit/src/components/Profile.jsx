import React from "react";
import { FaUser } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import apple from "../Images/fresh-apple.jpg";

export default function Profile() {
  return (
    <div className="flex ">
      <div className="sidebar w-[20%] h-full fixed top-0 left-0 pt-5 text-white border-solid bg-[#97e910] ">
        <div className="profile h-1/5 flex flex-col justify-center items-center">
          <div className="avatar h-44 w-28 bg-white rounded-full flex justify-center items-center ">
            <FaUser className="text-black h-20 w-16" />
          </div>
          <div className="name">
            <p className="text-black text-xl">Mr. Ram Charan</p>
          </div>
          <div className="Rating">
            <Stack spacing={1}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Stack>
          </div>
        </div>
        <ul>
          <li>
            <a href="#" className="text">
              <i className="fas fa-qrcode"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text">
              <i className="fas fa-link"></i> Review
            </a>
          </li>
          <li>
            <a href="#" className="text">
              <i className="fas fa-address-book"></i> Contacts
            </a>
          </li>
          <li>
            <a href="#" className="text">
              <i className="fas fa-shop"></i> Markets
            </a>
          </li>
        </ul>
      </div>

      <div className="product bg-[#a2fc0f]">
        <div className="ml-52 p-5">
          <div className="apple-container flex flex-wrap justify-center">
            <table className="flex flex-col ml-[200px]">
              <tr>
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px]">Buy</button>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
              </tr>
              <tr className="mt-[20px]">
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
                <td className="text-center">
                  <div className="image-container">
                    <img src={apple} alt="" className="midImage" />
                    <p className="desc">
                      Mustang Apple
                      <br />
                      Price: Rs 400 <button className="pl-[60px] ">Buy</button>
                    </p>
                  </div>
                </td>
              </tr>
            </table>

            <div className="bott mt-[15px] ml-[95px]">
              <h1 className="text-center text-[25px] font-extrabold mb-3">
                Other products you might like
              </h1>
              <table>
                <tr className=" h-40 mr-12 rounded-2xl">
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                  <td className="pl-[10px]">
                    <img src={apple} alt="" className="bottImage" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
