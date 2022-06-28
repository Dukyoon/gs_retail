const Header = () => {
    return (
        <header className="header">{/*  Header : Start */}
            {/*  Logo : Start */}
            <h1 className="logo">
                <a href="/home"></a>
            </h1>
            {/*  Logo : End */}

            {/*  User-Info : Start */}
            <div className="user-info">
                {/*  Name : Start */}
                <div className="name">
                    <span className="fz-14 fc-1 fw-medium">
                        관리자명
                    </span>
                </div>
                {/*  Name : Start */}

                {/*  Notify : Start */}
                <a className="notify">
                    <i className="ico i-16 ico-notify"></i>
                    <span className="badge">99+</span>
                </a>
                {/*  Notify : End */}

                {/*  Biz-Money : Start */}
                <a className="biz-money">
                    <span className="fz-14 fc-1 fw-medium">비즈머니</span>
                    <span className="fz-14 fc-2">₩9,999,999</span>
                </a>
                {/*  Biz-Money : End */}

                {/*  Shadow : Start */}
                <div className="shadow comp-dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="ico i-24 ico-shadow"></i>
                        <span className="fz-14 fc-2 fw-medium">메이커 로그인</span>
            {/*                      <span className="fz-14 fc-5 fw-medium">메이커명</span> */}
                    </a>
                    <div className="dropdown-menu">
                        <div className="box-body">
                            {/*  Comp-Search : Start */}
                            <div className="input-group comp-search">
                                <div className="inner-input-group selected">
                                    <input type="text" className="tf-comm" placeholder="힌트 텍스트" />
                                    <i className="ico i-16 ico-search"></i>
                                    <i className="ico i-16 ico-delete"></i>
                                </div>
                                <div className="opt-selectbox">
                                    <ul className="scrollbar-inner">
                                        <li className="opt-menu selected">
                                            <p className="fc-1"><span className="txt-mark">옵션</span> 01</p>
                                        </li>
                                        <li className="opt-menu">
                                            <p className="fc-1"><span className="txt-mark">옵션</span> 02</p>
                                        </li>
                                        <li className="opt-menu">
                                            <p className="fc-1"><span className="txt-mark">옵션</span> 03</p>
                                        </li>
                                        <li className="opt-menu">
                                            <p className="fc-1"><span className="txt-mark">옵션</span> 04</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*  Comp-Search : End */}
                        </div>
                    </div>
                </div>
                {/*  Shadow : Start */}
            </div>
            {/*  User-Info : End */}
            {/*  Header : End */}</header>
    )

}

export default Header;