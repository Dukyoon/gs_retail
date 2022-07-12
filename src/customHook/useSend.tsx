import axios from 'axios';
import { post } from 'jquery';
import { useEffect, useReducer, useState } from 'react';
import Swal from 'sweetalert2';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, data: null, error: null };
    case 'SUCCESS':
      return { loading: false, data: action.data, error: null };
    case 'ERROR':
      return { loading: false, data: null, error: action.error };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


function useSend(url, deps = [], skip = true) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });
  
  const makeConfig = () => {
    console.log("파라미터 체크");
    console.log(url);
    console.log(deps);
    console.log(skip);
    const config = {
      method: "post",
      headers: {
        "Content-Type": 'application/json',
      },
      url: url,
      data: deps[0  ]
    }

    console.log("axios config info.. => ", config );
    return config;
  }
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const config = makeConfig();
      const data = await axios(config);
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useSend;