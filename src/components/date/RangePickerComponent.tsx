import AntdDatePicker from 'antd/lib/date-picker';
import AntdLocale from 'antd/es/date-picker/locale/ko_KR';
// import 'antd/dist/antd.css';
import 'moment/locale/ko'; // 이거 무조건 들어가야 함
import moment from "moment";
import { Button, Row } from 'antd';

//OPTION : BUTTON_LIST(1이면 노출/0이면 미노출) / START_DATE / END_DATE / ETC(추후 필요시에 추가) 
//CHANGE : 부모 컴포넌트의 날짜를 변경한다.

//BUTTON_LIST : (순서대로) 

const buttonFns = [
    {name : "오늘", start : moment().subtract(0, 'd'), end : moment().subtract(0, 'd')},
    {name : "어제", start : moment().subtract(1, 'd'), end : moment().subtract(1, 'd')},
    {name : "이번주", start : moment().startOf('isoWeek'), end : moment().subtract(1, 'd')},
    {name : "저번주", start : moment().subtract(1, 'week').startOf('isoWeek'), end : moment().subtract(1, 'week').endOf('isoWeek')},
    {name : "최근 7일", start : moment().subtract(7, 'd'), end : moment().subtract(1, 'd')},
    {name : "이번 달", start : moment().startOf('month'), end : moment().subtract(1, 'd')},
    {name : "저번 달", start : moment().subtract(1, 'M').startOf('month'), end : moment().subtract(1, 'M').endOf('month')},
    {name : "최근 30일", start : moment().subtract(30, 'd'), end : moment().subtract(1, 'd')},
    {name : "최근 60일", start : moment().subtract(60, 'd'), end : moment().subtract(1, 'd')},
    {name : "최근 90일", start : moment().subtract(90, 'd'), end : moment().subtract(1, 'd')},
]

const RangePickerComponent = ({option, dateFn}) => {
    let diff = 0;
    const buttonListArray = option.buttonList.toString().split("");
    /** 날짜창 오픈 되었을 때의 아래 부분 표시 */
    const antdRangePickerFooter = () => {
        if(option.startDate === null || option.endDate === null){ return (<><p>날짜를 선택해주세요.</p></>) } 
        else {
            
            const start = moment(option.startDate);
            const end = moment(option.endDate);
            diff = end.diff(start, 'days');
            return (<><div>{start.format("YYYY-MM-DD")} ~ {end.format("YYYY-MM-DD")} ({diff}일간)</div></>)
        }
    }
    /** 날짜 변경 시 이벤트 */
    const antdDateRangePickerOnChange  = (dates) => {
        const startDate = moment(dates[0]);
        const endDate = moment(dates[1]);
        
        dateFn.startFn(startDate);
        dateFn.endFn(endDate);
        diff = endDate.diff(startDate, 'days');
    };
    return (
        <>
        <Row>
            
        {/* <!-- 기간 이동 버튼 - prev --> */}
        <button type="button" className="btn btn-prev"><i className="ico ico-arrow"></i></button>
        <div className="ant-input-range-cover">
            {buttonListArray.map((active, index) => {
                return active === "1" ? 
                <Button 
                    key={index} 
                    type="primary" danger 
                    onClick={()=> { 
                        dateFn.startFn(buttonFns[index].start); 
                        dateFn.endFn(buttonFns[index].end); 
                    }}
                >
                    {buttonFns[index].name}
                </Button>
                : null
            })}
                        
            <AntdDatePicker.RangePicker
                style={{ width: 300 }}
                locale={AntdLocale}
                value={[option.startDate, option.endDate]}
                placeholder={["조회 시작일", "조회 종료일"]}
                // ranges={{ 
                //     '오늘': [moment(), moment()],
                //     '어제': [moment().subtract(1, 'd'), moment().subtract(1, 'd')],
                //     '이번주': [moment().startOf('isoWeek'), moment().subtract(-6, 'd')],
                //     '저번주': [moment().subtract(1, 'week').startOf('isoWeek'), moment().subtract(1, 'week').endOf('isoWeek')],
                //     '최근 7일': [moment().subtract(7, 'd'), moment().subtract(1, 'd')],
                //     '최근 30일': [moment().subtract(30, 'd'), moment().subtract(1, 'd')],
                // }}
                //format={[customFormatE, customFormatS]}
                renderExtraFooter={antdRangePickerFooter} 
                onChange={antdDateRangePickerOnChange}
            />
             {/* <!-- 설정일 표기 --> */}
            <div className="box-setting-date">
                <span className="left-parenthesis">(</span>
                <span className="txt">최근 30일</span>
                <span className="right-parenthesis">)</span>
            </div>

        </div>
        {/* <!-- 기간 이동 버튼 - next --> */}
        <button type="button" className="btn btn-next"><i className="ico ico-arrow"></i></button>
        </Row>
        </>

    )   
}

export default RangePickerComponent;