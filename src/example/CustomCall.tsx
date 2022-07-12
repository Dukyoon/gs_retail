//기본 예제용
import React, { useCallback, useState } from 'react';
import useSend from '../customHook/useSend';


const CustomCall = () => {
    const [ sendUrl, setSendUrl] = useState("");
    const [ data, isLoading, error ] = useSend({url: sendUrl});

    const postTest = (type: string) => {
        if(type === "case01"){
            setSendUrl("/post/categorys");
             
                console.log("POST-CASE01 데이터");
                console.log(data);

             
        } else {
            setSendUrl("/post/items");
            console.log("POST-CASE02 데이터");
            console.log(data);
        }
    }
    const sendTest = useCallback => {
        console.log("들어옴");
            setSendUrl("/adREportGrid");
        
    }
    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">POST-CASE01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파라미터 없음</h3>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={() => postTest("case01")}>테스트</button>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">POST-CASE02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파라미터 존재</h3>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={() => postTest("case02")}>테스트</button>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">GET-CASE01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파라미터 없음</h3>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={sendTest}>테스트</button>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">POST-CASE02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파라미터 있음</h3>
                    </div>
                    <div className="box-option">
                        <button type="button" className="btn btn-primary" onClick={sendTest}>테스트</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CustomCall;
