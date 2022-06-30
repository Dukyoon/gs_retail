import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


//스위트알럿2 : https://sweetalert2.github.io/#examples

const ReactDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
        
        <div className="content-body">
            <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
        </div>
        </>
    )
}


export default ReactDatePicker;
