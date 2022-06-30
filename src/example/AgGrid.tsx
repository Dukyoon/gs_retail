//기본 예제용
import React, { useCallback, useMemo, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, ITooltipParams } from 'ag-grid-community';
import Swal from 'sweetalert2';

//AG-GRID : https://www.ag-grid.com/react-data-grid/getting-started/




const AgGrid = () => {
    const [gridRowData, setGridRowData] = useState([
        {make: "Toyota", model: "Celica", codeNo: 45789278, tooltipText: '툴팁 예시용 텍스트', actYn: false, price: 3500000, },
        {make: "Ford", model: "Mondeo",  codeNo: 456809456, tooltipText: '툴팁 예시용 텍스트', actYn: true, price: 3200000},
        {make: "Porsche", model: "Boxster", codeNo: 23048900, tooltipText: '툴팁 예시용 텍스트', actYn: true, price: 7200000 },
        {make: "KIA", model: "K5", codeNo: 23578901, tooltipText: '툴팁 예시용 텍스트', actYn: false, price: 7200000 }
    ]);
    
    const rowInfoButtonRenderer = (props: ICellRendererParams) => {
        const rowData = props.data;
        const buttonInCellClick = () => {
            Swal.fire({
                icon: 'success',
                title: '클릭한 버튼의 ROW 정보',
                html: `make : ${rowData.make}<br />Model : ${rowData.model}<br />codeNo: ${rowData.codeNo}<br />price : ${rowData.price}`,
            })
        };
    
        return (
            <button type="button" 
                className="btn btn-primary xsmall" 
                onClick={buttonInCellClick}
                style={{ height: 20, lineHeight: 0.5, marginBottom: 20}}
            >클릭한 로우의 데이터 보기</button>
        );
    };
 
    const rowInfoToggleRenderer = useCallback((props: ICellRendererParams) => {
        const rowData = props.data;
        const actYn = rowData.actYn;
        console.log(actYn);
        const toggleEvent = () => {
            const msg =`현재 상태 값이 ${actYn}이므로 이벤트 발생 시에는 반대인 ${!actYn}으로 이벤트 진행 후 업데이트 ㄱㄱ`;
            let updateRowData = [...gridRowData];
            console.log(updateRowData);
            Swal.fire(msg);
            //실제로는 서버에서 처리 후 데이터를 리턴 받던가 다른 방법으로 진행될 것이다. 일단 예제라서 이렇게 함
            setGridRowData(updateRowData.map((row:any) => {
                return rowData.codeNo === row.codeNo ? {...row, actYn : !actYn} : row;
            }));
        };
        //ID는 무조건 유니크한 값으로 지정하자..
        return (
            
            <div className="comp-switch">
            <input type="checkbox" id={rowData.codeNo} checked={rowData.actYn} onChange={toggleEvent}/>
            <label htmlFor={rowData.codeNo}>
                <i className="ico" />
            </label>
        </div>
        );
    }, [gridRowData]);

    const cellTooltipText = () => {
        return "간단한 설명을 넣어봅니다.";
    }
    const columnDefs = useMemo<ColDef[]>(
        () => [
            { headerName: '브랜드명', field: 'make' },
            { headerName: '모델명', field: 'model' },
            { headerName: '차량번호', field: 'codeNo'},
            { headerName: '가격', field: 'price'},
            { headerName: '헤더 툴팁 예제', field: 'tooltipText', headerTooltip:"헤더 툴팁툴팁"},
            { headerName: '컬럼 툴팁 예제', field: 'tooltipText', tooltipValueGetter: cellTooltipText},
            { headerName: '버튼 예제', field: 'rowInfoButton', cellRenderer: rowInfoButtonRenderer},
            { headername: '토글 예제', field: 'toggleButton', cellRenderer: rowInfoToggleRenderer},
            // cellRendererSelector: (params: ICellRendererParams) => {
            //     const toggleButton = {
            //       component: AgGridToogleFilter,
            //     };
            //     return toggleButton;
            // //cellRenderer: AgGridToogleFilter},
            // }
            
    ], [])
 
    const defalutColDef={
        sortable: true,
    }
    return (
        <>
            <div className="content-body">
                <div className="ag-theme-alpine" style={{height: 400, width: 1400}}>
                <AgGridReact
                    rowData={gridRowData}
                    columnDefs={columnDefs}
                    defaultColDef={defalutColDef}
                    tooltipShowDelay={1000}
                    tooltipHideDelay={2000}
                    enableBrowserTooltips={true}
                >
                </AgGridReact>
            </div>
       </div>
        </>
    )
}


export default AgGrid;
