import React from "react";
import LandingPage from "./components/LandingPage";
import Fruits from "./components/Fruits";
import Apples from "./components/Apples";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing necessary components from react-router-dom
import Login from "./components/Login";
import Signup from "./components/Signup";
import Yourcart from "./components/Yourcart";
import Vegetables from "./components/Vegetables";
import Dairy from "./components/Dairy";
import Meat from "./components/Meat";
import Mango from "./components/Fruits/Mango";
import Strawberry from "./components/Fruits/Strawberry";
import Butter from "./components/Dairy/Butter";
import Ghee from "./components/Dairy/Ghee";
import Milk from "./components/Dairy/Milk";
import Chicken from "./components/Meat/Chicken";
import Fish from "./components/Meat/Fish";
import Mutton from "./components/Meat/Mutton";
import Cabbage from "./components/Vegetables/Cabbage";
import Carrot from "./components/Vegetables/Carrot";
import Tomato from "./components/Vegetables/Tomato";

import UserProfile from "./components/UserProfile";
import OrderHistory from "./components/OrderHistory";
import ConnectWithUs from "./components/ConnectWithUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import ProductDetails from "./components/ProductDetails";
import UserDetails from "./components/UserDetails";

// Main App component
const App = () => {
  return (
    <Router>
      {" "}
      {/* Router component to provide navigation functionality */}
      <div>
        {" "}
        {/* Main container for all routes */}
        <Routes>
          {" "}
          {/* Routes component for defining different routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/meat" element={<Meat />} />
          <Route path="/apples" element={<Apples />} />
          <Route path="/mango" element={<Mango />} />
          <Route path="/strawberry" element={<Strawberry />} />
          <Route path="/butter" element={<Butter />} />
          <Route path="/ghee" element={<Ghee />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chicken" element={<Chicken />} />
          <Route path="/fish" element={<Fish />} />
          <Route path="/mutton" element={<Mutton />} />
          <Route path="/cabbage" element={<Cabbage />} />
          <Route path="/carrot" element={<Carrot />} />
          <Route path="/tomato" element={<Tomato />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Yourcart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/admin-dashboard" element={<AdminPanel />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>

    // <AdminPanel />
  );
};

export default App; // Exporting the App component
