import { Input } from './components/input.tsx';
import { Card } from './components/card.tsx';
import TaskList from './components/TaskList.tsx'
import React, { useEffect, useState } from 'react'

export interface ToDo {
  id?:number,
  content:string,
  completed:boolean
}

function App() {

  const [filterType, setFilterType] = useState("all");
  const [todoList, setToDoList] = useState<ToDo[]>(null);
  const filterClassNames = "px-2 hover:cursor-pointer";

  useEffect(()=>{
    if(!todoList){
      let taskList:ToDo[] = sessionStorage.getItem("toDoList")?JSON.parse(sessionStorage.getItem("toDoList")):[];
      setToDoList(taskList);
    }
    
  },[todoList]);

  return (
    <div className="mx-auto h-screen">
      <header className="h-1/3 bg-[url('./assets/images/bg-desktop-light.jpg')] bg-cover">
        <div className="mx-auto pt-16 flex justify-between w-1/3">
          <h1 className="uppercase text-5xl font-extrabold text-white"> T&nbsp;&nbsp;O&nbsp;&nbsp;D&nbsp;&nbsp;O</h1>
          <div className="w-1/3 h-14 bg-right bg-no-repeat bg-[url('./assets/images/icon-moon.svg')]"></div>
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
        <>
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
                <div className="flex capitalize">
                  <div 
                    className=
                    {filterType === "all"?
                    ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                    :
                    ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                    }
                    onClick={()=> setFilterType("all")}
                    >all</div>
                  <div 
                    className={filterType === "active"?
                    ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                    :
                    ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                    }
                    onClick={()=> setFilterType("active")}
                  >active</div>
                  <div 
                    className={filterType === "completed"?
                    ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                    :
                    ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                    }
                    onClick={()=> setFilterType("completed")}
                    >completed</div>
                  </div>
                <div className="capitalize hover:cursor-pointer hover:text-[hsl(235,19%,35%)]">clear completed</div>
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
