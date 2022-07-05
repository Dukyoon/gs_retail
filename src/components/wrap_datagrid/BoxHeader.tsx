/** 데이터 그리드 화면 내의 최상단 헤더 영역 및 데이터 그리드 상단 영역 */

interface BoxHeaderProps {
    title: string,
    titleDesc: string | null,
    csvBtnDisplay: boolean, //true 일 경우 csvDownloadEvent를 처리해준다.
    csvDownloadEvent: () => void,
}

const BoxHeader = (props: BoxHeaderProps) => {
    return (
        <>
            <div className="box-tit">
                <h2 className="fz-20 fc-1 fw-bold">{props.title}</h2>
                <h3 className="fz-12 fc-3"><i className="fz-12 fc-5">*</i>{props.titleDesc}</h3>
            </div>
            {props.csvBtnDisplay === true ? 
                <div className="box-option">
                    <button type="button" className="btn btn-primary" onClick={props.csvDownloadEvent}>CSV 다운로드</button>
                </div>
                : null
            }
            
        </>
    )
}

export default BoxHeader;