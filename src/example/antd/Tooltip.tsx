import { Tooltip } from "antd";

const AntdTooltip = () => {
    return (
        <>
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD Tooltip 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">여러 버전으로 적용</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>테스트</h3>
                    </div>
                    <div className="box-option">
                    <Tooltip title="기본 툴팁입니당">
                        <span>툴팁 01</span>
                    </Tooltip>    
                    <Tooltip title="레드 툴팁입니당" color="red">
                        <span>툴팁 02</span>
                    </Tooltip>
                    <Tooltip placement="bottom" title="아래에서 나와용">
                        <span>툴팁 03</span>
                    </Tooltip>    
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default AntdTooltip;
