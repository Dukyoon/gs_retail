import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginLayout from '../components/layout/LoginLayout';
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
                    <Route path="*" element={<Error/>}></Route>
            </Route>
            
            <Route path="/common/login" element={<LoginLayout />}>
                <Route path="/common/login" element={<Login/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
export default MenuRouters;