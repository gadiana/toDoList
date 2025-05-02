import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaStar, FaSearch } from "react-icons/fa";
import { MdOutlineListAlt } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State for menu toggle
  const [newListName, setNewListName] = useState(""); // State for new list input
  const [lists, setLists] = useState([]); // State to store lists
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Load lists from localStorage when the component mounts
  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
    setLists(savedLists);
  }, []);

  // Function to handle adding a new list
  const addNewList = () => {
    if (newListName.trim() === "") return; // Don't add empty list

    const updatedLists = [...lists, { name: newListName, tasks: [] }];
    setLists(updatedLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedLists));
    setNewListName(""); // Clear the input field after adding the list
    setIsModalOpen(false); // Close the modal after adding the list
  };

  // Function to handle removing a list
  const removeList = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedLists));
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`lg:hidden fixed top-6 left-6 z-50 bg-gray-200 text-gray-700 p-3 rounded-full shadow-md transition-transform duration-300 hover:bg-gray-300 ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 transition-transform z-40 border-r-2 border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:translate-x-0 lg:w-64 lg:block`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">To Do</h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tasks Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3">TASKS</h3>
          <ul>
            <li>
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors ${
                    isActive ? "bg-gray-300 text-blue-600 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <IoChevronForwardOutline size={18} /> Upcoming
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/today"
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors ${
                    isActive ? "bg-gray-300 text-blue-600 font-semibold" : "text-gray-600"
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <BsListTask size={18} /> Today
                </span>
              </NavLink>
            </li>
            <li className="flex items-center gap-3 p-3 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <IoMdDoneAll size={18} /> Completed
            </li>
            <li className="flex items-center gap-3 p-3 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
              <FaStar size={18} /> Starred
            </li>
          </ul>
        </div>

        {/* Lists Section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">LISTS</h3>
          
          {/* Display existing lists */}
          <ul>
            {lists.map((list, index) => (
              <li key={index} className="flex items-center justify-between p-3 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md">
                <span className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-gray-500 rounded-full"></span> {list.name}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{list.tasks.length}</span>
                <button
                  onClick={() => removeList(index)}
                  className="text-red-500 hover:text-red-600 ml-2"
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          {/* Add New List Button */}
          <div className="mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 transition-all"
            >
              Add New List
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding New List */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Add New List</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="p-3 w-full border rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addNewList}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                Add List
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
