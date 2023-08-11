import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import api from '../Utility';

function AddTaskForm(props) {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [days, setDays] = useState(0);
    const [loading,setLoading] = useState(false);
    const setTasks = props.setTasks;
    const daysChanger = (e) => {
        setDays(e.target.value);
    }
    const hourChanger = (e) => {
        setHours(e.target.value);
    }
    const minutesChanger = (e) => {
        setMinutes(e.target.value);
    }

    const secondChanger = (e) => {
        setSeconds(e.target.value);
    }

    const topicChanger = (e) => {
        setTopic(e.target.value);
    }

    const descriptionChanger = (e) => {
        setDescription(e.target.value);
    }

    const taskAdder = async () => {
        try {
            setLoading(true);
            const completionTime = days + ":" + hours + ":" + minutes + ":" + seconds;
            const res = await api.post("/createTask", {
                topic: topic,
                description: description,
                completionTime : completionTime
            });
            if (res) {
                if (res.status === 200) {
                    setTasks((tasks) => {
                        if(tasks !== null && tasks.length > 0) {
                            return [...tasks,res.data];
                        } else {
                            const newTask = [res.data];
                            return [...newTask];
                        }
                    })
                    window.alert("Task Added");
                } else {
                    console.log(res);
                }
                setLoading(false);
            }
        } catch (err) {
            window.alert(err.message);
            setLoading(false);
        }
    }

    return (
        <div className='p-2 w-[80%] items-center mx-auto'>
            <h1 className='text-4xl text-center'>Add a Task</h1>
            <form className='p-2 flex flex-col gap-y-2'>
                <TextField value={topic} onChange={topicChanger} id="outlined-basic" label="Topic" variant="outlined" />
                <TextField value={description}
                    onChange={descriptionChanger}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                />
                <div className='flex gap-x-2'>
                    <TextField value={days} onChange={daysChanger} InputProps={{ inputProps: { min: 0, max: 30 } }} variant='outlined' type='Number' label='DD' InputLabelProps={{
                        shrink: true,
                    }}></TextField>
                    <TextField InputLabelProps={{
                        shrink: true,
                    }} value={hours} onChange={hourChanger} InputProps={{ inputProps: { min: 0, max: 24 } }} variant='outlined' type='Number' label='HH'></TextField>
                    <TextField InputLabelProps={{
                        shrink: true,
                    }} value={minutes} onChange={minutesChanger} InputProps={{ inputProps: { min: 0, max: 59 } }} variant='outlined' type='Number' label='MM'></TextField>
                    <TextField InputLabelProps={{
                        shrink: true,
                    }} value={seconds} onChange={secondChanger} InputProps={{ inputProps: { min: 0, max: 59 } }} variant='outlined' type='Number' label='SS'></TextField>
                </div>
                <Button onClick={taskAdder} variant="outlined" disabled={loading}>{loading ? "Loading..." : "Add Task"}</Button>
            </form>
        </div>
    )
}

export default AddTaskForm