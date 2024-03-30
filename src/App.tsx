import { Input } from './components/input.tsx';
import { Card } from './components/card.tsx';
import TaskList from './components/TaskList.tsx'
import React, { useEffect, useState } from 'react'
import IconMoon from './assets/images/icon-moon.svg'
import TaskFilter from './components/TaskFilter.tsx';

export interface ToDo {
  id?:number,
  content:string,
  completed:boolean
}

function App() {

  const [filterType, setFilterType] = useState("all");
  const [todoList, setToDoList] = useState<ToDo[]>(null);

  useEffect(()=>{
    if(!todoList){
      let taskList:ToDo[] = localStorage.getItem("toDoList")?JSON.parse(localStorage.getItem("toDoList")):[];
      setToDoList(taskList);
    }
    
  },[todoList]);

  const clearCompleted = () => {
    let updated:ToDo[] = todoList.filter(todo => !todo.completed);
    setToDoList(updated);
    localStorage.setItem("toDoList",JSON.stringify(updated));
}

  return (
    <div className="mx-auto h-screen">
      <header className="h-1/3 bg-[url('./assets/images/bg-desktop-light.jpg')] bg-cover">
        <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto pt-16 lg:pt-24 flex justify-between items-center content-center">
          <h1 className="uppercase text-3xl  md:text-5xl font-extrabold text-white"> T&nbsp;&nbsp;O&nbsp;&nbsp;D&nbsp;&nbsp;O</h1>
          <img className ="w-6 h-6" src={IconMoon} alt="theme switcher moon icon"/>
        </div>
        <div className="mx-auto mt-4 xl:mt-4">
        <Input
          label="Create a new todo..."
          toDoList={todoList}
          setToDoList={setToDoList}
           ></Input>
        </div>
      </header>
      <main className="-translate-y-16">
        <div>
          {
            todoList && todoList.length>0?
            <Card>
            <TaskList
              toDoList={todoList}
              setToDoList={setToDoList}
              filterType={filterType}
              />
            <div className="relative">
            <div className="sticky">
              <div className="flex justify-between p-5 text-[hsl(236,9%,61%)]">
                <div>{todoList.filter(item=>!item.completed).length} items left</div>
                <div className="hidden md:flex capitalize">
                    <TaskFilter
                      filterType={filterType}
                      setFilterType={setFilterType}
                    />
                </div>
                <div 
                  className="text-right capitalize hover:cursor-pointer hover:text-[hsl(235,19%,35%)]"
                  onClick={clearCompleted}
                  >clear completed</div>
              </div>
            </div>
            </div>
            </Card>
            :
            <></>
          }
        </div>
        <div className="md:hidden my-5 p-5">
          <Card>
          <TaskFilter
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
