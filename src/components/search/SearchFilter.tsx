import Select, { Props } from 'react-select';
import RangePickerComponent from '../date/RangePickerComponent';
 
const SearchFilter = ({searchOption, dateOption, onChangeSelect, onChangeText}) => {
    return (
        <>
            <div className="wrap-filter">
                <div className="inner-filter">
                    <div className="box-left">
                        <div className="item-filter">
                            <div className="filter-tit">
                                <p className="fz-12 fc-2">검색 항목</p>
                            </div>
                            <div className="box-filter">
                                <Select id="searchSelect" className="default-select" classNamePrefix="tt" placeholder="검색 기준을 선택해주세요."
                                    isSearchable={false} options={searchOption} 
                                    styles={{container: provided => ({...provided, width: 250})}}
                                    onChange={onChangeSelect}
                                />
                            </div>
                        </div>
                        <div className="item-filter">
                            <div className="filter-tit">
                                <p className="fz-12 fc-2">검색어 입력</p>
                            </div>
                            <div className="box-filter">
                                <div className="input-group">
                                    <div className="inner-input-group">
                                        <input type="text" className="tf-comm" placeholder="검색어를 입력해주세요." onChange={onChangeText}/>
                                        <i className="ico ico-delete"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item-filter">
                            <div className="filter-tit">
                                <p className="fz-12 fc-2">조회기간</p>
                            </div>
                            <div className="box-filter">
                                <RangePickerComponent 
                                    option={dateOption.antdOption} 
                                    dateFn={dateOption.dateFn} 
                                    //changeFn={antdDateRangePickerOnChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="box-right">
                        <button type="submit" className="btn btn-tertiary-mint btn-ico"><i className="ico ico-filter"></i>필터 조회 </button>
                    </div>
                </div>
            </div>
        </>
    )   
}

export default SearchFilter;