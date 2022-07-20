//기본 예제용
import ReactSelect from 'react-select';
import { Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

//리액트 셀렉트박스 : https://react-select.com/home#getting-started
//고정 옵션으로 들어가는 경우 데이터
const fixedOption = [
    {value: "adGroupName", label : "광고그룹명"},
    {value: "itemNo", label : "상품번호"},
    {value: "advName", label : "광고주명"},
    
]

const ReactSelect2 = () => {
    const [ antdSelect, setAntdSelect] = useState("");
    const antdSelect01ValueChange = (value: string) => {
        setAntdSelect(value);
        console.log("설정 :", antdSelect);
    }
    return (
        <>
        
        <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>조회 필터에서 검색어 입력 시 검색 기준 선택 등에서 쓰였던 고정 옵션.</h3>
                    </div>
                    <div className="box-option">
                        {/* select 스타일이 가볍게 안 먹어서 div로 강제 추가  */}
                        <div className="select2" style={{width:300}}> 
                            <ReactSelect className="default-select" placeholder="검색 기준을 선택해주세요." isSearchable={false} options={fixedOption} />
                        </div>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>01 + 선택한 항목 지우기</h3>
                    </div>
                    <div className="box-option">
                        <ReactSelect className="clear-select" placeholder="검색 기준을 선택해주세요." isClearable={true} options={fixedOption} />
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트03</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>02 + 셀렉트 박스 내 검색 기능</h3>
                    </div>
                    <div className="box-option">
                        <div className="select2" style={{width:300}}> 
                            <ReactSelect className="clear-select" classNamePrefix='fixed' placeholder="검색을 통해 항목을 선택하세요." isClearable={true} isSearchable={true} options={fixedOption} />
                        </div>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-셀렉트01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>GS에서 사용하는 ANTD-SELECT 테스트</h3>
                    </div>
                    <div className="box-option">
                        <div className="select2" style={{width:300}}> 
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={antdSelect01ValueChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default ReactSelect2;
