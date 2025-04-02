import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/navigation'
import ToDo from './components/toDo'
import TodayTask from './components/todayTask'
import CompletedTask from './components/completedTask'

function App() {
  return (
    <>
    <Router>
      <div className="containerApp">
        <div className="flex w-full">
          <Navigation />
          <Routes>
            <Route path="/" element={<ToDo />} /> 
            <Route path="/upcoming" element={<ToDo />} /> 
            <Route path="/today" element={<TodayTask />} /> 
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
