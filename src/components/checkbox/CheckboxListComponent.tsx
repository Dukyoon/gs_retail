import { useEffect, useState } from 'react';
import Select, { Props } from 'react-select';
import RangePickerComponent from '../date/RangePickerComponent';
import SearchFilter from '../search/SearchFilter';
 
const CheckBoxListComponent = ({title, name, value, checkedItems, checkedItemHandler}) => {
    const [ isChecked, setIsChecked ] = useState(null);

    const onCheck = ({target}) => {
        checkedItemHandler(target.value, target.checked);
        setIsChecked(target.checked);
    }

    useEffect(() => {
        checkedItems.includes(value) ? setIsChecked(true) : setIsChecked(false);
        // if(chekcedItems.includes(data))   {
        //     setIsChecked(true)
        // }
    }, [checkedItems])

    const key = "inp-checkbox-"+title;
    return (
        <>
            <div className="comp-checkbox small">
                <input type="checkbox" id={key} value={value} checked={isChecked} onChange={ e => onCheck(e)} />
                <label htmlFor={key}>{title}</label>
            </div>
        </>
    )   
}

export default CheckBoxListComponent;