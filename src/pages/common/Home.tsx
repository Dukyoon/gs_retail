const Home = () => {
    return (
        <>
        <div className="content-header">
            <div className="box-tit">
                <h2 className="fz-36 fc-1 fw-bold">펀딩 준비</h2>
            </div>
        </div>
        <div className="comp-tab">
            <a className="tab selected">
                <span className="tab-item">전체</span>
                <span className="badge">5,321</span>
            </a>
            <a className="tab">
                <span className="tab-item">공지</span>
                <span className="badge">5,321</span>
            </a>
            <a className="tab">
                <span className="tab-item">이벤트</span>
                <span className="badge">5,321</span>
            </a>
            <a className="tab">
                <span className="tab-item">보도자료</span>
                <span className="badge">5,321</span>
            </a>
        </div>
        <div className="content-body">
            <div className="box-tit">
                <h2 className="fz-36 fc-1 fw-bold">바디 준비</h2>
            </div>
        </div>
        </>
    )
}

export default Home;