import { Link } from 'react-router-dom';
import { Menu } from './Sidebar';

interface MenuListProps {
    items: Menu[] | undefined;
    loading:boolean;
    activeMenu: String;
    extendValue: Boolean;
}

const SidebarMenuList = (props: MenuListProps) => {
    //현재의 로컬스토리지의 상태값을 꺼내온다.
    //const role = window.localStorage.getItem("role");
    //이거 쓰려고 tsConfig.json strictNullChecks: false 추가. https://velog.io/@librarian/react-native-typescript-%EC%97%90%EB%9F%AC
    //let jsonRole = JSON.parse(role);
    
    //임시처리
    const role = { role: ["ROLE_ADV", "ROLE_MGR", "ROLE_LOGIN"] };
    window.localStorage.setItem("role", JSON.stringify(role));
    const jsonRole = JSON.parse(window.localStorage.getItem("role"));
    
    console.log(props);
    return (
        
        <>
            {props.loading && props.items?.map((menu) => (
                menu.show === true ? 
                    jsonRole.role.includes(menu.roleGroup) ? 
                    menu.leaf === true ? 
                    <li key={menu.id} className="one-depth treeview">
                        <a className="one-depth-title" href="#!">
                            <div className="box-left">
                                <i className="ico ico-32 ico-menu-03"></i>
                                <span className="fz-16">{menu.name}</span>
                            </div>
                            <div className="box-right">
                                <i className="ico ico-16 ico-arrow"></i>
                            </div>
                        </a>
                        <ul className="two-depth treeview-menu">
                            {menu.leafs?.map((leafMenu: any) => (
                                leafMenu.show === true ? 
                                <li key={leafMenu.id} className={(props.activeMenu === leafMenu.path) ? "two-depth-title selected" : "two-depth-title"}>
                                    <Link to={leafMenu.path}>
                                        {leafMenu.name}
                                    </Link>
                                </li>
                                : null
                            ))}
                        </ul>
                    </li> : 
                    //1뎁스의 메뉴 생성
                    <li key={menu.id+"_"+menu.path} className={props.activeMenu === menu.path ? "one-depth treeview active" : "one-depth treeview" }>
                        <Link to={menu.path} className="one-depth-title">
                            <div className="box-left">
                                <i className="ico ico-32 ico-menu-01"></i>
                                <span className="fz-16">{menu.name}</span>
                            </div>
                        </Link>
                    </li>
                    //롤 그룹이 안맞아서 표시 안함
                    : null
                //show 가 false 라서 표시 안함.
                : null
            ))}
       </> 
            
    )
}

export default SidebarMenuList;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
