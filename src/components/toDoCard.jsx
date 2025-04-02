import React, { useState, useEffect } from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import { MdDelete, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import EditList from "../modals/editLIst";

function ToDoCard({ title, category, description, date, time, deleteTask, index, updateTask }) {
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
    <div className={`w-60 max-w-60 min-w-40 border rounded-sm px-5 py-4 flex flex-col justify-between h-full cardContainer ${isDone ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-center title">
        <p className={`text-lg font-semibold ${isDone ? "line-through text-gray-500" : ""}`}>{title}</p>
      </div>
      <br />
      <div className="flex h-100 flex-col gap-2 details">
        <p className="text-sm text-gray-500">
          Description: <span className="font-medium text-gray-700">{description}</span>
        </p>
        <div className="mt-auto mb-5">
          <p className="text-sm text-gray-500">
            Category: <span className="font-medium text-gray-700">{category}</span>
          </p>
          <p className="text-sm text-gray-500">
            Date: <span className="font-medium text-gray-700">{date}</span>
          </p>
          <p className="text-sm text-gray-500">
            Time: <span className="font-medium text-gray-700">{time}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <span onClick={toggleDone} className="text-xl cursor-pointer">
          {isDone ? <MdCheckCircle className="text-green-500" /> : <MdRadioButtonUnchecked className="text-gray-500" />}
        </span>
        <span onClick={toggleStar} className="text-xl cursor-pointer">
          {isStarred ? <FaStar className="text-yellow-500" /> : <CiStar className="text-blue-500" />}
        </span>
        <FaEdit className="text-xl cursor-pointer text-blue-500" onClick={() => setShowModal(true)} />
        <MdDelete className="text-xl cursor-pointer text-red-500" onClick={deleteTask} />
      </div>

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