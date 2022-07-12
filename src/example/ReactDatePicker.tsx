//REACT-DATE-PICKER 관련
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

//ANTD 관련 
import AntdDatePicker from 'antd/lib/date-picker';
import AntdLocale from 'antd/es/date-picker/locale/ko_KR';
import 'antd/dist/antd.css';
import 'moment/locale/ko'; // 이거 무조건 들어가야 함
import moment from "moment";
import { Button, Row, Space } from "antd";
import RangePickerComponent from "../components/contentHeader/RangePickerComponent";
const ReactDatePicker = () => {
    //const momentKorea = moment.locale('ko');

    const [startDate, setStartDate] = useState(new Date());

    //antd footer를 위한 데이터 설정
    const [antdStartDate, setAntdStartDate] = useState(null);
    const [antdEndDate, setAntdEndDate ] = useState(null);
    const [antdDiff, setAntdDiff] = useState(0);
    
    const antdDatepickerOnChange = (date, dateString) => {
        console.log("DatePickerChange Event..");
        console.log(date, dateString);
    };
    const antdDateRangePickerOnChange  = (dates) => {
        console.log(dates[0] + " / " + dates[1]);
        const startDate = moment(dates[0]);
        const endDate = moment(dates[1]);
        
        setAntdStartDate(startDate);
        setAntdEndDate(endDate);
        setAntdDiff(moment(endDate).diff(moment(startDate), 'days'));
    };
    
    const antdRangePickerFooter = () => {
       if(antdStartDate === null || antdEndDate === null){ return (<><p>날짜를 선택해주세요.</p></>) } 
       else {return (<><div>{antdStartDate.format("YYYY-MM-DD")} ~ {antdEndDate.format("YYYY-MM-DD")} ({antdDiff}일간)</div></>)}
    }

    //antd dateRangepicker 컴포넌트화를 위한 데이터 전송
    let antdOption = {buttonList: 1110011101, startDate : antdStartDate, endDate : antdEndDate };
    let dateFn = {startFn : setAntdStartDate, endFn : setAntdEndDate};
    return (
        <>
        <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">REACT-DATE-PICKER</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>별도의 플러그인을 사용한 데이트피커</h3>
                    </div>
                    <div className="box-option">
                        <DatePicker
                            locale={ko}
                            selected={startDate} 
                            onChange={(date:Date) => setStartDate(date)} 
                        />
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">REACT-DATE-RANGE-PICKER</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>위의 데이트피커를 조합하여 진행해야함. 별도의 예젠 없음. 아래 주소 참고</h3>
                    </div>
                    <div className="box-option">
                        <p>https://velog.io/@e_juhee/react-datepicker-datepicker-custom</p>
                    </div>
                </div>

                <div className="box-header">
                    <div className="box-tit">
                    <h2 className="fz-20 fc-1 fw-bold">ANTD DATEPICKER</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>ANTD 디자인에서 차용한 데이트피커</h3>
                    </div>
                    <div className="box-option">
                        <AntdDatePicker 
                            locale={AntdLocale}
                            placeholder="아프리카"
                            onChange={antdDatepickerOnChange}
                            showToday={false}
                        />
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                    <h2 className="fz-20 fc-1 fw-bold">ANTD DATE-RANGE-PICKER</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>ANTD 디자인에서 차용한 데이트 레인지 피커</h3>
                    </div>
                    <div className="box-option">
                    {/* 예쁘게 하려면 SPACE로 감싸야 하는데 이거 css 적으로 가능하려나.. */}
                    <Space>
                        <Row>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(0, 'd')); setAntdEndDate(moment().subtract(0, 'd')); 
                        }}>오늘</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(1, 'd')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>어제</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().startOf('isoWeek')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>이번주</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(1, 'week').startOf('isoWeek')); setAntdEndDate(moment().subtract(1, 'week').endOf('isoWeek')); 
                        }}>저번주</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(7, 'd')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>최근 7일</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().startOf('month')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>이번 달</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(1, 'M').startOf('month')); setAntdEndDate(moment().subtract(1, 'M').endOf('month')); 
                        }}>지난 달</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(30, 'd')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>최근 30일</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(60, 'd')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>최근 60일</Button>
                        <Button type="primary" danger onClick={()=> { setAntdStartDate(moment().subtract(90, 'd')); setAntdEndDate(moment().subtract(1, 'd')); 
                        }}>최근 90일</Button>

                        <AntdDatePicker.RangePicker
                            style={{ width: 300 }}
                            value={[antdStartDate, antdEndDate]}
                            ranges={{ 
                                '오늘': [moment(), moment()],
                                '어제': [moment().subtract(1, 'd'), moment().subtract(1, 'd')],
                                '이번주': [moment().startOf('isoWeek'), moment().subtract(-6, 'd')],
                                '저번주': [moment().subtract(1, 'week').startOf('isoWeek'), moment().subtract(1, 'week').endOf('isoWeek')],
                                '최근 7일': [moment().subtract(7, 'd'), moment().subtract(1, 'd')],
                                '최근 30일': [moment().subtract(30, 'd'), moment().subtract(1, 'd')],
                            }}
                            //format={[customFormatE, customFormatS]}
                            renderExtraFooter={antdRangePickerFooter} 
                            onChange={antdDateRangePickerOnChange}
                        />
                        </Row>
                        </Space>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                    <h2 className="fz-20 fc-1 fw-bold">ANTD DATE-RANGE-PICKER-COMPONENT</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>위와 동일한 기능을 가지는 컴포넌트</h3>
                    </div>
                    <div className="box-option">
                        <RangePickerComponent 
                            option={antdOption} 
                            dateFn={dateFn} 
                            //changeFn={antdDateRangePickerOnChange} 
                        />
                    </div>
                </div>

            </section>
        </div>
         
        </>
    )
}


export default ReactDatePicker;
