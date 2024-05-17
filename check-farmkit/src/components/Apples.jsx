import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { TiLocation } from "react-icons/ti";
import { FaCartArrowDown } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import {
  // FaFacebookMessenger,
  FaUser,
} from "react-icons/fa";

import appleimg from "../Images/fresh-apple.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Apples() {
  const [farmerDetails, setFarmerDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredFarmerDetails, setFilteredFarmerDetails] = useState([]); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAppleData() {
      try {
        const response = await fetch("http://localhost:8000/api/apples");
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Error fetching apple data:", error);
      }
    }

    async function fetchData() {
      try {
        const data = await fetchAppleData();
        if (Array.isArray(data)) {
          setFarmerDetails(data); // Set farmerDetails here
          setFilteredFarmerDetails(data); // Also set filteredFarmerDetails
        } else {
          throw new Error("Data format is incorrect.");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const handleSearchLocationChange = (e) => {
    const location = e.target.value;
    setSearchLocation(location);
    const filteredFarmers = farmerDetails.filter(farmer => farmer.location.toLowerCase().includes(location.toLowerCase()));
    setFilteredFarmerDetails(filteredFarmers);
  };

  const addToCart = async (product) => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate('/login')
        return;
      }

      const { product_name, price, product_id } = product;
      const response = await fetch("http://localhost:8000/user/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          product_name,
          price,
          quantity: 1,
          product_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="Container">
      <Header />

      <div className="flex justify-around mt-5 mx-11">
        <div className="w-1/4 ml-11">
          <div className="relative w-80 h-96 bg-[#a2fc0f] rounded-2xl shadow text-center transition-transform duration-200 ease-in-out mb-8 overflow-hidden cursor-pointer">
            <img
              src={appleimg}
              alt="appleimage"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="product-name">
            <p className="text-3xl text-center font-bold">Apples</p>
          </div>
        </div>
        <div className="infodetails ">
          <div className=" flex gap-24 justify-center items-center h-24 w-w-6/12 bg-[#fffff]">
            <div className="location">
              <h4 className="font-extrabold">FILTER BY LOCATION</h4>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  className="bg-[#acf03d] border border-black outline-none px-4 py-2.5 h-9 w-80 rounded-lg"
                  value={searchLocation}
                  onChange={handleSearchLocationChange}
                />
              </div>
            </div>
            <div className="progress-bar">
              <h4 className="font-extrabold">FILTER BY PRICE</h4>
              <div className="slider bg-[#acf03d] border border-black outline-none h-9 w-80 mt-4 rounded-lg pl-4 pt-0.5">
                <Box sx={{ width: 280 }}>
                  <Slider
                    defaultValue={50}
                    min={0}
                    max={500}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Box>
              </div>
            </div>
          </div>
          {filteredFarmerDetails.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg">No products found</p>
            </div>
          ) : (
            filteredFarmerDetails.map((farmer, index) => (
              <div
                className="Farmers-detail mt-6 border-b border-black pb-3 mb-2 flex flex-col items-center"
                key={index}
              >
                <div className="top-part flex w-full justify-around items-center">
                  <div className="profile flex items-center justify-center cursor-pointer">
                    <Link to={farmer.link}>
                      <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                        <FaUser className="w-14 h-12" />
                      </div>
                      <p className="pt-2 text-center">{farmer.farmer_name}</p>
                    </Link>
                  </div>
                  {/* Farmer Description */}
                  <div className="about w-2/3 text-center">
                    {farmer.product_desc && (
                      <p className="mb-2">{farmer.product_desc}</p>
                    )}
                  </div>
                  <div className="price-location flex flex-col items-center">
                    <div className="price w-40 h-9 text-2xl font-extrabold bg-[#9ded1b] rounded-lg flex items-center justify-center">
                      {farmer.price}/kg
                    </div>
                    <div
                      className="location flex items-center mt-2"
                      style={{ minWidth: "150px", whiteSpace: "nowrap" }}
                    >
                      <span>{farmer.location}</span>
                      <TiLocation
                        style={{ marginLeft: "8px", fontSize: "1.5rem" }}
                      />
                    </div>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-800 text-black hover:text-white font-bold py-2 px-8 rounded-lg shadow-lg flex items-center justify-center space-x-2 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-300 ease-in-out" onClick={() => addToCart(farmer)}>
                  <span className="flex items-center">
                    <FaCartArrowDown className="mr-2" />

                    <span>Add to Cart</span>
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Apples;
