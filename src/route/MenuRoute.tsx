import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginLayout from '../components/layout/LoginLayout';
import AgGrid from '../example/AgGrid';
import AgGridGetPage from '../example/AgGridGetPage';
import AgGridPostPage from '../example/AgGridPostPage';
import AntdDropDown from '../example/antd/DropDown';
import AntdFileUpload from '../example/antd/FileUpload';
import AntdModal from '../example/antd/Modal';
import AntdSelectBox from '../example/antd/SelectBox';
import AntdTooltip from '../example/antd/Tooltip';
import CustomCall from '../example/CustomCall';
import FileUpload from '../example/FileUpload';
import ReactChart from '../example/ReactChart';
import ReactDatePicker from '../example/ReactDatePicker';
import ReactDatenRangePicker from '../example/ReactDateRangePicker';
import ReactPluginTest from '../example/ReactPluginTest';
import ReactSelect2 from '../example/ReactSelect2';
import SweetAlert2 from '../example/SweetAlert2';
import Home from '../pages/common/Home';
import Login from '../pages/common/Login';
import Error from '../pages/etc/Error';
import UseSendTest from '../pages/etc/useSendTest';
import CustomGroupReport from '../pages/report/bannerAd/customGroupReport';
import BannerAdGroupReport from '../pages/report/bannerAd/groupReport';

const MenuRouters = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate replace to="/home"/>}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/bannerAdGroupReport" element={<BannerAdGroupReport />}></Route>
                    <Route path="/customGroupReport" element={<CustomGroupReport />}></Route>
                    
                    <Route path="/useSendTest" element={<UseSendTest />}></Route>
                    <Route path="/example/reactSelect2" element={<ReactSelect2 />}></Route>
                    <Route path="/example/sweetAlert2" element={<SweetAlert2 />}></Route>
                    <Route path="/example/reactPluginTest" element={<ReactPluginTest />}></Route>
                    <Route path="/example/agGrid" element={<AgGrid />}></Route>
                    <Route path="/example/agGridGetPage" element={<AgGridGetPage />}></Route>
                    <Route path="/example/agGridPostPage" element={<AgGridPostPage />}></Route>
                    <Route path="/example/datePicker" element={<ReactDatePicker />}></Route>
                    <Route path="/example/dateRange" element={<ReactDatenRangePicker />}></Route>
                    <Route path="/example/fileUpload" element={<FileUpload />}></Route>
                    <Route path="/example/customCall" element={<CustomCall />}></Route>
                    <Route path="/example/reactChart" element={<ReactChart />}></Route>

                    {/* ANTD 예제 */}
                    <Route path="/example/antd/dropDown" element={<AntdDropDown />}></Route>
                    <Route path="/example/antd/fileUpload" element={<AntdFileUpload />}></Route>
                    <Route path="/example/antd/modal" element={<AntdModal />}></Route>
                    <Route path="/example/antd/selectBox" element={<AntdSelectBox />}></Route>
                    <Route path="/example/antd/tooltip" element={<AntdTooltip />}></Route>

                    <Route path="*" element={<Error/>}></Route>
            </Route>
            
            <Route path="/common/login" element={<LoginLayout />}>
                <Route path="/common/login" element={<Login/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
export default MenuRouters;