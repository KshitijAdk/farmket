import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

//Importing images from the specified path
import milk from "../Images/milk.jpg";
import ghee from "../Images/ghee.jpg";
import butter from "../Images/butter.jpg";

import watermelon from "../Images/Watermelon.png";
import trendguava from "../Images/trendguava.jpg";
import trendonion from "../Images/trendonion.jpg";
import trendchicken from "../Images/trendchicken.jpg";
import trendorange from "../Images/trendorange.jpg";
import trendfish from "../Images/trendfish.jpg";
import trendpea from "../Images/trendpea.jpg";

import Header from "./Header";
import Footer from "./Footer";

// Define an array of trending products with their IDs, names, and images
const trendingProducts = [
  { id: 1, name: "Watermelon", image: watermelon },
  { id: 2, name: "Guava", image: trendguava },
  { id: 3, name: "Onion", image: trendonion },
  { id: 4, name: "Chicken", image: trendchicken },
  { id: 5, name: "Orange", image: trendorange },
  { id: 6, name: "Fish", image: trendfish },
  { id: 7, name: "Pea", image: trendpea },
];

const foodCategories = [
  {
    id: 1,
    image: milk,
    alt: "milk",
    link: "/milk",
    name: "milk",
  },
  {
    id: 2,
    image: ghee,
    alt: "ghee",
    link: "/ghee",
    name: "ghee",
  },
  {
    id: 3,
    image: butter,
    alt: "butter",
    link: "/butter",
    name: "butter",
  },
];

function Dairy() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const changeProduct = (direction) => {
    if (direction === "prev") {
      setCurrentProductIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : trendingProducts.length - 1
      );
    } else {
      setCurrentProductIndex((prevIndex) =>
        prevIndex < trendingProducts.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  return (
    <div className="Container">
      <Header />
      <div className="relative">
        <img
          src={trendingProducts[currentProductIndex].image}
          alt={trendingProducts[currentProductIndex].name}
          className="h-80 w-full object-cover object-center"
        />
        <div className="absolute top-16 left-0 w-full flex justify-center">
          <button className="w-64 h-12 bg-red-600 text-white font-extrabold absolute top-0 transform -translate-y-full">
            Trending Product
          </button>
        </div>
        <div className="absolute bottom-20 left-0 w-full flex justify-center">
          <button className="w-40 h-12 bg-red-600 text-white font-extrabold absolute bottom-0 transform translate-y-full">
            Shop Now
          </button>
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-0 h-10 w-8 bg-white ml-4 flex items-center justify-center"
          onClick={() => changeProduct("prev")}
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-0 ml-2 h-10 w-8 bg-white mr-4 flex items-center justify-center"
          onClick={() => changeProduct("next")}
        >
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-5 mx-3 flex-grow">
        {foodCategories.map((category) => (
          <Link
            to={category.link}
            key={category.id}
            className="w-[240px] h-[310px] rounded-lg shadow-lg text-center transition-transform duration-200 ease-in-out mb-8 overflow-hidden ml-2.5 cursor-pointer"
          >
            <div className="card-content">
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-[184px] object-cover"
              />
              <div className="bg-white h-[126px] flex flex-col justify-center items-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="font-bold">{category.price}</p>
                <button className="w-[233px] h-[44px] bg-[#FF0000] text-white py-1 px-4 rounded-[20px] mt-2 flex items-center justify-center font-bold text-[15px]">
                  <FaShoppingCart className="mr-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-4 border-black border-opacity-50 border-t-1 mx-[62px]" />

      <Footer />
    </div>
  );
}

export default Dairy;
