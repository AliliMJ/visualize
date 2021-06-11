import React from "react";
function SidebarButton(props) {
  return (
    <div className={props.selected ? " bg-white delay-100 flex py-8 my-10 px-14 rounded-l-full" : " bg-primaryBlue flex delay-100 py-8 my-10 px-14 rounded-sm" }>
        <div className={props.selected ? "animate-bounce" : ""}>
          {props.icon}
        </div>
      <button className={props.selected ? "text-primaryBlue pl-6 text-2xl focus:outline-none" : "text-white pl-6 text-2xl focus:outline-none"} onClick={props.click}>
        {props.name}
      </button>
    </div>
  );
}

export default SidebarButton;
