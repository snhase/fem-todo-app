import React from 'react'
import { ToDo } from 'App';


interface Props {
    task?:ToDo,
    editTask?: (value: string) => void;
}

const Task = ({task}:Props) =>{
    return(
        <div className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center p-5">
          <svg className ="stroke-slate-200 hover:stroke-purple-300 hover:cursor-pointer" height="50" width="50" xmlns="http://www.w3.org/2000/svg">
            <circle r="12" cx="20" cy="25" strokeWidth="2" fill="none"/>
         </svg>
        </span>
        <div className="block w-full border-b-2 border-slate-200 py-5 pl-20 text-xl">{task.content}</div>
    </div>
    )
}

export default Task