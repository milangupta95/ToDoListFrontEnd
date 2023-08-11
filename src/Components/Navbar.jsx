import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-gray-100 w-full h-12 p-2 flex items-center justify-between'>
        <div className='tracking-widest text-xl font-bold text-gray-600'>Task Manager</div>
        <div className='flex gap-x-2'>
            <Link className='p-2 rounded border-2 text-xl h-[80%] bg-gray-400 cursor-pointer' 
            to = '/tasks'>Tasks</Link>
            <Link 
            className='p-2 rounded border-2 text-xl h-[80%] bg-gray-400 cursor-pointer'
             to = '/addTask'>Add Tasks</Link>
        </div>
    </div>

  )
}

export default Navbar