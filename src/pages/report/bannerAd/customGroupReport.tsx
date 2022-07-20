import { ColDef } from 'ag-grid-community';
import { useMemo, useState } from 'react';
import CustomSearchFilter from '../../../components/search/CustomSelectFilter';
import ContentHeader from "../../../components/layout/content/ContentHeader";
import BoxHeader from '../../../components/wrap_datagrid/BoxHeader';
import DataGrid from '../../../components/wrap_datagrid/DataGrid';


const CustomGroupReport = () => {
    /** 그리드 관련 */
    const [rowData, setRowData] = useState<any[]>();
    const [totalRowData] = useState<any[]>();
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
        
        const body = {
            searchSelect01 : searchSelect01, 
            searchText01 : searchText01,
            searchSelect02 : searchSelect02, 
            searchText02 : searchText02,
            startDate : start,
            endDate : end,
            radioValue : searchRadio,
            checkboxValue : searchCheckbox,
        }
        console.log(body);
        setRowData([]);

        // axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
        // .then((resp) => resp.data)
        // .then((data: any[]) => setRowData(data.slice(0, 20)));

        //  //합계 데이터는 부모에서 만들어야할듯?
        // setTotalRowData([{athlete: "합계 로우", age: "-", year: "-", date: "-", sport: "-", gold: 8, silver: 0, bronze: 0, total: 100}]);
    }
    

    //-----------------------------------------------------------------------------------------------------------------------------//
    // 커트텀 서치 옵션 설정(각각 2개씩 + 날짜 없이)
    /** 검색 : 셀렉트박스 및 검색어 관련 */
    const [searchSelect01, setSearchSelect01] = useState("");
    const [searchSelect02, setSearchSelect02] = useState("");
    
    const [searchText01, setSearchText01] = useState("");
    const [searchText02, setSearchText02] = useState("");

    const [searchRadio, setSearchRadio] = useState("");
    const [searchCheckbox, setSearchCheckbox] = useState("");

    // 조회 필터의 각 항목 설정. type에 따라 셀렉트박스 / 텍스트 입력 박스 / 라디오 / 체크박스로 나뉨.
    const searchOptions = [
        {type : "selectBox", title : "타이틀01", placeholder : "검색 기준 선택01", size: 250, 
        options : [ {value: "comNo", label : "거래처번호"}, {value: "comName", label : "거래처명"}, {value: "groupName", label : "그룹명"}], 
        changeFn: setSearchSelect01 },
        
        {type: "textBox", title : "인풋타이틀01", placeholder : "검색어 입력 진행01", changeFn: setSearchText01 },
        
        {type : "selectBox", title : "타이틀02",  placeholder : "검색 기준 선택02", size: 300,
        options : [ {value: "comNo", label : "거래처번호22"}, {value: "comName", label : "거래처명22"}, {value: "groupName", label : "그룹명22"}], 
        changeFn: setSearchSelect02 },
        
        {type: "textBox", title : "인풋타이틀02", placeholder : "검색 기준 선택02", changeFn: setSearchText02 },
        
        {type: "radio", title : "라디오 조회", radioName : "adpRadio2",
        options : [ {value: "전시광고22", label : "전시광고3"}, {value: "배너광고22", label : "배너광고3"}, {value: "기타광고22", label : "기타광고3"}],
        changeFn: setSearchRadio },

        {type: "checkbox", title : "체크박스 조회", placeholder : "검색 기준 선택02", 
        options : [ { title: '전체 선택', value: '전체', label : '전체 선택'}, { title: '가이틀', value: '가벨류', label : '가라벨'},
        { title: '나이틀', value: '나벨류', label : '나라벨'},{ title: '다이틀', value: '다벨류', label : '다라벨'},
        { title: '라이틀', value: '라벨류', label : '라라벨'}],
        items: searchCheckbox,
        setItems: setSearchCheckbox },

    ]


    

    
    /** 검색 : 조회 기간 관련 */
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate ] = useState(null);

    const dateOption = {
        antdOption : {buttonList: 1110011101, startDate : startDate, endDate : endDate },
        dateFn : {startFn : setStartDate, endFn : setEndDate}
    }
    
    return (
        <>
            <ContentHeader title={"그룹 리포트"} />
            <div className="content-body">
                <section className="wrap-section wrap-datagrid">
                    {/* 최상단 헤더 영역 */}
                    <div className="box-header">
                        <BoxHeader title={"그룹 리포트 조회22"} titleDesc={"비록 css는 깨지지만 동작은 90% 이상 가능합니다.."} csvBtnDisplay={false} csvDownloadEvent={null} />
                        {/* <div className="box-tit">
                            <h2 className="fz-20 fc-1 fw-bold">{"그룹 리포트 조회"}</h2>
                            <h3 className="fz-12 fc-3"><i className="fz-12 fc-5">*</i>{"설명설명"}</h3>
                        </div> */}
                    </div>
                    {/* 조회 필터 영역 */}
                    <form id="searchForm" onSubmit={gridSearch}>
                        <CustomSearchFilter 
                            searchOptions={searchOptions} 
                            dateOption={dateOption} 
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

export default CustomGroupReport;