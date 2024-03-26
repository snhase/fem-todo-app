import { ToDo } from 'App';
import React , { ChangeEvent, KeyboardEvent, useState }from 'react';

interface Props {
  label: string;
  setToDoList: (data: ToDo[]) => void;
}


export function Input({label, setToDoList}: Props) {
  const id = label.replace(/ /gm, "");
  const [value, setValue] = useState("");


  const handleOnChange = (event : ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLElement> ) => {
    if(event.key === "Enter"){
      if(value === ""){
        return;
      }
      let taskList:ToDo[] = sessionStorage.getItem("toDoList")?JSON.parse(sessionStorage.getItem("toDoList")):[];
      let taskId = taskList.length+1;
      taskList.push({
        id:taskId,
        content:value,
        completed:false,
      });
      sessionStorage.setItem("toDoList", JSON.stringify(taskList));
      setToDoList(taskList);
      setValue("")
    }
  }
  
  return (
    <div className="mx-auto relative block w-1/3">
        <span className="absolute inset-y-0 left-2 flex items-center p-5">
          <div className="h-6 w-6 bg-white rounded-full border-2 border-slate-200"></div>
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
