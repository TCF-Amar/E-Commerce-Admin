import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Header Component with custom logout confirmation dialog box.
 */
function Header({ setToken }) {
  const [showModal, setShowModal] = useState(false); // To manage modal visibility

  const iconVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
    hover: { scale: 1 },
  };

  const handleLogout = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmLogout = () => {
    setToken(""); // Clears the token from state
    localStorage.removeItem("token"); // Removes the token from localStorage
    setShowModal(false); // Close the modal
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal if canceled
  };

  return (
    <motion.div
      className="h-[8vh] w-full bg-gray-50 px-4 flex items-center justify-between"
      initial="hidden"
      animate="visible"
    >
      {/* Logo Section */}
      <div>
        <Link to="/add" className="flex gap-1 font-bold text-2xl">
          <motion.p className="text-gray-500">My</motion.p>
          <motion.p className="text-gray-700">Shop</motion.p>
          <motion.p
            className="text-[#1fd4a7]"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
            }}
          >
            .
          </motion.p>
        </Link>
      </div>

      {/* User Options */}
      <div className="flex gap-3">
        <motion.div variants={iconVariants}>
          <button
            onClick={handleLogout}
            className="px-5 font-bold bg-gray-300 rounded p-1 hover:bg-gray-400 duration-300 ease-in-out transition-all"
          >
            Logout
          </button>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={confirmLogout}
                className="bg-green-500 hover:bg-green-600 duration-200 transition-all ease-in-out text-white py-2 px-4 rounded-md flex-1"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-red-500 hover:bg-red-600 duration-200 transition-all ease-in-out text-white py-2 px-4 rounded-md flex-1"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Header;
