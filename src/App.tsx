import { Input } from './components/input.tsx';
import { Card } from './components/card.tsx';
import TaskList from './components/TaskList.tsx'
import React, { useEffect, useState } from 'react'
import IconMoon from './assets/images/icon-moon.svg'
import IconSun from './assets/images/icon-sun.svg'
import TaskFilter from './components/TaskFilter.tsx';

export interface ToDo {
  id?:number,
  content:string,
  completed:boolean
}

function App() {

  const [filterType, setFilterType] = useState("all");
  const [theme, setTheme] = useState(null);
  const [todoList, setToDoList] = useState<ToDo[]>(null);

  useEffect(()=>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme("dark");
      if(!('theme' in localStorage)){
        localStorage.setItem("theme","dark");
      }
    } else {
      setTheme("light");
    }
  },[])
  
  useEffect(()=>{
    if (theme === "dark") {
        document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },[theme])

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
  
  const toggleThemeSwitch = () =>{
    setTheme(theme === "dark"?"light":"dark");
    localStorage.theme = (theme === "dark"?"light":"dark");
  }

  return (
    <div className="mx-auto bg-veryLightGray dark:bg-veryDarkBlue">
      <header className="bg-cover bg-[url('./assets/images/bg-desktop-light.jpg')] dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
        <div className="pt-24 pb-24">
        <div className="w-4/5 md:w-1/2 lg:w-[38%] mx-auto flex justify-between items-center content-center">
          <h1 className="uppercase text-3xl  md:text-5xl font-extrabold text-white"> T&nbsp;&nbsp;O&nbsp;&nbsp;D&nbsp;&nbsp;O</h1>
          {
            theme === "dark"? 
            <img 
              className ="w-6 h-6 hover:cursor-pointer" 
              src={IconSun} 
              alt="theme switcher sun icon"
              onClick={toggleThemeSwitch} />
            :
            <img 
              className ="w-6 h-6 hover:cursor-pointer" 
              src={IconMoon} 
              alt="theme switcher moon icon"
              onClick={toggleThemeSwitch}
              />
          }
        </div>
        <div className="mx-auto mt-8">
        <Input
          label="Create a new todo..."
          toDoList={todoList}
          setToDoList={setToDoList}
           ></Input>
        </div>
        </div>
      </header>
      <main className="-translate-y-16 h-screen">
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
              <div className="flex justify-between p-5 text-darkGrayishBlue">
                <div>{todoList.filter(item=>!item.completed).length} items left</div>
                <div className="hidden md:flex capitalize">
                    <TaskFilter
                      filterType={filterType}
                      setFilterType={setFilterType}
                    />
                </div>
                <div 
                  className="text-right capitalize hover:cursor-pointer hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover"
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
        <div className="md:hidden my-5 py-5 text-darkGrayishBlue">
          <Card>
          <TaskFilter
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </Card>
        </div>
      </main>
      <footer className="bg-veryLightGray dark:bg-veryDarkDesaturatedBlue bottom-0 p-3 text-center font-semibold border-t-2 border-slate-200">
      Challenge by <a
            className="text-blue-800 hover:text-blue-900 hover:underline"
            href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW" 
            target="_blank" 
            rel="noopener noreferrer">Frontend Mentor</a>. Coded by <a href="https://github.com/snhase"
            className="text-blue-800 hover:text-blue-900 hover:underline"
            target="_blank" rel="noopener noreferrer">snhase</a>
      </footer>
    </div>
  );
}

export default App;
