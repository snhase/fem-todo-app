import React, { useMemo, useState, DragEvent, useEffect} from 'react'
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
    const [showDelete, setShowDelete] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [dragFrom, setDragFrom] = useState(null);

    const visibleToDo = useMemo(() => filterTodo(toDoList,filterType),[toDoList,filterType]);

    const markToDoComplete = (task:ToDo) => {
        task.completed=!task.completed;
        let index = toDoList.findIndex(t => t.id === task.id);
        let rest = toDoList.filter(t => t.id !== task.id);
        setToDoList([
            ...rest.slice(0,index),
            task,
            ...rest.slice(index)
        ]);
        localStorage.setItem("toDoList",JSON.stringify(toDoList));
    }

    const deleteToDo = (task:ToDo) => {
        let updated:ToDo[] = toDoList.filter(t=> t.id !== task.id);
        setToDoList(updated);
        localStorage.setItem("toDoList",JSON.stringify(updated));
    }

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        setDragActive(true);
        let dragFrom = Number(event.currentTarget?.dataset.idx)
        setDragFrom(dragFrom);
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const newDragIndex = Number(event.currentTarget?.dataset.idx);
        const newDragPosition = toDoList.findIndex(todo => todo.id === visibleToDo[newDragIndex].id)
        if(dragFrom !== newDragPosition){
            let updatedList = toDoList;
            const taskDragged = visibleToDo[dragFrom]
            const rest = updatedList.filter((item:ToDo)=> item.id !== taskDragged.id)
            updatedList = [
                ...rest.slice(0,newDragPosition),
                taskDragged,
                ...rest.slice(newDragPosition)
            ]
            setToDoList(updatedList);
            localStorage.setItem("toDoList", JSON.stringify(updatedList));
            setDragActive(false);
            setDragFrom(null);
        } else{
            setDragActive(false);
            setDragFrom(null);
        }
    }

    return(
        <>
        {
            visibleToDo && visibleToDo.length>0?
            visibleToDo.map((task:ToDo, idx:number) =>{
            return(
                <div
                key={String(task.id)}
                className="relative block dark:bg-veryDarkDesaturatedBlue">
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
                                <div className='h-6 w-6 bg-white dark:bg-veryDarkDesaturatedBlue rounded-full border-2 border-slate-200 dark:border-veryDarkGrayishBlue2 hover:border-0'>
                                </div>
                            </div>
                        }
                    </span>
                    <div
                        className={`
                        "block w-full border-b-2 border-slate-200 dark:border-veryDarkGrayishBlue2 py-5 pl-20 first-letter:uppercase"
                        ${task.completed? "line-through text-lightGrayishBlue dark:text-darkGrayishBlue":"text-veryDarkGrayishBlue dark:text-lightGrayishBlue"}
                        ${ dragActive && (dragFrom === Number(idx) || dragFrom !== Number(idx)) ?"cursor-grabbing":"hover:cursor-pointer"}`}
                        data-idx={idx}
                        onMouseEnter={()=>{setShowDelete(task.id)}}
                        onMouseLeave={()=>{setShowDelete(null)}}
                        draggable="true"
                        onDragStart={handleDragStart}
                        onDragOver={(event => {
                            event.preventDefault();
                            event.dataTransfer.dropEffect = "move";
                        })}
                        onDrop={handleDrop}
                        >
                            <span
                            >{task.content}</span>
                            {
                                showDelete === task.id?
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