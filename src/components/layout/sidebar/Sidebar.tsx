const Sidebar = () => {
    return (
        <aside className="lnb sidebar">
            <ul className="inner-lnb sidebar-menu">
                <li className="one-depth treeview active">
                    <a>새 광고 만들기<i className="ico i-16 ico-arrow"></i></a>
                    <ul className="two-depth treeview-menu">
                        <li className="selected">
                            <a>컨설팅 받고 만들기</a>
                        </li>
                        <li>
                            <a>직접 만들기</a>
                        </li>
                    </ul>
                </li>
                <li className="one-depth treeview">
                    <a>캠페인 관리</a>
                </li>
                <li className="one-depth treeview">
                    <a>리포트<i className="ico i-16 ico-arrow"></i></a>
                    <ul className="two-depth treeview-menu">
                        <li>
                            <a href="/bannerAdGroupReport">배너광고 그룹 리포트</a>
                        </li>
                        <li>
                            <a>캠페인</a>
                        </li>
                        <li>
                            <a>프로젝트</a>
                        </li>
                    </ul>
                </li>
                <li className="one-depth treeview">
                    <a>비즈머니<i className="ico i-16 ico-arrow"></i></a>
                    <ul className="two-depth treeview-menu">
                        <li>
                            <a>요약</a>
                        </li>
                        <li>
                            <a>비즈머니 충전</a>
                        </li>
                        <li>
                            <a>이용 내역</a>
                        </li>
                    </ul>
                </li>
                <li className="one-depth treeview">
                    <a>설정</a>
                </li>
                <li className="one-depth treeview">
                    <a>문의하기</a>
                </li>
                <li className="one-depth treeview">
                    <a>사용 가이드</a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;