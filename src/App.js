import AddTaskForm from "./Components/AddTaskForm";
import AllTasks from "./Components/AllTasks";
import { useState, useEffect } from "react";
import api from "./Utility";
import Navbar from "./Components/Navbar";
import { Routes } from "react-router";
import { Route } from "react-router";
import React from "react";
function App() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        let res = await api.get("/getAllTask");
        if (res) {
          if (res.status === 200) {
            if (res.data.length === 0) {
              setErr("There is No Any Task Please Add");
            } else {
              console.log(res.data);
              setTasks(res.data);
            }
          } else {
            setErr("There is Some Error While Fetchng Data");
          }
        }
        setLoading(false);
      } catch (err) {
        setErr(err.message);
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path = "/addTask" element = {<AddTaskForm tasks={tasks} setTasks={setTasks} />}/>
        <Route path = '/tasks' element = {<AllTasks tasks={tasks} loading={loading} err={err} setTasks={setTasks} />}/>
      </Routes>

    </React.Fragment>
  );
}

export default App;
