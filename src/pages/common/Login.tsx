import React, { Fragment } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';
// import qs from 'qs';
// import ApiUtil from '../../../api/ApiUtil';
// import alertify from '../../../wabiz/js/alertify.min.js';
// import { loginSuccess } from '../../layout/Header/Header';

export interface loginForm {
    memberId: string,
    password: string,
}
const Login = () => {
  // const navigate = useNavigate();

  // const { register, handleSubmit, getValues } = useForm<loginForm>();

  // const onSubmit = () => {
  //   const { memberId, password } = getValues();
  //   const axiosBody = {
  //     memberId,
  //     password,
  //   };
  //   // 임시 url
  //   ApiUtil.post<loginForm>('/api/common/login/doLogin', qs.stringify(axiosBody), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   }).then((response) => {
  //     if (response.data) {
  //       alertify.alert('로그인', '로그인성공', () => {
  //         navigate('/main');
  //         loginSuccess();
  //       });
  //       // 로그인 유저 정보를 localStorage 저장하여 로그인 상태 여부를 확인
  //       localStorage.setItem('user', JSON.stringify(response.data));
  //     }
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  // };
  return (
        <Fragment>
            <section className="wrap-section">
                <div className="inner-section">
                    <div className="box-header">
                        <h1 className="logo">

                        </h1>
                    </div>
                    <form onSubmit={() => false}>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        <div className="box-body">
                            <div className="form-group">
                                <div className="input-group large expand">
                                    <div className="inner-input-group">
                                        {/* <input type="text" id="memberId" {...register('memberId', { required: true, maxLength: 10 })} className="tf-comm" */}
                                        <input type="text" id="memberId" className="tf-comm"
                                               placeholder="아이디(E-mail) 입력"/>
                                            <i className="ico-delete"></i>
                                    </div>
                                    <p className="fz-12"><i className="ico"></i>체크 / 에러 문구 내용 영역</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group large expand">
                                    <div className="inner-input-group">
                                        {/* <input type="password" id="password" {...register('password', { required: true })} className="tf-comm" */}
                                        <input type="password" id="password" className="tf-comm"
                                               placeholder="비밀번호 입력"/>
                                            <i className="ico-delete"></i>
                                    </div>
                                    <p className="fz-12"><i className="ico"></i>체크 / 에러 문구 내용 영역</p>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-normal xlarge expand">로그인</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
  );
};

export default Login;
