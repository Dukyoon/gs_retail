import React, { useState } from "react";
import { Calendar } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
//스위트알럿2 : https://sweetalert2.github.io/#examples

const ReactDatenRangePicker = () => {
    const changeDate = (date: String) => {
        console.log(date);
    }
      
    return (
        <Calendar
        date={new Date()}
        onChange={() => changeDate}
        />
    )
      
}


export default ReactDatenRangePicker;
