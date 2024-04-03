import React from "react";


const TaskFilter = ({filterType, setFilterType}) =>{
    const filterClassNames = "px-2 hover:cursor-pointer";
    const filterList = ["all", "active", "completed"]

    return(
        <div className="p-5 text-center md:p-0 flex justify-center capitalize">
            {
                filterList.map((filter)=>{
                    return(
                        <div
                        key={filter}
                        className=
                        {filter === filterType?
                        ["text-brightBlue",filterClassNames].join(" ")
                        :
                        ["hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover", filterClassNames].join(" ")
                        }
                        onClick={()=> setFilterType(filter)}>
                            {filter}</div>
                    )
                })
            }
        </div>
    )
}

export default TaskFilter;