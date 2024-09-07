import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate the total price
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // Function to remove item from cart
  const removeItem = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hello {auth?.user?.name}</h1>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <div className="flex">
        <div className="left flex-1">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cart.map((product, index) => (
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                  key={index}
                >
                  <img
                    className="rounded-t-lg w-full h-[150px] object-cover"
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <h3 className="text-lg font-semibold mb-2 mt-2">{product.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">Price: ${product.price}</p>
                  <p className="text-gray-600 text-xs">{product.description}</p>
                  <button
                    onClick={() => removeItem(product._id)}
                    className="mt-4 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="right ml-6 mt-6 md:mt-0 md:ml-6 flex-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <p className="text-lg mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
