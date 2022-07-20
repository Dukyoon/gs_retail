import React from 'react';
import Select, { Props } from 'react-select';
import CheckBoxComponent from '../checkbox/CheckBoxComponent';
import RangePickerComponent from '../date/RangePickerComponent';
 
/** 원하는 수 만큼 생성하기 위해서 테스트 하는 조회 필터
 *  selectOptions 에는 원하는 수만큼의 select 관련 이벤트를 넣어줘야 한다
 *  textOptions 에는 원하는 수만큼의 text 관련 이벤트를 넣어줘야 한다
 */

const CustomSearchFilter = ({searchOptions, dateOption}) => {
    return (
        <>
            <div className="wrap-filter">
                <div className="inner-filter">
                    <div className="box-left">
                        {searchOptions.map((item, index) => {
                            if(item.type === "selectBox"){
                                return (
                                    <div className="item-filter">
                                        <div className="filter-tit">
                                            <p className="fz-12 fc-2">{item.title}</p>
                                        </div>
                                        <div className="box-filter">
                                            <Select id="searchSelect" className="default-select" classNamePrefix="tt" placeholder={item.placeholder}
                                            isSearchable={false} options={item.options} 
                                            styles={{container: provided => ({...provided, width: item.size})}}
                                            onChange={(e: any) => { item.changeFn(e.value) }}
                                        />
                                        </div>
                                    </div>    
                                );
                            } else if(item.type === "textBox"){
                                return (
                                    <div className="item-filter">
                                        <div className="filter-tit">
                                            <p className="fz-12 fc-2">{item.title}</p>
                                        </div>
                                        <div className="box-filter">
                                            <div className="input-group">
                                                <div className="inner-input-group">
                                                    <input type="text" className="tf-comm" placeholder={item.placeholder} onChange={(e: any) => {
                                                        item.changeFn(e.target.value);
                                                    }}/>
                                                    <i className="ico ico-delete"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if( item.type === "radio") {
                                return (
                                    <div className="item-filter">
                                        <div className="filter-tit">
                                            <p className="fz-12 fc-2">{item.title}</p>
                                        </div>
                                        <div className="box-filter">
                                            <div className="input-group">
                                                <div className="inner-input-group" onChange={(e: any) => { item.changeFn(e.target.value); }}>
                                                    {item.options.map((radioItems, radioIndex) => {
                                                        const key = "inp-radio-"+radioIndex;
                                                        return (
                                                            <div className="comp-radio small">
                                                                <input type="radio" id={key} name={item.radioName} value={radioItems.value} />
                                                                <label htmlFor={key}>{radioItems.label}</label>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else if( item.type === "checkbox") {
                                return (
                                    <CheckBoxComponent checkboxOption={item} items={item.items} setItems={item.setItems}></CheckBoxComponent>
                                    // <div className="item-filter">
                                    //     <div className="filter-tit">
                                    //         <p className="fz-12 fc-2">{item.title}</p>
                                    //     </div>
                                    //     <div className="box-filter">
                                    //         <div className="input-group">
                                    //             {/* 체크박스는 이벤트 케이스가 많아 분리 시킴... */}
                                    //             <div className="inner-input-group" onChange={(e: any) => { item.changeFn(e.target.value); }}>
                                    //                 {item.options.map((checkboxItems, checkBoxIndex) => {
                                    //                     const key = "inp-checkbox-"+checkBoxIndex;
                                    //                     return (
                                    //                         <div className="comp-checkbox small">
                                    //                             <input type="checkbox" id={key} name={item.checkboxName} value={checkboxItems.value} />
                                    //                             <label htmlFor={key}>{checkboxItems.label}</label>
                                    //                         </div>
                                    //                     )
                                    //                 })
                                    //                 }
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                )
                            } else {
                                return <></>
                            }
                            
                        })}
                        <div className="item-filter">
                            <div className="filter-tit">
                                <p className="fz-12 fc-2">조회기간</p>
                            </div>
                            <div className="box-filter">
                                <RangePickerComponent 
                                    option={dateOption.antdOption} 
                                    dateFn={dateOption.dateFn} 
                                    //changeFn={antdDateRangePickerOnChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="box-right">
                        <button type="submit" className="btn btn-tertiary-mint btn-ico"><i className="ico ico-filter"></i>필터 조회 </button>
                    </div>
                </div>
            </div>
        </>
    )   
}

export default CustomSearchFilter;