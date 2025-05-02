import "../styles/toDo.css";
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
    const tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const updateTask = (index, updatedTask) => {
    const tempList = [...taskList];
    tempList[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const todayDate = new Date().toLocaleDateString();

  const filterAndSortTasks = (filterFn) => {
    return taskList
      .filter(filterFn)
      .sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        if (dateA.getTime() === dateB.getTime()) {
          return (
            new Date(`1970/01/01 ${a.Time}`).getTime() -
            new Date(`1970/01/01 ${b.Time}`).getTime()
          );
        }
        return dateA - dateB;
      });
  };

  const allTasks = filterAndSortTasks(() => true);

  const todayTasks = filterAndSortTasks(
    (task) => new Date(task.Date).toLocaleDateString() === todayDate
  );

  const tomorrowTasks = filterAndSortTasks(
    (task) =>
      new Date(task.Date).toLocaleDateString() ===
      tomorrowDate.toLocaleDateString()
  );

  const thisWeekTasks = filterAndSortTasks((task) => {
    const taskDate = new Date(task.Date);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  return (
    <div
      className="flex-grow bg-gradient-to-br from-stone-100 to-stone-200 p-6 flex flex-col gap-6 min-h-screen"
      style={{ width: "calc(100% - 16rem)" }}
    >
      {/* Header */}
      <div className="bg-white/70 border border-stone-300 rounded-2xl p-6 shadow-md flex justify-between items-center backdrop-blur-md">
        <h1 className="text-3xl font-bold text-stone-800">📋 Upcoming Tasks</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-stone-700 hover:bg-stone-800 text-white rounded-xl transition-all duration-200 shadow"
        >
          <IoAdd className="text-2xl" />
          <span className="text-sm font-semibold">New Task</span>
        </button>
      </div>

      {/* All Tasks Section */}
      <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-md">
        <h2 className="text-2xl font-semibold text-stone-800">All Tasks</h2>
        <div className="h-90 mt-4 flex flex-col gap-3 max-h-[32rem] overflow-y-auto pr-2">
          {allTasks.length > 0 ? (
            allTasks.map((obj, index) => (
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
            <p className="text-stone-500 italic">No tasks available.</p>
          )}
        </div>
      </div>

      {/* Today Section */}
      <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-md">
        <h2 className="text-2xl font-semibold text-stone-800">
          Today: <span className="font-light text-stone-600">{today}</span>
        </h2>
        <div className="max-h-80 h-80 mt-4 flex gap-3 overflow-x-auto scrollbar-hide">
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
            <p className="text-stone-500 italic">No tasks for today.</p>
          )}
        </div>
      </div>

      {/* Tomorrow and This Week Sections */}
      <div className="flex gap-6">
        <div className="w-1/2 bg-white border border-stone-300 rounded-2xl p-5 shadow-md">
          <h2 className="text-2xl font-semibold text-stone-800">Tomorrow:</h2>
          <div className="max-h-80 h-80 mt-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {tomorrowTasks.length > 0 ? (
              tomorrowTasks.map((obj, index) => (
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
              <NoList />
            )}
          </div>
        </div>

        <div className="w-1/2 bg-white border border-stone-300 rounded-2xl p-5 shadow-md">
          <h2 className="text-2xl font-semibold text-stone-800">This Week:</h2>
          <div className="max-h-80 h-80 mt-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {thisWeekTasks.length > 0 ? (
              thisWeekTasks.map((obj, index) => (
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
                  isToday={new Date(obj.Date).toLocaleDateString() === todayDate}
                />
              ))
            ) : (
              <p className="text-stone-500 italic">No tasks for this week.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && <CreateList save={saveTask} setShowModal={setShowModal} />}
    </div>
  );
}

export default ToDo;
