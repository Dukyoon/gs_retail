import axios from 'axios';
import { post } from 'jquery';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';




function useSend({url = "", params = {}, skip = true}) {
  const [data, setData] = useState<Response[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const getServerData = () => {
    console.log("파라미터 체크");
    console.log(url);
    console.log(params);
    console.log(skip);
    const config = {
      method: "post",
      headers: {
        "Content-Type": 'application/json',
      },
      url: url,
      data: params
    }

    console.log("axios config info.. => ", config );

    //fetchData();
    const sendServer = async () => {
      console.log("들어옴시작");
      try {
        console.log("axios config info22.. => ", config );
        await axios(config)
          .then(res => { setData(res.data); })
          .finally(() => { setIsLoading(false); });
      } catch (err: any) {
        setError(err);
        Swal.fire(err);
      }
    };
    if (isLoading) {
      sendServer();
    }
  }
  useEffect(() => {
    console.log("useSend ==> useEffect 실행");
    console.log(params);
    if(skip) return;
    getServerData();
  }, [params]);
  // const fetchData = () => {

  //   axios.get(url).then(({data}) => setValue(data));
  // }
  console.log("리턴 시점");
  console.log(data);
  return [data, isLoading, error];
}

export default useSend;