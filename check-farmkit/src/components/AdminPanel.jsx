import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

export default function AdminPanel() {
  const [rows, setRows] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch cart items data
    fetch("http://localhost:8000/api/cartItems")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          username: item.username,
          email: item.email, // Added email property
          productDetails: JSON.parse(item.products).map(
            (product) => `${product.product_name} (${product.quantity})`
          ).join(", "),
          totalAmount: item.total_amount,
          productID: item.product_id,
          verification: localStorage.getItem(`${item.username}-${item.product_id}`) || "", // Get verification status from localStorage or default to empty string
        }));
        setRows(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch cart items count
    fetch("http://localhost:8000/api/row-counts")
      .then((response) => response.json())
      .then((data) => {
        setCartItemsCount(data.cartItemCount);
        setProductCount(data.productViewCount)
        setUserCount(data.usersCount);
      })
      .catch((error) => console.error("Error fetching cart items count:", error));
  }, []);


  const handleVerificationChange = async (event, productID, username, email, productDetails) => {
    try {
      const { value } = event.target;
      const updatedRows = rows.map(row => {
        if (row.username === username && row.productDetails === productDetails) {
          localStorage.setItem(`${username}-${productID}`, value); // Store verification status in localStorage
          return { ...row, verification: value };
        }
        return row;
      });
      setRows(updatedRows);

      console.log("Notification status changed for:", username);
      console.log("Product ID:", productID);
      console.log("New status:", value);

      // Check if the new status is "Verified"
      if (value === "Verified") {
        // Send notification for order placement
        const response = await fetch('http://localhost:8000/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            message: 'Your order has been placed',
            status: true
          })
        });

        if (!response.ok) {
          console.error('Failed to send notification');
        }
      } else if (value === "Not Verified") {
        // Send notification for order cancellation
        const response = await fetch('http://localhost:8000/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            message: 'Your order has been cancelled',
            status: false
          })
        });

        if (!response.ok) {
          console.error('Failed to send notification');
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("tokem")
    localStorage.removeItem("password")
  }

  return (
    <div className="Container">
      <header className="bg-[#FFA800] flex justify-between items-center py-2 px-20 shadow-md">
        <div className="heading ml-[86px]">
          <h1 className="italic">
            <span className="text-black font-kaushan text-6xl">FARMKIT</span>
            <span className="text-white font-kaushan text-6xl italic">ORG</span>
          </h1>
          <h3 className="text-white font-kaushan text-2xl ml-[150px] italic">
            From Farmers to Farmers
          </h3>
        </div>
      </header>
      <div class="flex h-full w-full cursor-pointer">
        <div class="sidebar bg-[#FFA800] text-white p-5 w-[20%] font-bold text-[20px] flex flex-col items-center">
          <Link to="/admin-dashboard">          <div class="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
            <MdDashboard class="mr-[22px]" />
            <span>Dashboard</span>
          </div></Link>
          <Link to="/product-details">
            <div class="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
              <FaUser class="mr-[22px]" />
              <span>Product Details</span>
            </div>
          </Link>
          <Link to="/user-details">
            <div class="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
              <FaBitbucket class="mr-[22px]" />
              <span>User Details</span>
            </div>
          </Link>
          <Link to="/login">          <button class="menu-item mt-10 w-full flex items-center justify-start pl-5" onClick={logout}>
            <RiLogoutBoxFill class="mr-[22px]" />
            <span>Log Out</span>
          </button></Link>
        </div>

        <div class="main-dashboard p-5 w-full">
          <div class="info-cards flex justify-between mb-5 space-x-4">
            <div class="card bg-red-500 text-white p-3 w-1/4 h-[170px] flex flex-col justify-between rounded-lg shadow-md">
              <div>
                <div class="flex items-center justify-center space-x-2">
                  <MdDashboard className="h-6 w-6" />
                  <span class="text-xl font-bold">Dashboard</span>
                </div>
                <p class="text-center text-4xl font-bold mt-4">{cartItemsCount}</p>
              </div>
              <Link to="/admin-dashboard">              <button class="mt-auto py-2 bg-red-700 rounded-b-lg w-full">
                Show order
              </button></Link>
            </div>
            <div class="card bg-green-500 text-white p-3 w-1/4 flex flex-col justify-between rounded-lg shadow-md h-[170px]">
              <div>
                <div class="flex items-center justify-center space-x-2">
                  <FaBitbucket className="h-6 w-6" />
                  <span class="text-xl font-bold">Product Details</span>
                </div>
                <p class="text-center text-4xl font-bold mt-4">{productCount}</p>
              </div>
              <Link to="/product-details">              <button class="mt-auto py-2 bg-green-700 rounded-b-lg w-full">
                Show Products
              </button></Link>
            </div>
            <div class="card bg-blue-500 text-white p-3 w-1/4 flex flex-col justify-between rounded-lg shadow-md h-[170px]">
              <div>
                <div class="flex items-center justify-center space-x-2">
                  <FaUser className="h-6 w-6" />
                  <span class="text-xl font-bold">User Details</span>
                </div>
                <p class="text-center text-4xl font-bold mt-4">{userCount}</p>
              </div>
              <Link to="/user-details">              <button class="mt-auto py-2 bg-blue-700 rounded-b-lg w-full">
                Show Users
              </button></Link>
            </div>
          </div>

          <div className="main-content p-5 w-full">
            <TableContainer
              component={Paper}
              style={{ maxHeight: "400px", overflow: "auto" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                stickyHeader
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Product Details</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={`${row.username}-${row.productDetails}`}>
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      <TableCell align="right">{row.productDetails}</TableCell>
                      <TableCell align="right">{row.totalAmount}</TableCell>
                      <TableCell align="right">
                        <Select
                          value={row.verification}
                          onChange={(event) =>
                            handleVerificationChange(
                              event,
                              row.productID,
                              row.username,
                              row.email,
                              row.productDetails
                            )
                          }
                          disabled={row.verification === "Verified"} // Disable if already verified
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="Verified">Verified</MenuItem>
                          <MenuItem value="Not Verified">Not Verified</MenuItem>
                        </Select>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
