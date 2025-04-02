import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaStar, FaSearch } from "react-icons/fa";
import { MdOutlineListAlt } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 bg-gray-200 text-gray-700 p-3 rounded-full shadow-md transition-transform duration-300 hover:bg-gray-300 ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-4 transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:translate-x-0 lg:w-64 lg:block`}
      >
        <h2 className="text-lg font-bold mb-4">To Do</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-8 py-2 w-full border rounded-md"
          />
        </div>

        {/* Tasks Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">TASKS</h3>
          <ul>
            <li>
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  `flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
                    isActive ? "bg-gray-300 font-bold" : "text-gray-600"
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <IoChevronForwardOutline /> Upcoming
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/today"
                className={({ isActive }) =>
                  `flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
                    isActive ? "bg-gray-300 font-bold" : "text-gray-600"
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <BsListTask /> Today
                </span>
              </NavLink>
            </li>
            <li className="flex items-center gap-2 p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <IoMdDoneAll /> Completed
            </li>
            <li className="flex items-center gap-2 p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <FaStar /> Starred
            </li>
          </ul>
        </div>

        {/* Lists Section */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-gray-500 mb-2">LISTS</h3>
          <ul>
            <li className="flex items-center justify-between p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span> Personal
              </span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">3</span>
            </li>
            <li className="flex items-center justify-between p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Work
              </span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">6</span>
            </li>
            <li className="flex items-center justify-between p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> List 1
              </span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">3</span>
            </li>
            <li className="flex items-center gap-2 p-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <MdOutlineListAlt /> Add New List
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navigation;
