import { ColDef, GridReadyEvent } from 'ag-grid-community';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import SearchFilter from '../../../components/contentHeader/SearchFilter';
import ContentHeader from "../../../components/layout/content/ContentHeader";
import BoxHeader from '../../../components/wrap_datagrid/BoxHeader';
import DataGrid from '../../../components/wrap_datagrid/DataGrid';


const BannerAdGroupReport = () => {
    /** 검색 : 셀렉트박스 및 검색어 관련 */
    const searchOption = [ {value: "comNo", label : "거래처번호"}, {value: "comName", label : "거래처명"}, {value: "groupName", label : "그룹명"} ];
    const [searchForm, setSearchForm] = useState({ searchSelect: "", searchText: "" });
    const [, setSearchSelect] = useState("");
    const [, setSearchText] = useState("");

    const onChangeSelect = useCallback((e) => {
        setSearchSelect(e.value);
        setSearchForm({...searchForm, searchSelect: e.value});
    }, [searchForm]);

    const onChangeText = useCallback((e) => {
        setSearchText(e.currentTarget.value);
        setSearchForm({...searchForm, searchText: e.currentTarget.value});
    }, [searchForm]);

    /** 검색 : 조회 기간 관련 */
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate ] = useState(null);

    const dateOption = {
        antdOption : {buttonList: 1110011101, startDate : startDate, endDate : endDate },
        dateFn : {startFn : setStartDate, endFn : setEndDate}
    }
    

    /** 그리드 관련 */
    const [rowData, setRowData] = useState<any[]>();
    const [totalRowData, setTotalRowData] = useState<any[]>();
    const columnDefs = useMemo<ColDef[]>(() => [
        { field: 'athlete', minWidth: 180 },
        { field: 'age', minWidth: 200 },
        { field: 'year', minWidth: 200 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 250 },
        { field: 'gold' , minWidth: 250},
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ], []);

    const gridSearch = (event) => {
        event.preventDefault();
        const start = startDate.format("YYYY.MM.DD");
        const end = endDate.format("YYYY.MM.DD");
        Swal.fire({
            title : `폼 정보`,
            text: '검색 항목 : ' + searchForm.searchSelect + " / 검색어 : " + searchForm.searchText + " / 조회 기간 : " + start + " ~ " + end
        });
        axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.data)
        .then((data: any[]) => setRowData(data.slice(0, 20)));

         //합계 데이터는 부모에서 만들어야할듯?
        setTotalRowData([{athlete: "합계 로우", age: "-", year: "-", date: "-", sport: "-", gold: 8, silver: 0, bronze: 0, total: 100}]);
    }
    
    return (
        <>
            <ContentHeader title={"그룹 리포트"} />
            <div className="content-body">
                <section className="wrap-section wrap-datagrid">
                    {/* 최상단 헤더 영역 */}
                    <div className="box-header">
                        <BoxHeader title={"그룹 리포트 조회"} titleDesc={"비록 css는 깨지지만 동작은 90% 이상 가능합니다.."} csvBtnDisplay={false} csvDownloadEvent={null} />
                        {/* <div className="box-tit">
                            <h2 className="fz-20 fc-1 fw-bold">{"그룹 리포트 조회"}</h2>
                            <h3 className="fz-12 fc-3"><i className="fz-12 fc-5">*</i>{"설명설명"}</h3>
                        </div> */}
                    </div>
                    {/* 조회 필터 영역 */}
                    <form id="searchForm" onSubmit={gridSearch}>
                        <SearchFilter searchOption={searchOption} dateOption={dateOption} onChangeSelect={onChangeSelect} onChangeText={onChangeText} />
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
                    style : default 추가/
totalyn : default 추가 /
                </section>
            </div>
        </>
    )
}

export default BannerAdGroupReport;