import { useState } from "react";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";
import classnames from 'classnames';

const Layout = () => {
    const [ sideExtend, setIsSideExtend] = useState(false);
    const sideExtendFn = () => setIsSideExtend(value => !value);
    console.log("LayOut sideExtend value is ", sideExtend);

    //sideExtend 값에 따라 li class에 menu-open이 붙어야 하는지 체크해야한다.
    const extendOption = { extendValue: sideExtend, changeFn: setIsSideExtend};
    return (
        <>
            {/* GS는 헤더가 없음.*/}
            {/* <Header />  */}
            <Sidebar extendOption ={extendOption} />
            <div className={classnames('content', { 'extend': sideExtend})}>
                <div className="content-header"></div>
                <div className="inner-content">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>

    )
    
}

export default Layout;