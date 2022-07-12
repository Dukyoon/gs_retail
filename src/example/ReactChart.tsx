import React from 'react'

//HighChart
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


//apexChart
//https://apexcharts.com/docs/installation/


//highchart 카테고리 및 데이터
const cateogries = [
    "2022.07.04","2022.07.05","2022.07.06","2022.07.07","2022.07.08","2022.07.09","2022.07.10",
]
const series01 = [1092,1116,1100,1093,1067,1070,1121]
const series02 = [7855,7645,7519,7582,7168,7231,7715]

//apexChart 카테고리 및 데이터
const apexSeries = [
    { name : "소진발생광고주수", data: [1092,1116,1100,1093,1067,1070,1121] }, 
    { name : "소진발생상품수", data: [7855,7645,7519,7582,7168,7231,7715] }
]
const apexChartOption = {
    chart: { height: 350, type: 'line',  },
    dataLabels: { enabled: false },
    stroke: { width: [5, 5], curve: 'straight', ashArray: [0, 0] },
    title: { text: '아펙스 차트 테스트', align: 'center' },
    legend: { tooltipHoverFormatter: function(val, opts) {return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '' }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
        '10 Jan', '11 Jan', '12 Jan'
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

const ReactChart = () => {
    const highChartBarBasicOption = {
        title: {
            text: 'highchart in react - bar chart'
        },
        series: [{
            data: [1000, 5000, 3000, 8914, 2348, 6896,1902,5690, 8289]
        }]
    }
    const highChartBarCustomOption = {
        //이하 기존의 옵션들 가져옴
        lang: { thousandsSep: ',', noData: "데이터 없음요. 체크바람요."},
        title: { text: '' },
	    colors: ['#fb4c4c', '#fb814c', '#fbc74c', '#fbf94c', '#96fb4c', '#4cfb7d', '#4cfbc3', '#4cedfb', '#4cbbfb', '#4c75fb', '#604cfb', '#a64cfb', '#ed4cfb', '#fb4cb7', '#fb4c6d'],
        // 오른쪽 하단 highchart 표기 미설정,
	    credits: { enabled: false },
        // 한 차트 내의 2개 이상의 데이터가 노출 될 경우 마우스 오버 시 같이 나오도록
        tooltip: { shared: true, crosshair: true, headerFormat: '<span style="font-weight: bold;">{point.key}</span><br/>', borderColor: '#CCC' },
        // 차트 하단의 데이터 표기 항목 배경
	    legend: { backgroundColor: 'white', borderColor: '#CCC', borderWidth: 1}, 

        chart: { type: 'line', spacingLeft: 0, spacingRight: 0, marginTop: 30, width:1200 },
        xAxis: { categories: cateogries},
        yAxis: [{ min: 0, title: { text: "소진발생광고주수".split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}}
        , { min: 0, title: { text: "소진발생상품수".split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}, opposite : true}],
        series: [{ name: "소진발생광고주수", yAxis:0, data: series01}, { name: "소진발생상품수", yAxis:1, data: series02}],

        
    }
    return (
        <>
        <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">HIGH-CHART</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i></h3>
                    </div>
                </div>
                <div className='box-body'>
                    <div className='tbl'>
                    <dl>
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fc-1">
                                    Line chart
                                </span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={highChartBarCustomOption}
                                        />
                                    </div>
                                </div>
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    </div>
                </div>
            </section>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">APEX-CHART</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i></h3>
                    </div>
                </div>
                <div className='box-body'>
                    <div className='tbl'>
                    <dl>
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fc-1">
                                    Line chart
                                </span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={highChartBarCustomOption}
                                        />
                                    </div>
                                </div>
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fc-1">
                                    Bar chart
                                </span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={highChartBarCustomOption}
                                        />
                                    </div>
                                </div>
                                <div className="input-group small">
                                    <div className="inner-input-group">
                                        
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    </div>
                </div>
            </section>
        </div>
         
        </>
    )
}


export default ReactChart;
