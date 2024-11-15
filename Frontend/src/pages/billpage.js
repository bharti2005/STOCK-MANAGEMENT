import React, { useState, useEffect } from "react";
import { useProductDropdown } from "../custom hooks/useProductMap";

const Bill = () => {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([{ productId: "", quantity: 1, price: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [billCreated, setBillCreated] = useState(false);

  // Using custom hook to fetch product dropdown data
  const productMap = useProductDropdown();

  const handleProductChange = (index, event) => {
    const updatedProducts = [...products];
    updatedProducts[index][event.target.name] = event.target.value;
    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (products) => {
    const total = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    setTotalAmount(total);
  };

  const addProduct = () => {
    setProducts([...products, { productId: "", quantity: 1, price: 0 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const billData = { customerName, products, totalAmount };

    try {
      await fetch(`http://localhost:5000/api/bills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billData),
      });
      setBillCreated(true);
    } catch (error) {
      console.error("Error registering bill:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-yellow-500 min-h-screen">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>

          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Select a Product:</label>
              <select
                id="productDropdown"
                name="productId"
                value={product.productId}
                onChange={(e) => handleProductChange(index, e)}
                required
                className="border p-2 w-full"
              >
                <option value="" disabled>Select a product</option>
                {productMap.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                min="1"
                required
                className="border p-2 w-full"
              />

              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)}
                min="0"
                required
                className="border p-2 w-full"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Add Product
          </button>

          <div className="mb-4">
            <strong>Total Amount:</strong> {totalAmount}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit Bill
          </button>
        </form>

        {billCreated && (
          <div className="mt-6 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-xl font-bold">Bill Details</h3>
            <p><strong>Customer Name:</strong> {customerName}</p>
            <h4 className="font-bold mt-2">Products</h4>
            {products.map((product, index) => (
              <p key={index}>
                Product ID: {product.productId}, Quantity: {product.quantity}, Price: {product.price}
              </p>
            ))}
            <p className="mt-2"><strong>Total Amount:</strong> {totalAmount}</p>
            <button
              onClick={handlePrint}
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            >
              Print Bill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bill;
