import { Modal } from "antd";
import { useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const AntdModal = () => {
    const [ antdModalOpen, setAntdModalOpen ] = useState(false);

    const antdModalOkEvent = () => { setAntdModalOpen(false); }
    const antdModalCancelEvent = () => { setAntdModalOpen(false); }

    const antdModalConfirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '광고 등록을 진행하시겠습니까?',
            okText: '등록',
            cancelText: '취소',
          });
    }
    
    return (
        <>
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD MODAL 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
            <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-모달</h2>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={()=> setAntdModalOpen(true)}>기본</button>
                        <Modal title="가장 기본적인 모달 형태" visible={antdModalOpen} onOk={antdModalOkEvent} onCancel={antdModalCancelEvent}>
                            <p>여기에</p>
                            <p>글을</p>
                            <p>쓰면 됩니당</p>
                        </Modal>

                        <button type="button" className="btn btn-primary" onClick={antdModalConfirm}>모달 - 컨펌</button>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default AntdModal;
