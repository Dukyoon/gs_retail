import { useLocation } from "react-router";
import SidebarMenuList from "./SidebarMenuList";

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


const Sidebar = () => {
    const menuList = [
        {id: "1", name: "숨김메뉴", path: "/hide", menuId: "", show: false, leaf: false, roleGroup: "ROLE_ADV", leafs: null},
        {id: "2", name: "배너광고 그룹 리포트", path: "/bannerAdGroupReport", menuId: "", show: true, leaf: false, roleGroup: "ROLE_ADV", leafs: null},
        {id: "17", name: "USE_HOOK 데이터 조회", path: "/useSendTest", menuId: "", show: true, leaf: false, roleGroup: "ROLE_ADV", leafs: null},

        {id: "4", name: "컴포넌트 대체 예제", path: "", menuId: "", show: true, leaf: true, roleGroup: "ROLE_MGR", leafs: [
            {id: "5", name: "React-Select2", path: "/example/reactSelect2", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "10", name: "SweetAlert2", path: "/example/sweetAlert2", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "11", name: "ReactModal", path: "/example/reactModal", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "12", name: "AgGrid", path: "/example/agGrid", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "13", name: "ReactDatePicker", path: "/example/datePicker", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "14", name: "ReactDateRange", path: "/example/dateRange", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "15", name: "FileUpload", path: "/example/fileUpload", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "16", name: "CustomCall", path: "/example/customCall", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "18", name: "ReactCharts", path: "/example/reactChart", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            
        ]},
        {id: "7", name: "2뎁스메뉴-테스트", path: "", menuId: "", show: true, leaf: true, roleGroup: "ROLE_MGR", leafs: [
            {id: "8", name: "홈", path: "/home", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null},
            {id: "9", name: "이동안됨", path: "/asdf", menuId: "", show: true, leaf: false, roleGroup: "ROLE_MGR", leafs: null}
        ]},
        
    ]
    const pathName = useLocation().pathname;
    return (
        <aside className="lnb sidebar">
            <ul className="inner-lnb sidebar-menu">
                <SidebarMenuList items={menuList} loading={true} activeMenu={pathName}/>
            </ul>
        </aside>
    )
}

export default Sidebar;