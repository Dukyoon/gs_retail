/** 데이터 그리드 내의 헤더 영역 */

import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BoxHeader from "./BoxHeader";

interface DataGridProps {
    title: string,
    csvBtnDisplay: boolean,
    
    style: {width: any, height: any} | null,
    headers: ColDef[],
    rowData: any,
    totalYn: boolean | null,
    totalRowData: any,
    pagination: boolean,
    paginationSize: number | null,
}

const DataGrid = (props: DataGridProps) => {
    
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const gridRef = useRef<AgGridReact>(null);
    
    const dataGridStyle = {height: props.style.height, width: props.style.width};
   
    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);
    }

    const onPaginationChanged = useCallback(() => {
        console.log('onPaginationPageLoaded');
        // Workaround for bug in events order
        
        if (gridRef.current!.api!) {
          
        }
      }, []);

    const pinnedBottomRowData = useMemo<any[]>(() => {
        return props.totalRowData;
        //gridRef.current!.api.setPinnedBottomRowData(props.totalRowData);
    }, []);

    const csvDownload = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);
    
    useEffect(() => {
        if (gridApi) {
            gridApi!.sizeColumnsToFit();
            if(props.totalYn === true) gridRef.current!.api.setPinnedBottomRowData(props.totalRowData);
        }
    }, [gridApi, props]);  
    return (
        <>
            <div className="box-header">
                <BoxHeader title={"그룹 리포트 내역 조회"} titleDesc={"설명설명22222"} csvBtnDisplay={props.csvBtnDisplay} csvDownloadEvent={csvDownload} />
                {/* <div className="box-tit">
                    <h2 className="fz-20 fc-1 fw-bold">{"그룹 리포트 내역 조회"}</h2>
                    <h3 className="fz-12 fc-3"><i className="fz-12 fc-5">*</i>{"설명설명22222222"}</h3>
                </div>
                <div className="box-option">
                    <button type="button" className="btn btn-primary" onClick={csvDownload}>CSV 다운로드</button>
                </div> */}
            </div>
            <div className="box-body">
                <div style={dataGridStyle}>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={props.headers}
                        rowData={props.rowData}
                        rowHeight={50}
                        onGridReady={onGridReady}
                        pagination={props.pagination}
                        //suppressPaginationPanel={props.pagination}
                        onPaginationChanged={props.pagination === true ? onPaginationChanged : null}
                        paginationPageSize={props.pagination === true ? props.paginationSize : null}
                        pinnedBottomRowData={props.totalYn === true ? pinnedBottomRowData : null}
                    >
                    </AgGridReact>
                </div>
            </div>
        </>
    )
}

DataGrid.defaultProps = {
    style: {height: '600px', width: '100%' },
    csvBtnDisplay: false,
    totalYn: true,
}

export default DataGrid;