//기본 예제용
import React, { useCallback, useState } from 'react';

import ReactModalPlugin from 'react-modal';
import { Modal } from 'antd';
import useFileUpload from '../customHook/useFileUpload';
import Swal from 'sweetalert2';
import ReactSelect from 'react-select';
import { Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

//리액트 모달 : https://www.npmjs.com/package/react-modal

const { Option } = Select

const ReactPluginTest = () => {
    //모달 플러그인 관련
    const [ isDefaultModalOpen, setIsDefaultModalOpen] = useState(false);
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
    //파일 업로드 관련
    //화면에서 하나의 인풋에 여러 파일을 올리는 경우(거의 없음) = files / 그 외의 싱글은 모두 file을 사용
    //const { inputRef, file } = useFileUpload({ multiple: false, accept: '.csv' });
    //파일 없어도 됨. 예제를 위해 작성(멀티플 정보 바꾸면서 테스트 진행 ㄱㄱ)
    const { inputRef, files, file } = useFileUpload({ multiple: false, accept: '.csv' });
    const [searchText, setSearchText] = useState("");
    const onChangeText = useCallback((e) => {
        setSearchText(e.currentTarget.value);
        
    }, [searchText]);

    const onSubmitCheck = (e) => {
        e.preventDefault();
        console.log("파일 체크 시작.");
        console.log("검색어 : ", searchText);
        console.log("복수 파일 : ", files);
        console.log("단일 파일 : ", file);

        Swal.fire({title : '폼 데이터 체크', html: '콘솔 창을 확인하세요.' });
    }

    //스위트 알럿 관련
    const defaultSwal = () => {
        Swal.fire('완전 아무것도 설정 안한 상태입니다.');
    }
    
    const confirmSwal = () => {
        Swal.fire({
            icon: 'warning',
            title: '광고를 비활성화 하시겠습니까',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: '저장',
            denyButtonText: '취소',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }
    
    const positionSwal = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '광고 등록 완료되었습니다.',
            showConfirmButton: false,
            timer: 1500
          })
    }
    const footerSwal = () => {
        Swal.fire({
            icon: 'error',
            title: '대출 금리가 높아요 어떡하죠?',
            text: '로또 당첨 되세요.',
            footer: '<a href="">어디 로또점에서 사야할까요?</a>'
          })
    }
    
    const animateSwal = () => {
        Swal.fire({
            icon: 'info',
            title: '이 기능은 애니메이트.css 추가가 필요합니다.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    
    const bigSwal = () => {
        Swal.fire({
            icon: 'question',
            width: '1200',
            title: '빅 사이즈 알럿',
            text: '빅빅빅 사이즈 알럿 ~ ',
        })
    }

    //셀렉트박스 관련
    const fixedOption = [
        {value: "adGroupName", label : "광고그룹명"},
        {value: "itemNo", label : "상품번호"},
        {value: "advName", label : "광고주명"},
        
    ]
    //antd 셀렉트박스 관련
    const [ antdSelect01, setAntdSelect01] = useState("");
    const [ antdSelect02, setAntdSelect02] = useState("");
    const antdSelect01Change = (value: string) => {
        setAntdSelect01(value);
        console.log("설정 :", antdSelect01);
    }
    const antdSelect02Change = (value: string) => {
        setAntdSelect02(value);
        console.log("설정 :", antdSelect02);
    }
    const antdSelect02Search = (value: string) => {
        console.log('search:', value);
    }
    return (
        <>
        
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">모달(다이얼로그) 관련 플러그인 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-모달(다이얼로그)</h2>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={()=> setIsDefaultModalOpen(true)}>기본</button>
                        {/* 모달 부분 */}
                        <ReactModalPlugin
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
                        </ReactModalPlugin>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-모달</h2>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={()=> setAntdModalOpen(true)}>기본</button>
                        <Modal title="Basic Modal" visible={antdModalOpen} onOk={antdModalOkEvent} onCancel={antdModalCancelEvent}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>

                        <button type="button" className="btn btn-primary" onClick={antdModalConfirm}>모달 - 컨펌</button>
                    </div>
                </div>
            </section>

            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">파일 업로드 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">기존과 비슷하게 테스트</h2>
                    </div>
                    <div className="box-option">
                    <form id="searchForm" onSubmit={onSubmitCheck}>
                        <div className='form-group'>
                            <div className="comp-file-upload">
                                <input ref={inputRef} id="uploadFile" type="file" />
                                <i className="ico ico-file"></i>
                                <input type="text" className="tf-comm" placeholder="파일을 선택하세요." id="uploadFileDesc" readOnly={true} />
                                <label className="btn" htmlFor="uploadFile">파일 선택</label>
                            </div>
                            <div className="input-group">
                                <div className="inner-input-group">
                                    <input type="text" className="tf-comm" placeholder="검색어를 입력해주세요." onChange={onChangeText}/>
                                    <i className="ico ico-delete"></i>
                                </div>
                            </div>
                            <div className="box-right">
                                <button type="submit" className="btn btn-tertiary-mint btn-ico"><i className="ico ico-filter"></i>폼 데이터 조회</button>   
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-파일 업로드</h2>
                    </div>
                    <div className="box-option">
                    <form id="searchForm" onSubmit={onSubmitCheck}>
                        <div className='form-group'>
                            <div className="comp-file-upload">
                                <input ref={inputRef} id="uploadFile" type="file" />
                                <i className="ico ico-file"></i>
                                <input type="text" className="tf-comm" placeholder="파일을 선택하세요." id="uploadFileDesc" readOnly={true} />
                                <label className="btn" htmlFor="uploadFile">파일 선택</label>
                            </div>
                            <div className="input-group">
                                <div className="inner-input-group">
                                    <input type="text" className="tf-comm" placeholder="검색어를 입력해주세요." onChange={onChangeText}/>
                                    <i className="ico ico-delete"></i>
                                </div>
                            </div>
                            <div className="box-right">
                                <button type="submit" className="btn btn-tertiary-mint btn-ico"><i className="ico ico-filter"></i>폼 데이터 조회</button>   
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
            
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">알럿 / 컨펌 등 테스트(플러그인 명 : SWEET_ALERT2)</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">테스트 시작</h2>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={defaultSwal}>완전 기본</button>
                        <button type="button" className="btn btn-primary-outline" onClick={confirmSwal}>컨펌</button>
                        <button type="button" className="btn btn-primary" onClick={footerSwal}>푸터 추가</button>
                        <button type="button" className="btn btn-primary-outline" onClick={positionSwal}>노출 위치 변경</button>
                        <button type="button" className="btn btn-primary" onClick={animateSwal}>노출 시 애니메이션 추가</button>
                        <button type="button" className="btn btn-primary-outline" onClick={bigSwal}>대왕 사이즈</button>
                    </div>
                </div>
            </section>
            
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">셀렉트 박스 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>조회 필터에서 검색어 입력 시 검색 기준 선택 등에서 쓰였던 고정 옵션.</h3>
                    </div>
                    <div className="box-option">
                        {/* select 스타일이 가볍게 안 먹어서 div로 강제 추가  */}
                        <div className="select2" style={{width:300}}> 
                            <ReactSelect className="default-select" placeholder="검색 기준을 선택해주세요." isSearchable={false} options={fixedOption} />
                        </div>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>01 + 선택한 항목 지우기</h3>
                    </div>
                    <div className="box-option">
                        <ReactSelect className="clear-select" placeholder="검색 기준을 선택해주세요." isClearable={true} options={fixedOption} />
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">리액트-셀렉트03</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>02 + 셀렉트 박스 내 검색 기능</h3>
                    </div>
                    <div className="box-option">
                        <div className="select2" style={{width:300}}> 
                            <ReactSelect className="clear-select" classNamePrefix='fixed' placeholder="검색을 통해 항목을 선택하세요." isClearable={true} isSearchable={true} options={fixedOption} />
                        </div>
                    </div>
                </div>
            </section>

            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD 셀렉트 박스 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-셀렉트01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>제일 기본</h3>
                    </div>
                    <div className="box-option">
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={antdSelect01Change}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">ANTD-셀렉트02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>01 + 검색 기능</h3>
                    </div>
                    <div className="box-option">
                        <Select
                            style={{ width: 120 }}
                            showSearch
                            placeholder="검색 기능 추가"
                            optionFilterProp="children"
                            onChange={antdSelect02Change}
                            onSearch={antdSelect02Search}
                            filterOption={(input, option) =>
                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                            }
                        >
                        <Option value="adId">광고ID</Option>
                        <Option value="adGroupId">광고그룹ID</Option>
                        <Option value="adGroupName">광고그룹명</Option>
                        <Option value="sellerItemNo">판매자상품번호</Option>
                        </Select>
                    </div>
                </div>
            </section>

            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD 툴팁 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">여러 버전으로 적용</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>테스트</h3>
                    </div>
                    <div className="box-option">
                    <Tooltip title="기본 툴팁입니당">
                        <span>툴팁 01</span>
                    </Tooltip>    
                    <Tooltip title="레드 툴팁입니당" color="red">
                        <span>툴팁 02</span>
                    </Tooltip>
                    <Tooltip placement="bottom" title="아래에서 나와용">
                        <span>툴팁 03</span>
                    </Tooltip>    
                    </div>
                </div>
            </section>

        </div>
        </>
    )
}


export default ReactPluginTest;
