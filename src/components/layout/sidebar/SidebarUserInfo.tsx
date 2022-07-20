
import { Drawer } from 'antd';
import { useState } from 'react';


/** 사이드바 => 유저 정보 */

const SidebarUserInfo = () => {
    //사이드바의 알림 Drawer 기능 처리
    const [visibleInfo, setVisibleInfo] = useState(false);
    
    return (
        <>
        
            <div className="dropdown">
                <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#!">
                    <div className="box-left">
                        <i className="ico ico-user-thumb"></i>
                    </div>
                    <div className="box-right">
                        <div className="box-top">
                            <span className="fz-15 fc-10 txt-dot">kimyad</span>
                            <span className="fz-15 fc-10">님</span>
                        </div>
                        <p className="box-bottom">
                            <span className="fz-13 fc-3">소속회사명</span>
                            <i className="dot"></i>
                            <span className="fz-13 fc-3">광고주</span>
                        </p>
                    </div>
                </a>
                <div className="dropdown-menu">
                    <div className="box-top">
                        <div className="account-info">
                            <div className="box-info">
                                <div className="box-left">
                                    <i className="ico ico-user-thumb"></i>
                                </div>
                                <div className="box-right">
                                    <div className="inner-top">
                                        <span className="fz-16 fw-smbold fc-10 txt-dot">kimyadkimyadkimyad</span>
                                        <span className="fz-16 fw-smbold fc-10">님</span>
                                    </div>
                                    <div className="inner-bottom">
                                        <span className="fz-13 fc-3">11시11분</span>
                                        <i className="dot"></i>
                                        <span className="fz-13 fc-3">광고주</span>
                                    </div>
                                </div>
                            </div>
                            <div className="box-btn-area">
                                <div className="btn-group small">
                                    <button type="button" className="btn">내 정보</button>
                                    <i className="bar"></i>
                                    <button type="button" className="btn">로그아웃</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-bottom">
                        <div className="point-info">
                            <div className="point-total">
                                <i className="ico ico-point">P</i>
                                <span className="fz-18 fw-smbold fc-10">555,555,555</span>
                            </div>
                            <div className="point-info-detail">
                                <dl className="charged">
                                    <dt className="fz-12 fc-5">유료 포인트</dt>
                                    <dd className="fz-12 fc-5">555,455,555</dd>
                                </dl>
                                <dl className="free">
                                    <dt className="fz-12 fc-5">무료 포인트</dt>
                                    <dd className="fz-12 fc-5">100,000</dd>
                                </dl>
                            </div>
                            <div className="box-btn-area">
                                <div className="btn-group small">
                                    <button type="button" className="btn">결제 관리</button>
                                    <i className="bar"></i>
                                    <button type="button" className="btn">충전하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </> 
    )
}

export default SidebarUserInfo;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
