
import { Drawer } from 'antd';
import { useState } from 'react';


/** 사이드바 내의 공지(페이지로 이동하는지 기타 다른 처리를 할지 아직모름) */

const SidebarNotice = () => {
    
    return (
        <>
        <a className="util notice" href="#!">
            <i className="ico ico-32 ico-notice"></i>
            <span className="fz-16 fw-smbold">공지</span>
            <span className="badge-num">9</span>
        </a>
        </>
        
    )
}

export default SidebarNotice;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
