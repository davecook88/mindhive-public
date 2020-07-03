import React, { useState } from "react";

const DropdownBox = ({currentSelection, setSelection}) => {
  if (!currentSelection) currentSelection = 7;
  const [isClosed, setClosed] = useState(true);
  const clickHandler = () => {
    console.log(currentSelection)
    setClosed(!isClosed);
  }
  const optionClickHandler = (e) => {
    const val = e.target.innerText;
    console.log(val);
    setSelection(val);
  }
  return (
    <div className='pointer dropdown-display' onClick={clickHandler}>
      {currentSelection}
      {isClosed ? null : (
      <ul  className="dropdown-options pointer shadow-center text-center">
        <li onClick={(e)=>optionClickHandler(e)}>
          7
        </li >
        <li onClick={(e)=>optionClickHandler(e)}>
          14
        </li>
        <li onClick={(e)=>optionClickHandler(e)}>
          28
        </li>
      </ul>
      )}
    </div>
  );
};
export default DropdownBox;