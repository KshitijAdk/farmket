import React, { useState } from "react";
import axios from 'axios';

const AddProduct = ({ handleClose }) => {
    const [product, setProduct] = useState({
        productName: "",
        price: "",
        stock: "",
        farmerName: "",
        productDetail: "",
        location: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct the new product object
        const newProduct = {
            product_name: product.productName,
            price: parseFloat(product.price),
            stock: parseInt(product.stock),
            farmer_name: product.farmerName,
            product_detail: product.productDetail,
            location: product.location,
        };
        
        try {
            // Make a POST request to save the new product
            const response = await axios.post('http://localhost:8000/api/products', newProduct);
            // Handle successful response
            console.log('Product added successfully:', response.data);
            // Close the add product form
            handleClose();
        } catch (error) {
            // Handle error
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto p-4 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center text-lg font-bold">Add Product</div>
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        value={product.productName}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="price"
                        placeholder="Enter price"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="stock"
                        placeholder="Enter stock"
                        value={product.stock}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="farmerName"
                        placeholder="Enter farmer name"
                        value={product.farmerName}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="productDetail"
                        placeholder="Enter product detail"
                        value={product.productDetail}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        value={product.location}
                        onChange={handleChange}
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
