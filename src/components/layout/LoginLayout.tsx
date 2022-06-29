import React, { Fragment } from 'react';
import {
  Outlet,
} from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

const LoginLayout = () => (
    <Fragment>
        <Header />
        <div className="content">
            <div className="inner-content">
                <div className="content-body">
                    {/* 추가 메뉴는 MenuRouters에... */}
                    {/* <MenuRouters/> */}
                    <Outlet/>
                </div>
                <footer className="content-footer">
                    <Footer/>
                </footer>
            </div>
        </div>
    </Fragment>
);
export default LoginLayout;
