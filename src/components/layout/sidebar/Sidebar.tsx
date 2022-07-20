import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SidebarDropDown from "./SideBarDropDown";
import SidebarMenuList from "./SidebarMenuList";
import SidebarNotification from "./SidebarNotification";
import logoImageFile from '../../../gsadp/images/logo.svg';
import SidebarNotice from "./SidebarNotice";
import SidebarUserInfo from "./SidebarUserInfo";

//"noImplicitAny": false 추가함.
export interface Menu {
    id: string;
    name: string;
    path: string;
    menuId: string;
    show: boolean;
    leaf: boolean;
    roleGroup: string;
    leafs: any;
}


const Sidebar = ({extendOption}) => {
    const menuList = [
        {id: "1", name: "숨김메뉴", path: "/hide", menuId: "", show: false, leaf: false, roleGroup: "ROLE_ADV", leafs: null},
        {id: "2", name: "배너광고 그룹 리포트", path: "/bannerAdGroupReport", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
        {id: "19", name: "커스텀 그룹 리포트", path: "/customGroupReport", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
        {id: "17", name: "USE_HOOK 조회", path: "/useSendTest", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},

        {id: "4", name: "컴포넌트 대체 예제", path: "", menuId: "", show: true, leaf: true, roleGroup: "ROLE_MGR", leafs: [
            {id: "5", name: "React-Select2", path: "/example/reactSelect2", menuId: "", show: false, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "10", name: "SweetAlert2", path: "/example/sweetAlert2", menuId: "", show: false, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "11", name: "ReactPluginTest", path: "/example/reactPluginTest", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "12", name: "AgGrid", path: "/example/agGrid", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "13", name: "ReactDatePicker", path: "/example/datePicker", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "14", name: "ReactDateRange", path: "/example/dateRange", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "15", name: "FileUpload", path: "/example/fileUpload", menuId: "", show: false, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "16", name: "CustomCall", path: "/example/customCall", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "18", name: "ReactCharts", path: "/example/reactChart", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            
        ]},
        {id: "100", name: "ant-design", path: "/example/antd/", menuId: "", show: true, leaf: true, roleGroup: "ROLE_MGR", leafs: [
            {id: "101", name: "드롭다운", path: "/example/antd/dropDown", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "102", name: "파일업로드", path: "/example/antd/fileUPload", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "103", name: "모달", path: "/example/antd/modal", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "104", name: "셀렉트박스", path: "/example/antd/selectBox", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "105", name: "툴팁", path: "/example/antd/tooltip", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},

        ]},

        {id: "7", name: "2뎁스메뉴-테스트", path: "", menuId: "", show: true, leaf: true, roleGroup: "ROLE_MGR", leafs: [
            {id: "8", name: "홈", path: "/home", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "9", name: "이동안됨", path: "/asdf", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null}
        ]},
    ]
    const pathName = useLocation().pathname;
    
    return (
        <aside className="sidebar">
            <a className="logo" href="#!">
                <img src={logoImageFile} alt="GS ADP 로고" />
            </a>
            {/* 광고주 드롭다운 메뉴 */}
            <SidebarDropDown />

            <ul className="sidebar-menu tree" data-widget="tree">
                <SidebarMenuList items={menuList} loading={true} activeMenu={pathName} extendValue={extendOption.extendValue}/>
            </ul>
            {/* 고정적으로 나오는 사이드바 하단의 메뉴은 강제 설정해준다. 추후에 다른 레이아웃도 쓴다면 컴포넌트화를 고려해보자. */}
            <div className="util-menu">
                <SidebarNotification />
                <SidebarNotice />
            </div>
            <div className="user-info">
                <SidebarUserInfo />
            </div>
            {/* 사이드바 open / close 처리 */}
            <a className="btn-sidebar" data-toggle="push-menu" role="button" href="#!" onClick={() => extendOption.changeFn(value => !value)}>
                <i className="ico"></i>
            </a>
        </aside>
    )
}

export default Sidebar;