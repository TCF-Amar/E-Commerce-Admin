import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

function List({ token }) {
  const [list, setList] = useState([]); // State to hold the list of products
  const [loading, setLoading] = useState(false); // State to track loading status

  // Function to fetch the list of products
  const fetchList = async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      setList(response.data.products); // Assuming response.data contains the list of products
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  const removeProducts = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/product/delete/${id}`, // ID passed in the URL
      {
        headers: { token }, // Headers added here
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);

      // Refresh the product list after deletion
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    // Better error handling
    const errorMessage =
      error.response?.data?.message || "An error occurred while deleting the product.";
    toast.error(errorMessage);
  }
};

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full h-[90vh] py-7 flex flex-col items-start gap-4 overflow-hidden overflow-y-auto pl-1 scrollHide">
      <h1 className="text-xl font-bold mb-4">All Products</h1>
      {loading ? (
        <div>Loading...</div> // Show loading indicator while fetching data
      ) : (
        <div className="w-full">
          {list.length === 0 ? (
            <p>No products available</p> // Show message if no products are found
          ) : (
            <div className="flex flex-col gap-2">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
              </div>
              {/* Product Rows */}
              {list.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border text-sm"
                >
                  {/* Product Image */}
                  <div className="w-12 h-12">
                    <img
                      src={
                        item.images
                          ? item.images[0]
                          : "https://placeholder.co/50"
                      } // Use a placeholder if image is not available
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  {/* Product Name */}
                  <p>{item.name}</p>
                  {/* Product Category */}
                  <p>{item.category}</p>
                  {/* Product Price */}
                  <p>
                    {currency} {item.price}
                  </p>
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeProducts(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default List;
