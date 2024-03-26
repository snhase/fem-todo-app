import React from 'react'
import { ToDo } from 'App';
import CheckIcon from '../assets/images/icon-check.svg'

interface Props {
    task?:ToDo,
    toDoList?:ToDo[],
    editTask?: (value: string) => void;
    setToDoList?: (value: ToDo[]) => void;
}

const Task = ({ task, toDoList, setToDoList}:Props) => {

    const markToDoComplete = () => {
        toDoList.forEach(t => {
            if(t.id === task.id){
                t.completed= !t.completed;
            }
        })
        setToDoList([...toDoList]);
        sessionStorage.setItem("toDoList",JSON.stringify(toDoList))
    }

    return(
        <div
            className="relative block">
        <span 
            className="absolute inset-y-0 left-2 flex items-center p-5"
            onClick={markToDoComplete}
            >
            {
                task.completed? 
                <div className="h-6 w-6 bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] rounded-full hover:cursor-pointer">
                    <img src={CheckIcon} className="h-25 w-25 p-2 absolute"></img>             
                </div>
                :
                <div className="p-0.5 hover:cursor-pointer hover:bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] rounded-full">
                    <div className='h-6 w-6 bg-white rounded-full border-2 border-slate-200 hover:border-0'>
                    </div>
                </div>
            }
            
        </span>
        <div 
            className={
                task.completed?
                ["line-through","block w-full border-b-2 border-slate-200 py-5 pl-20 text-xl"].join(" ") 
                :"block w-full border-b-2 border-slate-200 py-5 pl-20 text-xl hover:cursor-pointer"
            }
            >{task.content}</div>
    </div>
    )
}

export default Task