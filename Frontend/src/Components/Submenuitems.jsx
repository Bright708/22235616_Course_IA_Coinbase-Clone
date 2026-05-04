import React from 'react'

const Submenuitems = ({ submenulistname, caption,listitemicon }) => {
  
    
  return (
      <li className="  w-full max-w-[90%] text-[1.2rem] flex gap-2 items-center p-4 rounded-[25px]
       hover:bg-[#eef0f4] cursor-pointer" 
        
       >
      <img
        src={listitemicon}
        alt=""
          className="w-8 h-8 bg-[#eef0f4] p-1 rounded-full"
      />
      <div>
        <section>{submenulistname}</section>
          <span className="opacity-50 text-sm text-[1.1rem] ">{caption}</span>
      </div>
    </li>
  )
}

export default Submenuitems
