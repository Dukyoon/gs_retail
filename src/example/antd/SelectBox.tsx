import { Select } from "antd";
import { useState } from "react";
//셀렉트박스의 옵션 설정으로 직접 설정 해줘야함.
const { Option } = Select;

const AntdSelectBox = () => {
    //antd 셀렉트박스 관련
    const [ antdSelect01, setAntdSelect01] = useState("");
    const [ antdSelect02, setAntdSelect02] = useState("");
    const antdSelect01Change = (value: string) => {
        console.log("01 설정 :", value);
        setAntdSelect01(value);
    }
    const antdSelect02Change = (value: string) => {
        console.log("02 설정 :", value);
        setAntdSelect02(value);
    }
    const antdSelect02Search = (value: string) => {
        console.log('search:', value);
    }
    
    return (
        <>
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD SELECT BOX 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-셀렉트01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>제일 기본</h3>
                    </div>
                    <div className="box-option">
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={antdSelect01Change}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-셀렉트02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>01 + 검색 기능</h3>
                    </div>
                    <div className="box-option">
                        <Select
                            style={{ width: 120 }}
                            showSearch
                            placeholder="검색 기능 추가"
                            optionFilterProp="children"
                            onChange={antdSelect02Change}
                            onSearch={antdSelect02Search}
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                        <Option value="adId">광고ID</Option>
                        <Option value="adGroupId">광고그룹ID</Option>
                        <Option value="adGroupName">광고그룹명</Option>
                        <Option value="sellerItemNo">판매자상품번호</Option>
                        </Select>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default AntdSelectBox;
