import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBitbucket } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

function createData(username, email, password, phone) {
    return { username, email, password, phone };
}

export default function UserDetails() {
    const [rows, setRows] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch users data when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();

        // Fetch cart items count
        fetch("http://localhost:8000/api/row-counts")
            .then((response) => response.json())
            .then((data) => {
                setCartItemsCount(data.cartItemCount);
                setProductCount(data.productViewCount)
                setUserCount(data.usersCount);
            })
            .catch((error) => console.error("Error fetching cart items count:", error));
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const handleAction = (username) => {
        console.log("Action clicked for:", username);
    };

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
            <div className="flex w-full cursor-pointer">
                <div className="sidebar bg-[#FFA800] text-white p-5 w-[20%] font-bold text-[20px] flex flex-col items-center h-screen">
                    <Link to="/admin-dashboard">
                        <div className="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
                            <MdDashboard className="mr-[22px]" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                    <Link to='/product-details'>
                        <div className="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
                            <FaUser className="mr-[22px]" />
                            <span>Product Details</span>
                        </div>
                    </Link>
                    <Link to='/user-details'>
                        <div class="menu-item mt-10 mb-4 w-full flex items-center justify-start pl-5">
                            <FaBitbucket className="mr-[22px]" />
                            <span>User Details</span>
                        </div>
                    </Link>
                    <Link to="/login">
                        <div className="menu-item mt-10 w-full flex items-center justify-start pl-5">
                            <RiLogoutBoxFill className="mr-[22px]" />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div>

                <div className="main-dashboard p-5 w-full">
                    <div className="info-cards flex justify-between mb-5 space-x-4">
                        <div className="card bg-red-500 text-white p-3 w-1/4 h-[170px] flex flex-col justify-between rounded-lg shadow-md">
                            <div>
                                <div className="flex items-center justify-center space-x-2">
                                    <MdDashboard className="h-6 w-6" />
                                    <span className="text-xl font-bold">Dashboard</span>
                                </div>
                                <p className="text-center text-4xl font-bold mt-4">{cartItemsCount}</p>
                            </div>
                            <Link to="/admin-dashboard">
                                <button className="mt-auto py-2 bg-red-700 rounded-b-lg w-full">
                                    Show order
                                </button>
                            </Link>
                        </div>
                        <div class="card bg-green-500 text-white p-3 w-1/4 flex flex-col justify-between rounded-lg shadow-md h-[170px]">
                            <div>
                                <div class="flex items-center justify-center space-x-2">
                                    <FaBitbucket className="h-6 w-6" />
                                    <span className="text-xl font-bold">Product Details</span>
                                </div>
                                <p className="text-center text-4xl font-bold mt-4">{productCount}</p>
                            </div>
                            <Link to="/product-details">
                                <button className="mt-auto py-2 bg-green-700 rounded-b-lg w-full">
                                    Show Products
                                </button>
                            </Link>
                        </div>
                        <div className="card bg-blue-500 text-white p-3 w-1/4 flex flex-col justify-between rounded-lg shadow-md h-[170px]">
                            <div>
                                <div class="flex items-center justify-center space-x-2">
                                    <FaUser className="h-6 w-6" />
                                    <span className="text-xl font-bold">User Details</span>
                                </div>
                                <p className="text-center text-4xl font-bold mt-4">{userCount}</p>
                            </div>
                            <Link to="/user-details">
                                <button className="mt-auto py-2 bg-blue-700 rounded-b-lg w-full">
                                    Show Users
                                </button>
                            </Link>
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
                                aria-label="user details table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.N</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Password</TableCell>
                                        <TableCell>Phone</TableCell>
                                        {/* <TableCell>Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{row.username}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.password}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>
                                                {/* <Button
                                                    onClick={() => handleAction(row.username)}
                                                    variant="outlined"
                                                    color="primary"
                                                >
                                                    Action
                                                </Button> */}
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
