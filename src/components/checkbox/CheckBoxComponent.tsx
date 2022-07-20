import { useState } from 'react';
import Select, { Props } from 'react-select';
import RangePickerComponent from '../date/RangePickerComponent';
import SearchFilter from '../search/SearchFilter';
 
const CheckBoxComponent = ({checkboxOption, items, setItems}) => {
    //체크 클릭 햇을 경우
    const checkedItemHandler = (isChecked, value) => {
        console.log("이벤트 발현 체크");
        if(isChecked){ // 체크 했을 경우
            console.log("체크다");
            //setCheckedItems([...checkedItems, value])
            setItems([...items, value])
            console.log("체크 데이터 : =>", items);
        } else if(!isChecked && items.find(one => one === value)){ // 체크 해제했는데 items에 데이터가 남아있는 경우
            console.log("체크해제 했는데 데이터가 남아있당.");
            const filter = items.filter(one => one !== value)
            //setCheckedItems([...filter]);
            setItems([...filter]);
            console.log("체크 데이터222 : =>", items);
        }
    }
    //전체 선택
    const onCheckAll = (checked) => {
        if(checked){
            const array =  [];
            checkboxOption.options.forEach(checkboxDatas => array.push(checkboxDatas.value))
            //setCheckedItems(array);
            setItems(array);
        } else {
            //setCheckedItems([]);
            setItems([]);
        }

    }

    return (
        <>
             <div className="item-filter">
                <div className="filter-tit">
                    <p className="fz-12 fc-2">{checkboxOption.title}</p>
                </div>
                <div className="box-filter">
                    <div className="input-group">
                        {/* 체크박스는 이벤트 케이스가 많아 분리 시킴... */}
                        <div className="inner-input-group">
                            {checkboxOption.options.map((checkboxItems, checkBoxIndex) => {
                                const key = "inp-checkbox-"+checkBoxIndex;
                                return (
                                    <div className="comp-checkbox small">
                                        <input type="checkbox" id={key} name={checkboxOption.checkboxName} value={checkboxItems.value}
                                        onChange={e => {
                                            checkedItemHandler(e.target.checked, e.target.value)
                                        }} />
                                        <label htmlFor={key}>{checkboxItems.label}</label>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
}

export default CheckBoxComponent;