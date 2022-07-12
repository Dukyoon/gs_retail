//기본 예제용
import React, { useCallback, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import useFileUpload from '../customHook/useFileUpload';

const FileUpload = () => {
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
    return (
        <>
            <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">기본 파일 선택</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>기존 소스 재활용</h3>
                    </div>
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
            </section>
            </div>
        </>
    )
}


export default FileUpload;
