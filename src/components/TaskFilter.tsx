import React from "react";


const TaskFilter = ({filterType, setFilterType}) =>{
    const filterClassNames = "px-2 hover:cursor-pointer";

    return(
        <div className="p-5 text-center md:p-0 flex justify-center capitalize">
            <div 
                className=
                {filterType === "all"?
                ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                :
                ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                }
                onClick={()=> setFilterType("all")}>
                    all</div>
            <div 
                className={filterType === "active"?
                ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                :
                ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                }
                onClick={()=> setFilterType("active")}>
                    active</div>
            <div 
                className={filterType === "completed"?
                ["text-[hsla(220,98%,61%,1)]",filterClassNames].join(" ")
                :
                ["hover:text-[hsl(235,19%,35%)]", filterClassNames].join(" ")
                }
                onClick={()=> setFilterType("completed")}>
                    completed</div>
        </div>
    )
}

export default TaskFilter;