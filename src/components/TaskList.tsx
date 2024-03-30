import React, { useMemo, useState } from 'react'
import { ToDo } from 'App';
import CheckIcon from '../assets/images/icon-check.svg'

interface Props {
    filterType?:string,
    toDoList?:ToDo[],
    setToDoList?: (value: ToDo[]) => void;
}

const filterTodo = (todoList:ToDo[], filterType: string) => {
    return (todoList.filter((todo) => {
      if(filterType === "all"){
        return true;
      } else if(filterType === "active"){
        return !todo.completed;
      } else if(filterType === "completed"){
        return todo.completed;
      }
    }));
}

const TaskList = ({ filterType, toDoList, setToDoList}:Props) => {
    const [showDelete, setShowDelete] = useState(false);
    const visibleToDo = useMemo(()=> filterTodo(toDoList,filterType),[toDoList,filterType]);

    const markToDoComplete = (task:ToDo) => {
        toDoList.forEach(t => {
            if(t.id === task.id){
                t.completed= !t.completed;
            }
        })
        setToDoList([...toDoList]);
        localStorage.setItem("toDoList",JSON.stringify(toDoList));
    }

    const deleteToDo = (task:ToDo) => {
        let updated:ToDo[] = toDoList.filter(t=> t.id !== task.id);
        setToDoList(updated);
        localStorage.setItem("toDoList",JSON.stringify(updated));
    }

    return(
        <>
        {
            visibleToDo && visibleToDo.length>0?
            visibleToDo.map(task =>{
            return(
                <div
                key={String(task.id)}
                className="relative block">
                    <span 
                        className="absolute inset-y-0 left-2 flex items-center p-5"
                        onClick={()=>{
                            markToDoComplete(task);
                        }}
                        >
                        {
                            task.completed? 
                            <div className="h-6 w-6 bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] rounded-full hover:cursor-pointer">
                                <img src={CheckIcon} className="h-25 w-25 p-2 absolute" alt="i"></img>             
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
                            "line-through block w-full border-b-2 border-slate-200 py-5 pl-20 text-[hsl(233,11%,84%)] first-letter:uppercase hover:cursor-pointer" 
                            :"block w-full border-b-2 border-slate-200 py-5 pl-20 text-[hsl(235,19%,35%)] first-letter:uppercase hover:cursor-pointer"
                        }
                        onMouseEnter={()=>{setShowDelete(true)}}
                        onMouseLeave={()=>{setShowDelete(false)}}
                        >
                            <span>{task.content}</span>
                            {
                                showDelete?
                                <span
                                    className="hover:cursor-pointer"
                                    onClick={()=>{deleteToDo(task)}}
                                    >
                                    <svg className="absolute inset-y-0 my-auto right-5 fill-[#494C6B] hover:fill-red-600" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                                        <path fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                                    </svg>
                                </span>
                                :<></>
                            }
                    </div>
                </div>                
            );})
            :
            <></>
        }
        </>

    )
}

export default TaskList