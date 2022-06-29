import { useState } from "react";
import { useLocation } from "react-router";
import SidebarMenuList from "./SidebarMenuList";

export interface Menu {
    id: string;
    name: string;
    path: string;
    menuId: string;
    show: boolean;
    leaf: boolean;
    leafs: any;
}


const Sidebar = () => {
    const menuList = [
        {id: "1", name: "숨김메뉴", path: "/hide", menuId: "", show: false, leaf: false, leafs: null},
        {id: "2", name: "배너광고 그룹 리포트", path: "/bannerAdGroupReport", menuId: "", show: true, leaf: false, leafs: null},
        {id: "3", name: "2뎁스메뉴", path: "", menuId: "", show: true, leaf: true, leafs: [
            {id: "4", name: "홈", path: "/home", menuId: "", show: true, leaf: false, leafs: null},
            {id: "5", name: "이동안됨", path: "/asdf", menuId: "", show: true, leaf: false, leafs: null}
        ]},
        {id: "6", name: "2뎁스메뉴22", path: "", menuId: "", show: true, leaf: true, leafs: [
            {id: "7", name: "이동안됨22", path: "/124124", menuId: "", show: true, leaf: false, leafs: null},
            {id: "8", name: "이동안됨33", path: "/124124235", menuId: "", show: true, leaf: false, leafs: null}
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