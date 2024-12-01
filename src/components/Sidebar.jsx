import { NavLink } from "react-router-dom";
import icons from "../assets/icons/icon";

function Sidebar() {
  return (
    <div className="w-[18%] min-h-[90vh] border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l duration-300 ease-in-out transition-all`}
          to={"/add"}
        >
          <img src={icons.addIcon} alt="" />
          <p className="hidden md:block text-nowrap">Add Items</p>
        </NavLink>
        <NavLink
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l duration-300 ease-in-out transition-all`}
          to={"/list"}
        >
          <img src={icons.listItem} alt="" />
          <p className="hidden md:block text-nowrap">List Items</p>
        </NavLink>
        <NavLink
          className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l duration-300 ease-in-out transition-all`}
          to={"/orders"}
        >
          <img src={icons.cart} alt="" />
          <p className="hidden md:block text-nowrap">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
