import { Input } from './components/input.tsx';
import { Card } from './components/card.tsx';
import React, { useState } from 'react'

export interface Task {
  id?:Number,
  content:string,
  completed:boolean
}

function App() {

  const [taskList, setTaskList] = useState<Task[]>();
  const [task, setTask] = useState<Task>();

  return (
    <div className="mx-auto h-screen">
      <header className="h-1/3 bg-[url('./assets/images/bg-desktop-light.jpg')] bg-cover">
        <div className="mx-auto pt-16 flex justify-between w-1/2">
          <h1 className="uppercase text-5xl font-extrabold text-white"> T&nbsp;&nbsp;O&nbsp;&nbsp;D&nbsp;&nbsp;O</h1>
          <div className="w-1/3 h-14 bg-right bg-no-repeat bg-[url('./assets/images/icon-moon.svg')]"></div>
        </div>
        <div className="mx-auto mt-8">
        <Input
          label="Create a new todo..."
          setTask={setTask}
           ></Input>
        </div>
      </header>
      <main className="-translate-y-20">
        <Card>
          {
            taskList?
            <div></div>
            :
            <div> No Tasks Added</div>
          }
        </Card>
      </main>
    </div>
  );
}

export default App;
