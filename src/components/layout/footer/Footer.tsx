const Footer = () => {
    return (
        <footer className="content-footer">{ /* Content-Footer : Start */}
            <ul className="company-info">
                <li>
                    <span className="fz-13">사업자등록번호 : 000-00-00000</span>
                </li>
                <li>
                    <span className="fz-13">대표 : 홍길동</span>
                </li>
                <li>
                    <span className="fz-13">전화번호 : 0000-0000</span>
                </li>
                <li>
                    <span className="fz-13">이메일 : XXXXXX@nhnad.com</span>
                </li>
                <li>
                    <span className="fz-13">주소 :  서울 강남구 대치동 945-2 5층</span>
                </li>
            </ul>
            <ul className="footer-menu">
                <li><a className="fz-13">이용 약관</a></li>
                <li><a className="fz-13">개인정보 처리 방침</a></li>
            </ul>
            { /* Content-Footer : End */}
            </footer>
    )
}

export default Footer;