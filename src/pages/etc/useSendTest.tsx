import { ColDef, GridReadyEvent } from 'ag-grid-community';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SearchFilter from '../../components/contentHeader/SearchFilter';
import ContentHeader from "../../components/layout/content/ContentHeader";
import BoxHeader from '../../components/wrap_datagrid/BoxHeader';
import DataGrid from '../../components/wrap_datagrid/DataGrid';
import useCall from '../../customHook/customCall';
import customCall from '../../customHook/customCall';


  
const UseSendTest = () => {
    /** 검색 관련 */
    const searchOption = [ {value: "comNo", label : "거래처번호"}, {value: "comName", label : "거래처명"}, {value: "groupName", label : "그룹명"} ];
    const [searchSelect, setSearchSelect] = useState("");
    const [searchText, setSearchText] = useState("");
    
    /** 검색 : 조회 기간 관련 */
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate ] = useState(null);

    const dateOption = {
        antdOption : {buttonList: 1110011101, startDate : startDate, endDate : endDate },
        dateFn : {startFn : setStartDate, endFn : setEndDate}
    }

    /** 데이터 관련 */
    const gridSearch =  (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const body = { searchSelect, searchText };
        
        useCall.post('/post/adReportGrid', body)
        .then((resp) => {
            setRowData(resp.data);
            setTotalRowData([{agGroupId: "합계 로우", adGroupName: "-", itemName: "-", kwdName: "-", basicDate: "-", reqCnt: 8, impCnt: 0, clickCnt: 0, adSpend: 100}]);
        })
        .catch((error) => {
            console.log(error);
        });
    }




    /** 그리드 관련 */
    const [rowData, setRowData] = useState<any[]>();
    
    const [totalRowData, setTotalRowData] = useState<any[]>();

    const columnDefs = useMemo<ColDef[]>(() => [
        { field: 'agGroupId', minWidth: 180 },
        { field: 'adGroupName', minWidth: 200 },
        { field: 'itemName', minWidth: 200 },
        { field: 'kwdName', minWidth: 150 },
        { field: 'basicDate', minWidth: 250 },
        { field: 'reqCnt' , minWidth: 250},
        { field: 'impCnt' },
        { field: 'clickCnt' },
        { field: 'adSpend' },
    ], []);

    return (
        <>
            <ContentHeader title={"USE_SEND 테스트"} />
            <div className="content-body">
                <section className="wrap-section wrap-datagrid">
                    {/* 최상단 헤더 영역 */}
                    <div className="box-header">
                        <BoxHeader title={"USE_SEND 테스트 결과"} titleDesc={"설명설명222222222222"} csvBtnDisplay={false} csvDownloadEvent={null} />
                        {/* <div className="box-tit">
                            <h2 className="fz-20 fc-1 fw-bold">{"그룹 리포트 조회"}</h2>
                            <h3 className="fz-12 fc-3"><i className="fz-12 fc-5">*</i>{"설명설명"}</h3>
                        </div> */}
                    </div>
                    {/* 조회 필터 영역 */}
                    <form id="searchForm" onSubmit={gridSearch}>
                    <SearchFilter 
                        searchOption={searchOption} 
                        dateOption={dateOption}
                        onChangeSelect={(e) => setSearchSelect(e.value)} 
                        onChangeText={(e) => setSearchText(e.currentTarget.value)}
                    />
                    </form>
                    {/* 데이터 그리드 영역 */}
                    <>
                        <DataGrid 
                            title={"그룹 리포트 그리드 내역 조회"}
                            //csvBtnDisplay={true}
                            //style={null}
                            headers={columnDefs} 
                            rowData={rowData}
                            //totalYn={true}
                            totalRowData={totalRowData}
                            pagination={false}
                            paginationSize={10}
                        />
                    </>
                </section>
            </div>
        </>
    )
}

export default UseSendTest;

function useSWR(arg0: string, fetcher: any): { data: any; error: any; } {
    throw new Error('Function not implemented.');
}
