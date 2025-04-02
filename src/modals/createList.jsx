import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function CreateList({ save, setShowModal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    selectedDate: "",
    selectedTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const taskObj = {
      Title: formData.title,
      Description: formData.description,
      Category: formData.category,
      Date: formData.selectedDate,
      Time: formData.selectedTime,
    };
    save(taskObj);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-50">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-md border border-gray-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create New List</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-900 text-xl"
          >
            ✖
          </button>
        </div>

        <form className="p-4" onSubmit={handleSave}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                placeholder="List Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                placeholder="Write description here"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Category
              </label>
              <select
                name="category"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Education">Education</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date
              </label>
              <input
                type="date"
                name="selectedDate"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={formData.selectedDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Time
              </label>
              <input
                type="time"
                name="selectedTime"
                className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                value={formData.selectedTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-gray-700 hover:bg-gray-800 rounded-lg"
            >
              <AiOutlinePlus className="me-1 -ms-1 w-5 h-5 inline" />
              Add to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateList;
