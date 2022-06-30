//기본 예제용
import React, { useState } from 'react';

import Modal from 'react-modal';

//리액트 모달 : https://www.npmjs.com/package/react-modal

const MODAL_STYLE = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 0,
      backgroundColor: "rgba(20, 20, 20, 0.9)"
    },
    content: {
      height: 300,
      margin: "100px auto"
    }
  };

const ReactModal = () => {
    const [ isDefaultModalOpen, setIsDefaultModalOpen] = useState(false);

    return (
        <>
        
        <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-모달(다이얼로그)</h2>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={()=> setIsDefaultModalOpen(true)}>기본</button>
                        {/* 모달 부분 */}
                        <Modal
                            isOpen={isDefaultModalOpen}
                            contentLabel={"PodoModal"}
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={() => setIsDefaultModalOpen(false)}
                            style={{
                                overlay: {
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    padding: 0,
                                    backgroundColor: "rgba(20, 20, 20, 0.9)"
                                  },
                                  content: {
                                    width: 400,
                                    height: 300,
                                    margin: "100px auto"
                                  }
                            }}
                        >
                        <div className="modal-body">
                            <h1>모달입니다.</h1>
                        </div>
                        </Modal>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default ReactModal;
