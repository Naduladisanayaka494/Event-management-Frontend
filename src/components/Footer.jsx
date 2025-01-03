// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Event Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
