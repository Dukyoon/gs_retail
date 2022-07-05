//기본 예제용
import React, { useCallback, useMemo, useState } from 'react';
import useFileDrop from '../components/useFileDrop';

  

const FileUpload = () => {
    const { inputRef, labelRef, files, isDragActive } = useFileDrop();
    const [searchText, setSearchText] = useState("");
    const onChangeText = useCallback((e) => {
        setSearchText(e.currentTarget.value);
        
    }, [searchText]);

    const onSubmitCheck = (e) => {
        e.preventDefault();
        console.log("파일 체크 시작.");
        console.log("검색어 : ", searchText);
        console.log("파일 : ", files);
    }
    return (
        <>
            <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">기본 파일 선택</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>드래그 앤 드랍 기능 제외. 일반 파일 업로드</h3>
                    </div>
                    <div className="box-option">
                        <form id="searchForm" onSubmit={onSubmitCheck}>
                        <input ref={inputRef} id="uploadFile" type="file" />
                        {/* <label ref={labelRef} htmlFor="upload">
                            {isDragActive ? <span>Drop the file!</span> : <span>Drag and drop the file.</span>}
                        </label> */}
                        <div className="input-group">
                            <div className="inner-input-group">
                                <input type="text" className="tf-comm" placeholder="검색어를 입력해주세요." onChange={onChangeText}/>
                                <i className="ico ico-delete"></i>
                            </div>
                        </div>
                        <div className="box-right">
                            <button type="submit" className="btn btn-tertiary-mint btn-ico"><i className="ico ico-filter"></i>조회 </button>   
                        </div>
                        </form>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">기본 파일 선택</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>기존 소스 재활용</h3>
                    </div>
                    <div className="comp-file-upload">
                        <input type="file" id="singleFile1" />
                        <i className="ico ico-file"></i>
                        <input type="text" className="tf-comm" placeholder="파일을 선택하세요." readOnly />
                        <label className="btn" htmlFor="singleFile1">
                            파일 선택
                        </label>
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}


export default FileUpload;
