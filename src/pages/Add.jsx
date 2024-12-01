import React, { useState } from "react";
import icons from "../assets/icons/icon"; // Assuming you have an icon for image uploads
import axios from "axios"; // Import axios for API requests
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [bestseller, setIsBestseller] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  // Handle image file uploads individually
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (index === 0) {
      setImage1(file);
    } else if (index === 1) {
      setImage2(file);
    } else if (index === 2) {
      setImage3(file);
    } else if (index === 3) {
      setImage4(file);
    }
  };

  // Handle subcategory changes (comma separated)
  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value.split(",").map((item) => item.trim()));
  };

  // Handle size changes (comma separated)
  const handleSizeChange = (e) => {
    setSizes(e.target.value.split(",").map((item) => item.trim()));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("subcategory", JSON.stringify(subcategory)); // Store array as string
    formData.append("sizes", JSON.stringify(sizes)); // Store array as string
    formData.append("bestseller", bestseller);

    // Append images to form data
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      setLoading(true); // Set loading to true when the form is being submitted
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setProductName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSubcategory([]);
        setSizes([]);
        setIsBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle the error (e.g., display a message to the user)
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <form
      className="w-full h-[90vh] py-4 flex flex-col items-start gap-4 overflow-hidden overflow-y-auto pl-1 scrollHide"
      onSubmit={handleSubmit}
    >
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {/* Image 1 */}
          <label htmlFor="image1">
            <div className="w-[50px] my-2 min-h-[50px] flex justify-center items-center bg-gray-200 border-2 cursor-pointer">
              {/* Display the preview of the uploaded image or use the default upload icon */}
              <img
                src={image1 ? URL.createObjectURL(image1) : icons.uploadImg} // Use image1 state
                alt="Upload image1"
              />
            </div>
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => handleImageChange(e, 0)}
            />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2">
            <div className="w-[50px] my-2 min-h-[50px] flex justify-center items-center bg-gray-200 border-2 cursor-pointer">
              <img
                src={image2 ? URL.createObjectURL(image2) : icons.uploadImg} // Use image2 state
                alt="Upload image2"
              />
            </div>
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => handleImageChange(e, 1)}
            />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3">
            <div className="w-[50px] my-2 min-h-[50px] flex justify-center items-center bg-gray-200 border-2 cursor-pointer">
              <img
                src={image3 ? URL.createObjectURL(image3) : icons.uploadImg} // Use image3 state
                alt="Upload image3"
              />
            </div>
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => handleImageChange(e, 2)}
            />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4">
            <div className="w-[50px] my-2 min-h-[50px] flex justify-center items-center bg-gray-200 border-2 cursor-pointer">
              <img
                src={image4 ? URL.createObjectURL(image4) : icons.uploadImg} // Use image4 state
                alt="Upload image4"
              />
            </div>
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => handleImageChange(e, 3)}
            />
          </label>
        </div>
      </div>
      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2">Price</p>
        <input
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Quantity */}
      <div className="w-full">
        <p className="mb-2">Quantity</p>
        <input
          type="number"
          placeholder="Enter product Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Category */}
      <div className="w-full">
        <p className="mb-2">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {/* Subcategory (Optional) */}
      <div className="w-full">
        <p className="mb-2">Subcategory</p>
        <input
          type="text"
          placeholder="Enter subcategories (comma separated)"
          value={subcategory.join(",")}
          onChange={handleSubcategoryChange}
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Sizes (Optional) */}
      <div className="w-full">
        <p className="mb-2">Sizes</p>
        <input
          type="text"
          placeholder="Enter sizes (comma separated)"
          value={sizes.join(",")}
          onChange={handleSizeChange}
          className="w-full max-w-[500px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1fd4a7]"
        />
      </div>

      {/* Bestseller */}
      <div className="w-full">
        <label htmlFor="bestseller" className="inline-flex items-center">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setIsBestseller(!bestseller)}
            className="mr-2"
          />
          Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <div>
        {loading ? (
          <button
            type="button"
            className="w-full max-w-[200px] bg-[#1fd4a7] text-white py-2 px-4 rounded-md font-medium transition-all mt-4 cursor-not-allowed hover:bg-[#219175]"
          >
            Loading...
          </button> // Display loading message when submitting
        ) : (
          <button
            type="submit"
            className="w-full max-w-[200px] bg-[#1fd4a7] text-white py-2 px-4 rounded-md font-medium transition-all mt-4 hover:bg-[#219175]"
          >
            Add Product
          </button>
        )}
      </div>
    </form>
  );
}

export default Add;
