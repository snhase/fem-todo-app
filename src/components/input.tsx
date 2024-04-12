import { ToDo } from 'App';
import React , { ChangeEvent, KeyboardEvent, useState }from 'react';

interface Props {
  label: string;
  handleOnKeyDown: (value: string, event:KeyboardEvent, callback: () => void) => void;
}


export function Input({label, handleOnKeyDown}: Props) {
  const id = label.replace(/ /gm, "");
  const [value, setValue] = useState("");

  const handleOnChange = (event : ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }
  
  return (
    <div className="w-4/5 md:w-1/2 lg:w-[38%] mx-auto relative block">
        <span className="absolute inset-y-0 left-2 flex items-center p-5">
          <div className="h-6 w-6 bg-white dark:bg-veryDarkDesaturatedBlue rounded-full border-2 border-slate-200 dark:border-veryDarkGrayishBlue2"></div>
        </span>
        <input
          id={id}
          className="block bg-white dark:bg-veryDarkDesaturatedBlue w-full border border-slate-300 dark:border-veryDarkDesaturatedBlue rounded-md py-5 pl-20 pr-5 shadow-sm text-[hsl(235,19%,35%)] dark:text-lightGrayishBlue focus:outline-none placeholder:text-[hsl(236,9%,61%)] dark:placeholder:text-veryDarkGrayishBlue1"
          placeholder={label}
          value={value}
          autoComplete="off"
          onChange={handleOnChange}
          onKeyDown={(event)=>{
            handleOnKeyDown(value, event, () => {
              setValue("")
            })
          }}
        />
    </div>
  );
}
