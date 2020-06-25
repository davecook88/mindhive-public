import React, { useState } from 'react';

const SubNav = ({selectForm}) => {
  const formOptions = {
    'Initial Signup': 'initial',
    'AM Checklist': 'am_checklist',
    'PM Checklist': 'pm_checklist',
    'Add meal': 'meals',
  };
  const createFormButtons = (options) => {
    console.log(options);
    const formTitles = Object.keys(options);
    const titles =  formTitles.map((formOption,i) => (
      <li className="tab pointer light-grey-text" key={`formOption-${i}`} onClick={e => selectForm(options[formOption])}>
        {formOption}
      </li>

    ));
    return titles.length ? titles : null;
    

  };

  return (
    <div>
      <div class="nav-content dark-grey light-grey-text">
        <ul class="tabs tabs-transparent">
          {createFormButtons(formOptions)}
        </ul>
      </div>
    </div>
  )
}

export default SubNav;