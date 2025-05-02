import React, { useState, useEffect } from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import { MdDelete, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import EditList from "../modals/editLIst";

function ToDoCard({ title, category, description, date, time, deleteTask, index, updateTask, isToday }) {
  const [showModal, setShowModal] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const storedStars = JSON.parse(localStorage.getItem("starredTasks")) || {};
    setIsStarred(storedStars[title] || false);

    const storedDone = JSON.parse(localStorage.getItem("doneTasks")) || {};
    setIsDone(storedDone[title] || false);
  }, [title]);

  const toggleStar = () => {
    const storedStars = JSON.parse(localStorage.getItem("starredTasks")) || {};
    storedStars[title] = !isStarred;
    localStorage.setItem("starredTasks", JSON.stringify(storedStars));
    setIsStarred(!isStarred);
  };

  const toggleDone = () => {
    const storedDone = JSON.parse(localStorage.getItem("doneTasks")) || {};
    storedDone[title] = !isDone;
    localStorage.setItem("doneTasks", JSON.stringify(storedDone));
    setIsDone(!isDone);
  };

  return (
<div
  className={`w-full min-h-20 h-20 bg-gray-200 border border-stone-300 rounded-xl px-4 py-2 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
    isDone ? "opacity-60" : ""
  } ${isToday ? "border-l-4 border-blue-500" : ""}`}
>
  {/* Left Section: Title + Info */}
  <div className="flex flex-col justify-between overflow-hidden">
    <p className={`text-sm font-semibold truncate ${isDone ? "line-through text-gray-500" : "text-stone-800"}`}>
      {title}
    </p>
    <p className="text-xs text-stone-500 truncate">
      {category} • {date} • {time}
    </p>
  </div>

  {/* Right Section: Actions */}
  <div className="flex items-center gap-3 ml-4">
    {/* Done toggle */}
    <span onClick={toggleDone} className="text-base cursor-pointer">
      {isDone ? (
        <MdCheckCircle className="text-green-500 hover:text-green-600 transition-all" />
      ) : (
        <MdRadioButtonUnchecked className="text-gray-500 hover:text-gray-600 transition-all" />
      )}
    </span>

    {/* Star toggle */}
    <span onClick={toggleStar} className="text-base cursor-pointer">
      {isStarred ? (
        <FaStar className="text-yellow-500 hover:text-yellow-600 transition-all" />
      ) : (
        <CiStar className="text-stone-500 hover:text-stone-600 transition-all" />
      )}
    </span>

    {/* Edit and Delete */}
    <FaEdit
      className="text-base cursor-pointer text-blue-500 hover:text-blue-600 transition-all"
      onClick={() => setShowModal(true)}
    />
    <MdDelete
      className="text-base cursor-pointer text-red-500 hover:text-red-600 transition-all"
      onClick={deleteTask}
    />
  </div>

  {/* Modal */}
  {showModal && (
    <EditList
      setShowModal={setShowModal}
      updateList={(updatedTask) => updateTask(index, updatedTask)}
      taskToEdit={{
        Title: title,
        Description: description,
        Category: category,
        Date: date,
        Time: time,
      }}
    />
  )}
</div>

  );
}

export default ToDoCard;
