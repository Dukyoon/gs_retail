//기본 예제용
import React, { useCallback, useMemo, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import Swal from 'sweetalert2';
import qs from 'query-string';
import { useLocation } from 'react-router';
 
const AgGridPostPage = () => {
    //현재 url 파싱해서 파라미터 읽기
    const location = useLocation();
    console.log("현재 URL 정보 : ", location.search);
    const query = qs.parse(location.search);
    console.log("현재 URL의 파라미터 정보 : ", query);
    
    if(query.id === undefined || query.codeNo === undefined || query.model === undefined) {
        return (
            <>
                암것도 없음.
            </>
        )
        
    } else {

        return (
            <>
                <div className="content-body">
                    <section className="wrap-section wrap-tbl">
                        <div className="box-header">
                            <div className="box-tit">
                                <h2 className="fz-20 fc-1 fw-bold">파라미터 : id</h2>
                                <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>전달받은 파라미터 체크 01 : ID</h3>
                            </div>
                            <div className="box-option">
                                <h2 className="fz-20 fc-1 fw-bold">{query.id}</h2>
                            </div>
                        </div>
                        <div className="box-header">
                            <div className="box-tit">
                                <h2 className="fz-20 fc-1 fw-bold">파라미터 : CODE_NO</h2>
                                <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>전달받은 파라미터 체크 01 : 코드 번호</h3>
                            </div>
                            <div className="box-option">
                                <h2 className="fz-20 fc-1 fw-bold">{query.codeNo}</h2>
                            </div>
                        </div>
                        <div className="box-header">
                        <div className="box-tit">
                                <h2 className="fz-20 fc-1 fw-bold">파라미터 : MODEL</h2>
                                <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>전달받은 파라미터 체크 01 : 모델명</h3>
                            </div>
                            <div className="box-option">
                                <h2 className="fz-20 fc-1 fw-bold">{query.model}</h2>
                            </div>
                        </div>
                    </section>
                </div>
           
            </>
        )
    }
}


export default AgGridPostPage;
