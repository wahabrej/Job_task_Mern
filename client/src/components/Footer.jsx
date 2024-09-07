import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full fixed bottom-0 z-50">
      {" "}
      {/* Adjusted z-index */}
      <div className="container mx-auto text-center">
        <Link
          to="/about"
          className="text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Contact
        </Link>
        <Link
          to="/privacy"
          className="text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Privacy Policy
        </Link>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </div>
    </footer>
  );
}
