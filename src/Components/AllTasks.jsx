import React from 'react'

import TaskCard from './TaskCard';
function AllTasks(props) {
    let tasks = props.tasks;
    let loading = props.loading;
    let err = props.err;
    console.log(props);
    return (
        loading ? <div>Loading</div> :
            err ? <div className='py-4 rounded border-1 mt-2  border-red-400 text-xl text-center bg-red-200 w-[40%] mx-auto'> {err} </div> : (!tasks || tasks.length === 0) ?
                <div className='py-4 rounded border-1 mt-2  border-red-400 text-xl text-center bg-red-200 w-[40%] mx-auto'> No Tasks To Show Please Add Some Tasks </div>
                :
                <div className='flex flex-wrap gap-x-2 gap-y-2 pt-2 items-center justify-center'>
                    {tasks.map(task => {
                        return <TaskCard task={task} tasks={tasks} setTasks={props.setTasks}></TaskCard>;
                    })}
                </div>
    )
}

export default AllTasks