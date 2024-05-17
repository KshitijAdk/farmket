import React from "react"; /// Importing React library to use JSX syntax
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FaShoppingCart } from "react-icons/fa";

//Importing images from the specified path
import image1 from "../Images/fruitt.png";
import image2 from "../Images/healthy-vegetable.jpg";
import image3 from "../Images/raw-meat.webp";
import image4 from "../Images/Dairy-products.jpg";

import image5 from "../Images/Rectangle.png";
import image6 from "../Images/freedelivery.png";

import apple from "../Images/fresh-apple.jpg";
import strawberry from "../Images/fresh-strawberry.jpg";
import mango from "../Images/fresh-mango.jpg";

// Array of food categories with respective details
const ProductCategories = [
  { id: 1, title: "FRUITS", image: image1, alt: "Fruits", link: "/fruits" }, // Fruit category with image1 and alt text
  {
    id: 2,
    title: "VEGETABLES",
    image: image2,
    alt: "Vegetables",
    link: "/vegetables",
  },
  {
    id: 3,
    title: "MEAT PRODUCTS",
    image: image3,
    alt: "Meat Products",
    link: "/meat",
  },
  {
    id: 4,
    title: "DAIRY PRODUCTS",
    image: image4,
    alt: "Dairy Products",
    link: "/dairy",
  },
];

// React functional component for the LandingPage
function LandingPage() {
  const foodCategories = [
    {
      id: 1,
      image: apple,
      alt: "apple",
      link: "/apples",
      name: "Apple",
      // price: "Rs 200",
    },
    {
      id: 2,
      image: mango,
      alt: "mango",
      link: "/mango",
      name: "Mango",
      // price: "Rs 300",
    },
    {
      id: 3,
      image: strawberry,
      alt: "strawberry",
      link: "/strawberry",
      name: "Strawberry",
      // price: "Rs 150",
    },
  ];

  return (
    <div className="main">
      <Header />
      <div className="topimage mt-[22px] h-[569px] w-full relative">
        <img
          src={image5}
          alt="DefaultImage"
          className="h-full w-full object-cover"
        />
        <p className="absolute bottom-[40px] right-7 text-white text-[80px] font-semibold">
          We <br></br>deliver<br></br> to your<br></br> door
        </p>
      </div>

      <div className="category flex justify-center items-center mt-[68px]">
        <button className="h-[57px] w-[282px] bg-[#FFA800] text-[36px] rounded-[30px] text-white font-poppins font-semibold">
          Category
        </button>
      </div>

      <main className="farmkit-main">
        <div className="flex flex-wrap gap-8 justify-center mb-8 mt-[46px]">
          {" "}
          {/*iterates over each element in the foodCategories array*/}
          {ProductCategories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="w-[300px] h-[364px] rounded-2xl shadow text-center transition-transform duration-200 ease-in-out mb-8 overflow-hidden ml-5 cursor-pointer hover:scale-105"
            >
              <div className="relative">
                <img
                  className="w-[300px] h-[364px] object-cover object-center"
                  src={category.image}
                  alt={category.alt}
                />
                <button className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 bg-[#a2fc0f] text-black px-4 py-2 rounded-xl font-bold z-10">
                  {category.title}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <div className="category flex justify-center items-center mt-[112px]">
        <button className="h-[57px] w-[282px] bg-[#FFA800] text-[36px] rounded-[30px] text-white font-poppins font-semibold">
          Fruits
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-[46px] mx-3 flex-grow">
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
      <div className="line">
        <hr className="my-4 border-black border-opacity-50 border-t-1 mx-[62px]" />
      </div>

      <div className="freedelivery mt-[50px]">
        <div className="mx-[106px]">
          <img
            src={image6}
            alt="FreedeliveryImage"
            className="h-[393px] w-full"
          />
        </div>
      </div>

      <div className="bg-white p-10 max-w-7xl mx-auto rounded-lg shadow-lg mt-10 flex flex-col space-y-8 mb-[10px]">
        <h1 className="text-5xl font-semibold mb-2">About Us</h1>
        <p className="text-xl leading-relaxed text-gray-800">
          FarmKit connects farmers directly with consumers, offering a diverse
          selection of fresh fruits, vegetables, meat, and dairy products. By
          cutting out middlemen, we ensure fair prices for farmers and deliver
          unparalleled freshness to our customers' tables. Join us in supporting
          local agriculture and experiencing the true taste of farm-to-table
          goodness with FarmKit.
        </p>
      </div>

      <Footer />
    </div>
  );
}
export default LandingPage;
