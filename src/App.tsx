import { Input } from './components/input.tsx';
import { Card } from './components/card.tsx';
import Task from './components/Task.tsx'
import React, { useEffect, useState } from 'react'

export interface ToDo {
  id?:Number,
  content:string,
  completed:boolean
}

function App() {

  const [todoList, setToDoList] = useState<ToDo[]>(null);
  const [todo, setToDo] = useState<ToDo>(null);

  useEffect(()=>{
    if(!todoList){
      let taskList:ToDo[] = sessionStorage.getItem("toDoList")?JSON.parse(sessionStorage.getItem("toDoList")):[];
      setToDoList(taskList);
    }
    
  },[todoList]);

  return (
    <div className="mx-auto h-screen">
      <header className="h-1/3 bg-[url('./assets/images/bg-desktop-light.jpg')] bg-cover">
        <div className="mx-auto pt-24 flex justify-between w-1/3">
          <h1 className="uppercase text-5xl font-extrabold text-white"> T&nbsp;&nbsp;O&nbsp;&nbsp;D&nbsp;&nbsp;O</h1>
          <div className="w-1/3 h-14 bg-right bg-no-repeat bg-[url('./assets/images/icon-moon.svg')]"></div>
        </div>
        <div className="mx-auto mt-4 xl:mt-4">
        <Input
          label="Create a new todo..."
          setToDoList={setToDoList}
           ></Input>
        </div>
      </header>
      <main className="-translate-y-20">
        <>
          {
            todoList && todoList.length>0?
            <Card>
            {
              todoList.map(task =>{
                return(
                  <Task
                  task={task}
                  ></Task>
                )
              })
            }
            <div className="relative">
            <div className="sticky">
              <div className="flex justify-between p-5 text-slate-500">
                <div>{todoList.length} items left</div>
                <div className="flex capitalize">
                  <div className="px-2 hover:font-bold hover:cursor-pointer hover:text-[hsla(220,98%,61%,1)]">all</div>
                  <div className="px-2 hover:font-bold hover:cursor-pointer hover:text-[hsla(220,98%,61%,1)]">active</div>
                  <div className="px-2 hover:font-bold hover:cursor-pointer hover:text-[hsla(220,98%,61%,1)]">completed</div>
                  </div>
                <div className="capitalize hover:font-semibold hover:cursor-pointer">clear completed</div>
              </div>
            </div>
            </div>
            </Card>
            :
            <></>
          }
        </>
      </main>
    </div>
  );
}

export default App;
