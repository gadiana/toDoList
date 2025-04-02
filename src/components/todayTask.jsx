import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import ToDoCard from "./toDoCard";
import NoList from "./noLIst";
import CreateList from "../modals/createList";

function ToDo() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const [taskList, setTaskList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const saveTask = (taskObj) => {
    const updatedTasks = [...taskList, taskObj];
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const updateTask = (index, updatedTask) => {
    let tempList = [...taskList];
    tempList[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const todayDate = new Date().toLocaleDateString();


  const todayTasks = taskList
    .filter((task) => new Date(task.Date).toLocaleDateString() === todayDate)
    .sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      if (dateA.getTime() === dateB.getTime()) {
        return new Date(`1970/01/01 ${a.Time}`).getTime() - new Date(`1970/01/01 ${b.Time}`).getTime();
      }
      return dateA - dateB;
    });

  const tomorrowTasks = taskList
    .filter((task) => new Date(task.Date).toLocaleDateString() === tomorrowDate.toLocaleDateString())
    .sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      if (dateA.getTime() === dateB.getTime()) {
        return new Date(`1970/01/01 ${a.Time}`).getTime() - new Date(`1970/01/01 ${b.Time}`).getTime();
      }
      return dateA - dateB;
    });


  return (
    <div
      className="flex-grow bg-white p-5 flex flex-col gap-4"
      style={{ width: "calc(100% - 16rem)" }}
    >
      <div className="container border rounded-sm p-5 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Today Task</h1>
        <button
          onClick={() => setShowModal(true)}
          className="grid place-items-center p-1 border rounded-sm cursor-pointer"
        >
          <IoAdd className="text-3xl" />
          <p className="text-xs">New Task</p>
        </button>
      </div>

      <div className="border rounded-sm p-5">
        <h1 className="text-2xl font-semibold">
          <span className="font-thin">{today}</span>
        </h1>
        <div className="max-h-100 h-92 mt-3 flex flex-gr gap-2 flex-wrap overflow-y-auto">
          {todayTasks.length > 0 ? (
            todayTasks.map((obj, index) => (
              <ToDoCard
                key={index}
                title={obj.Title}
                time={obj.Time}
                date={obj.Date}
                description={obj.Description}
                category={obj.Category}
                deleteTask={() => deleteTask(index)}
                index={index}
                updateTask={updateTask}
              />
            ))
          ) : (
            <p>No tasks for today.</p>
          )}
        </div>
      </div>
      {showModal && <CreateList save={saveTask} setShowModal={setShowModal} />}
    </div>
  );
}

export default ToDo;
