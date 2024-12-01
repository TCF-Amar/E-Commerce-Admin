import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function AdminLogin({ setToken }) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    focus: { scale: 1.04, transition: { duration: 0.3 } },
    blur: { scale: 1 },
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin/login", {
        email,
        password,
      });
      if (response.data.success) {
          setToken(response.data.token);
          toast.success("Login successful!");
      } else {
          toast.error(response.data.message);
  
      }
    } catch (error) {
      console.log(response.data);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-200 px-4"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Admin Login
        </h2>

        {/* Email Input */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          whileHover="focus"
          className="mb-4"
        >
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7] transition-all"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>

        {/* Password Input */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          whileHover="focus"
          className="mb-6"
        >
          <label htmlFor="password" className="block text-gray-600 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7] transition-all"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-full bg-[#1fd4a7] text-white py-2 px-4 rounded-md font-medium transition-all"
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default AdminLogin;
