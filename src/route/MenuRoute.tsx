import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginLayout from '../components/layout/LoginLayout';
import AgGrid from '../example/AgGrid';
import ReactDatePicker from '../example/ReactDatePicker';
import ReactDatenRangePicker from '../example/ReactDateRangePicker';
import ReactModal from '../example/ReactModal';
import ReactSelect2 from '../example/ReactSelect2';
import SweetAlert2 from '../example/SweetAlert2';
import Home from '../pages/common/Home';
import Login from '../pages/common/Login';
import Error from '../pages/etc/Error';
import BannerAdGroupReport from '../pages/report/bannerAd/groupReport';

const MenuRouters = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate replace to="/home"/>}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/bannerAdGroupReport" element={<BannerAdGroupReport />}></Route>
                    <Route path="/example/reactSelect2" element={<ReactSelect2 />}></Route>
                    <Route path="/example/sweetAlert2" element={<SweetAlert2 />}></Route>
                    <Route path="/example/reactModal" element={<ReactModal />}></Route>
                    <Route path="/example/agGrid" element={<AgGrid />}></Route>
                    <Route path="/example/datePicker" element={<ReactDatePicker />}></Route>
                    <Route path="/example/dateRange" element={<ReactDatenRangePicker />}></Route>
                    <Route path="*" element={<Error/>}></Route>
            </Route>
            
            <Route path="/common/login" element={<LoginLayout />}>
                <Route path="/common/login" element={<Login/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
export default MenuRouters;