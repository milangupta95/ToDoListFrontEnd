import React from 'react'
import { IconButton,Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import api from '../Utility';
import { useState } from 'react';

function TaskCard(props) {
    const [updateState, setUpdateState] = useState(false);
    const [task,setTask] = useState(props.task);
    const tasks = props.tasks;
    const setTasks = props.setTasks;
    const [completed,setCompleted] = useState(task.status === "completed");
    const [topic,setTopic] = useState(task.topic);
    const [description,setDescription] = useState(task.description);
    const [completionTime,setCompletionTime] = useState(task.completionTime);
    const [markingLoader,setMarkingLoader] = useState(false);
    const [updateLoader,setUpdateLoader] = useState(false);
    const [deleteLoader,setDeleteLoader] = useState(false);

    function calculateTimeLeft(){
        const dateInFormat = task.completionTime.split(":");
        const time = (Number)(dateInFormat[0]) * 24 * 60 * 60 + (Number)(dateInFormat[1]) * 60 * 60
        + (Number)(dateInFormat[2]) * 60 + (Number)(dateInFormat[3]);
        console.log(time);
        const dateCreated = task.createdAt;
        console.log(dateCreated);
        const date = new Date((Number)(dateCreated[0]),(Number)(dateCreated[1]) - 1,(Number)(dateCreated[2]),dateCreated[3],dateCreated[4],dateCreated[5],0);
        const newDate = (new Date(date.getTime() + time * 1000));
        return newDate;
    }
    let deadlineObject = calculateTimeLeft();
    let deadline = (String)(deadlineObject);
    let isDeadLinePassed = (deadlineObject < (Date.now()));
    console.log(isDeadLinePassed);
    deadline = deadline.substring(4,deadline.indexOf("GMT+0530 (India Standard Time)"));
    const topicChanger = (e) => {
        setTopic(e.target.value);
    }

    const descriptionChanger = (e) => {
        setDescription(e.target.value);
    }

    const completionTimeChanger = (e) => {
        setCompletionTime(e.target.value);
    }
    const markAsCompleted = async () => {
        setMarkingLoader(true);
        try {
            let res = await api.put(`updateTask/${task.id}`,{status : "completed"});
            if(res) {
                if(res.status === 200) {
                    setCompleted(true);
                } else {
                    window.alert("Unable to mark as Completed Try Agin Later");
                }
                setMarkingLoader(false);
            }
        } catch(err) {
            setMarkingLoader(false);
            window.alert(err.message);
        }
    }

    const deleteItem = async () => {
        try {
            let res = await api.delete(`/deleteTask/${task.id}`);
            if(res) {
                if(res.status === 200) {
                    const newTask = tasks.filter(tsk => tsk.id !== task.id);
                    if(newTask.length > 0)setTasks([...newTask]);
                    else {
                        setTasks([]);
                    }
                } else {
                    window.alert("There Might be Some Error");
                }
            }
        } catch(err) {
            window.alert(err.message);
        }
    }

    const updateItem = async() => {
        setUpdateLoader(true);
        try {
            let res = await api.put(`updateTask/${task.id}`,{
                description : description,
                topic : topic,
                completionTime : completionTime
            });
            if(res) {
                if(res.status === 200) {
                    setTask((task) => {
                        return {
                            id : task.id,
                            description : description,
                            topic : topic,
                            completionTime : completionTime,
                            status : task.status,
                            createdAt : task.createdAt
                        }
                    });
                    setUpdateState(false);
                }
                setUpdateLoader(false);
            } 
        } catch(err) {
            setUpdateLoader(false);
            window.alert("There is Some Error While Updating");
        }
    }

    return (
        <div className=''>
            {
                updateState === false ?
                    <div className='border-2 w-[300px] h-[300px]'>
                        <div className='p-2 bg-gray-100 h-[20%] text border-b-2 flex rounded justify-between items-center'>
                            <div className='text-xl'>{task.topic}</div>
                            <div className='gap-x-2'>
                                <IconButton onClick={deleteItem} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton disabled = {completed} onClick = {() => setUpdateState(true)} aria-label="delete" size="large">
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='p-2 h-[60%] bg-gray-200'>
                            {task.description}
                        </div>
                        <div className='p-2 bg-gray-100 h-[20%] flex justify-between items-center'>
                            <div>
                                <p className={isDeadLinePassed ? 'text-red-800' : 'text-gray-900'}>{deadline}</p>
                            </div>
                            <Button onClick = {markAsCompleted} variant="contained" disableElevation disabled={markingLoader || completed}>
                                {completed ?  "Completed" : markingLoader ? "Loading..." : "Mark as Completed"}
                            </Button>
                        </div>
                    </div>
                    :
                    <div className='border-2 w-[300px] h-[300px]'>
                        <div className='bg-gray-100 h-[20%] text border-b-2 flex rounded justify-between items-center'>
                            <TextField onChange = {topicChanger} value = {topic} variant='filled' className='text-xl'></TextField>
                            <div className='gap-x-2'>
                                <IconButton onClick={() => setUpdateState(false)} aria-label="delete" size="large">
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='bg-gray-200'>
                            <TextField multiline onChange={descriptionChanger} value = {description} rows = {7} className='w-full h-full' variant='filled'></TextField>
                        </div>
                        <div className='bg-gray-100 h-[20%] flex justify-between items-center'>
                            <div>
                                <TextField value = {completionTime} variant='filled' onChange={completionTimeChanger}></TextField>
                            </div>
                            <Button variant="contained" onClick={updateItem} disableElevation disabled = {updateLoader}>
                                {updateLoader ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default TaskCard