
import { Link } from 'react-router-dom';
import { Menu } from './Sidebar';

interface MenuListProps {
    items: Menu[] | undefined;
    loading:boolean;
    activeMenu: String;
}

const SidebarMenuList = (props: MenuListProps) => {
    console.log("사이드바메뉴리스트 컴포넌트 - 실행 체크");
    //현재의 로컬스토리지의 상태값을 꺼내온다.
    const role = window.localStorage.getItem("role");
    console.log(role);
    console.log(typeof role);
    //이거 쓰려고 tsConfig.json strictNullChecks: false 추가. https://velog.io/@librarian/react-native-typescript-%EC%97%90%EB%9F%AC
    const jsonRole = JSON.parse(role);
    console.log(jsonRole);
    console.log(jsonRole.role);
    return (
        <>
            {props.loading && props.items?.map((menu) => (
                
                menu.show === true ? 
                    jsonRole.role.includes(menu.roleGroup) ? 
                    menu.leaf === true ? 
                    <li key={menu.id} className="one-depth treeview">
                        <a href="#!">
                            {menu.name}<i className="ico i-16 ico-arrow" />
                        </a>
                        <ul className="two-depth treeview-menu">
                            {menu.leafs?.map((leafMenu: any) => (
                                <li className={props.activeMenu === leafMenu.path ? "selected" : ""}>
                                    <Link to={leafMenu.path}>
                                        {leafMenu.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li> : 
                    <li key={menu.id} className={props.activeMenu === menu.path ? "one-depth treeview active" : "one-dpeth treeview" }>
                        <Link to={menu.path}>{menu.name}</Link>
                    </li>
                    : null
                : null
            ))}



                 {/* <li key={menu.path} className={menu.leaf === true ? "": ""}>
                     {menu.leaf === true ? 
                         <>
                             <a href="#!">{menu.name}<i className="ico i-16 ico-arrow" /></a><ul className="two-depth treeview-menu">
                                 {menu.leafs?.map((leafMenu: any) => (
                                     <li>
                                         <Link to={leafMenu.path}>
                                             {leafMenu.name}
                                         </Link>
                                     </li>
                                 ))}
                             </ul>
                         </>
                         :
                         <Link to={menu.path}>{menu.name}</Link>
                     }
                 </li> : null
                  ))} */}
       </> 
    )
}

export default SidebarMenuList;

function usetState(items: Menu[] | undefined): [any, any] {
    throw new Error('Function not implemented.');
}
