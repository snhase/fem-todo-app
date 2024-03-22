import { Task } from 'App';
import React , { ChangeEvent, KeyboardEvent, useState }from 'react';

interface Props {
  label: string;
  setTask: (data: Task) => void;
}


export function Input({label, setTask}: Props) {
  const id = label.replace(/ /gm, "");
  const [value, setValue] = useState("");


  const handleOnChange = (event : ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLElement> ) => {
    if(event.key === "Enter"){
      let taskList:Task[] = sessionStorage.getItem("toDoList")?JSON.parse(sessionStorage.getItem("toDoList")):[];
      let taskId = taskList.length+1;
      taskList.push({
        id:taskId,
        content:value,
        completed:false,
      });
      sessionStorage.setItem("toDoList", JSON.stringify(taskList));
      setValue("")
    }
  }
  
  return (
    <div className="mx-auto relative block w-1/2">
        <span className="absolute inset-y-0 left-0 flex items-center p-5">
          <svg className ="stroke-slate-200" height="50" width="50" xmlns="http://www.w3.org/2000/svg">
            <circle r="10" cx="20" cy="25" stroke-width="2" fill="none"/>
         </svg>
        </span>
        <input
          id={id}
          className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-4 pl-20 pr-5 shadow-sm text-xl focus:outline-none"
          placeholder={label}
          value={value}
          autoComplete="off"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
    </div>
  );
}
