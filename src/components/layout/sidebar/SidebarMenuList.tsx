
import { Link } from 'react-router-dom';
import { Menu } from './Sidebar';

interface MenuListProps {
    items: Menu[] | undefined;
    loading:boolean;
    activeMenu: String;
}

const SidebarMenuList = (props: MenuListProps) => {
    console.log("데이터 체크 :", props);
    
    
    return (
        <>
            {props.loading && props.items?.map((menu) => (
                
                menu.show === true ? 
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
