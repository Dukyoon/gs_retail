import { Dropdown, Menu, Space } from "antd";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const mouseHoverMenu = (
    <Menu
      items={[
        {key: '1',label: (<a target="_blank" rel="noopener noreferrer" href="https://www.naver.com">네이버 광고주</a>)},
        {key: '2',label: (<a target="_blank" rel="noopener noreferrer" href="#!">나 광고주 (연결 불가)</a>),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {key: '3',label: (<a target="_blank" rel="noopener noreferrer" href="#!">다 광고주 (연결 불가)</a>),
          disabled: true,
        },
        {key: '4',danger: true,label: '위험한 광고주',},
      ]}
    />
  );
  
const mouseClickMenu = (
    <Menu
    items={[
      {label: <a href="https://www.antgroup.com">네이버 광고주</a>,key: '0',},
      {label: <a href="https://www.aliyun.com">다음 광고주</a>,key: '1',},
      {type: 'divider',}, // 밑선 긋기
      {label: '밑선 긋기 테스트',key: '3',},
    ]}
  />
);

const AntdDropDown = () => {
    
    return (
        <>
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD 드롭다운 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">마우스 오버 시 적용되는 드롭다운</h2>
                    </div>
                    <div className="box-option">
                        <Dropdown overlay={mouseHoverMenu}>
                            <a href="#!" onClick={e => e.preventDefault()}>
                            <Space>Hover me<DownOutlined /></Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
                
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">클릭 시 적용되는 드롭다운</h2>
                    </div>
                    <div className="box-option">
                        <Dropdown overlay={mouseClickMenu} trigger={['click']}>
                            <a href="#!" onClick={e => e.preventDefault()}>
                            <Space>Click me<DownOutlined /></Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default AntdDropDown;
