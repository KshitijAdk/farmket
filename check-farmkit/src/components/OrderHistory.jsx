import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import axios from "axios";

function createData(products) {
  return { id: Math.random(), products };
}

function createProduct(productName, quantity, price, totalPrice, productId) {
  return { productName, quantity, price, totalPrice, id: productId };
}

const OrderHistory = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          setError("Username not found in localStorage");
          return;
        }
        const response = await fetch(
          `http://localhost:8000/cart-items?username=${username}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((order) =>
          createData(
            order.cartItems.map((item) =>
              createProduct(
                item.product_name,
                item.quantity,
                item.price,
                item.totalPrice,
                item.product_id
              )
            )
          )
        );
        setRows(formattedData);
      } catch (error) {
        console.log("Error fetching cart items:", error);
        setError("Error fetching cart items. Please try again.");
      }
    };

    fetchData();
  }, [deleteSuccess]);

  const getTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  const handleToggleCheckbox = (rowId, productId) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            products: row.products.map((product) =>
              product.id === productId
                ? { ...product, selected: !product.selected }
                : product
            ),
          };
        }
        return row;
      })
    );
  };

  const handleDeleteSelectedProducts = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in localStorage");
      return;
    }

    const deletedProductIds = rows.reduce((acc, row) => {
      row.products.forEach((product) => {
        if (product.selected) {
          acc.push(product.id);
        }
      });
      return acc;
    }, []);

    console.log("Username:", username);
    console.log("Deleted ProductIds:", deletedProductIds);

    try {
      const updatedRows = rows.map((row) => {
        return {
          ...row,
          products: row.products.filter(
            (product) => !deletedProductIds.includes(product.id)
          ),
        };
      });

      const responses = await Promise.all(
        deletedProductIds.map((productId) =>
          axios.delete(`http://localhost:8000/delete-product`, {
            params: {
              username: username,
              productId: productId, // Pass productId as a single value
            },
          })
        )
      );

      console.log("Products deleted:", responses.length);
      setRows(updatedRows);
      setDeleteSuccess(true);

      // Calculate updated total price
      const updatedTotalPrice = updatedRows.reduce((total, row) => {
        return total + getTotalPrice(row.products);
      }, 0);

      console.log(updatedTotalPrice)

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 1000); // Automatically close after 1 second

      // Send updated total price to backend
      await axios.post(`http://localhost:8000/update-total-price`, {
        username: username,
        totalPrice: updatedTotalPrice,
      });
    } catch (error) {
      console.error("Error deleting products:", error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-4 flex items-center">
        <FaHistory className="text-3xl mr-2" />
        Order History
      </h1>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {error && <div>User order history not found</div>}
      {deleteSuccess && (
        <div className="bg-green-200 p-2 mb-2 rounded-md">
          Product deleted successfully
        </div>
      )}
      {!error && (
        <div className="main-content p-5 w-full">
          <TableContainer
            component={Paper}
            style={{ maxHeight: "530px", overflow: "auto" }}
          >
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.N</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {rowIndex + 1}
                    </TableCell>
                    <TableCell>
                      {row.products.map((product) => (
                        <div key={product.id}>
                          <Checkbox
                            checked={product.selected || false}
                            onChange={() =>
                              handleToggleCheckbox(row.id, product.id)
                            }
                          />
                          {product.productName}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {row.products.map((product) => (
                        <div key={product.id}>{product.quantity}</div>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {row.products.map((product) => (
                        <div key={product.id}>{product.price}</div>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {getTotalPrice(row.products)} {/* Display total price */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div className="btns flex gap-[850px]">
        <div className="back">
          <Link to="/userprofile">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center">
              <IoMdArrowBack className="mr-2" />
              Back
            </button>
          </Link>
        </div>
        <div className="delete mt-[17px]">
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteSelectedProducts}
          >
            <MdDelete className="mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
