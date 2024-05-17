import React, { useState, useRef, useEffect, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import user from "../Images/user.png";
import { StoreContext } from "../../context/context";
import Notification from "./Notification";

function Header() {
  const { token, setToken } = useContext(StoreContext);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const notificationItemCount = 3;
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    // Fetch cart item count from the backend
    const fetchCartItemCount = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/productCount?email=${localStorage.getItem("email")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart item count");
        }
        const data = await response.json();
        setCartItemCount(data.count);
      } catch (error) {
        console.error("Error fetching cart item count:", error);
      }
    };

    fetchCartItemCount(); // Call the fetchCartItemCount function
  }, []);

  const username = localStorage.getItem("username");

  const openProfile = () => {
    navigate("/userprofile");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setToken("");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div onClick={handleClickOutside}>
      <header className="bg-[#FFA800] flex justify-between items-center py-2 px-20 shadow-md">
        <div className="heading ml-[86px]">
          <Link to="/">          <h1 className="italic">
            <span className="text-black font-kaushan text-6xl">FARMKIT</span>
            <span className="text-white font-kaushan text-6xl italic">ORG</span>
          </h1></Link>
          <h3 className="text-white font-kaushan text-2xl ml-[150px] italic">
            From Farmers to Farmers
          </h3>
        </div>
        <div className="flex space-x-4 cursor-pointer text-4xl">
          {token ? ( // Render user profile if logged in
            <div className="relative" ref={dropdownRef}>
              <img
                src={user}
                alt="user"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <ul className="absolute top-full right--1 mt-2 bg-white shadow-lg rounded-md py-1 w-[180px]"> {/* Adjust width here */}
                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-200"
                  >
                    {username}
                  </li>
                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-200"
                    onClick={openProfile}
                  >
                    Profile
                  </li>

                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-200"
                    onClick={logOut}
                  >
                    Log Out
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                style={{
                  display: 'inline-block',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '4px 16px',
                  fontSize: '18px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Log In
              </button>
            </Link>


          )}
        </div>
      </header>
      <div className="flex justify-between items-center px-20 py-[14px] shadow-xl">
        <Link to="/">
          <div className="cursor-pointer text-4xl ml-[90px]">
            <AiFillHome />
          </div>
        </Link>
        {/* <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="w-96 h-16 border-2 border-black outline-none rounded-full px-4 text-base text-center"
          />
        </div> */}
        <div className="flex space-x-4 cursor-pointer text-4xl">
          <div className="relative mr-[86px]">
            <IoNotificationsSharp
              style={{ cursor: "pointer" }}
              onClick={toggleNotifications}
            />
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full px-2 text-xs">
              {notificationItemCount}
            </span>
            {showNotifications && (
              <div
                ref={notificationRef}
                className="absolute top-full right-0 mt-2 z-10"
              >
                <Notification />
              </div>
            )}
          </div>
          <Link to="/cart">
            <div className="relative">
              <FaShoppingCart />
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full px-2 text-xs">
                {cartItemCount}
              </span>
            </div>
          </Link>
          <Link to="/userprofile">          <IoIosSettings style={{ marginLeft: "86px" }} />
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center bg-[#F4ECEC] py-3 px-20 text-black mx-10 rounded-bl-[50px] rounded-br-[50px] shadow-lg">
        <Link to="/fruits">        <div className="flex items-center cursor-pointer space-x-1">
          <h3 className="text-[#6D8AF3]">FRUITS</h3>
          <MdOutlineArrowDropDown className="text-3xl" />
        </div></Link>
        <Link to="/vegetables">        <div className="flex items-center cursor-pointer space-x-1">
          <h3>VEGETABLES</h3>
          <MdOutlineArrowDropDown className="text-3xl" />
        </div></Link>
        <Link to="/meat">        <div className="flex items-center cursor-pointer space-x-1">
          <h3>MEAT PRODUCTS</h3>
          <MdOutlineArrowDropDown className="text-3xl" />
        </div></Link>
        <Link to="/dairy">        <div className="flex items-center cursor-pointer space-x-1">
          <h3>DAIRY PRODUCTS</h3>
          <MdOutlineArrowDropDown className="text-3xl" />
        </div></Link>
      </div>
    </div>
  );
}

export default Header;
