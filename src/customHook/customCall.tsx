// axiosConfig.js

import Axios from 'axios';
import Swal from 'sweetalert2';
const useCall = Axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
useCall.interceptors.request.use(
  config => {
    //데이터 전송 시 토큰 필요하면 여기서 추가하던가 하자.
    return config;
  },
  err => {
    Swal.fire("요청 시 에러 발생했습니다.");
    return Promise.reject(err);
  },
);
useCall.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    if(err.response.status === 500)
    Swal.fire("서버에서 에러 발생했습니다.");
    return Promise.reject(err);
  },
);
export default useCall;