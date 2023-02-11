import axios from 'axios';
import { useEffect, useState } from 'react';

const useQueryAPI = (url, id) => {
  const [data, setData] = useState({});
  let cancelRequest = false;
  useEffect(() => {
    if (!id || !url) return;
    const captchaId = id;

    const fetchData = async () => {
      await axios
        .post(url, null, { params: { captchaId } })
        .catch((error) => {
          console.error(error);
          if (cancelRequest) return;
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            if (cancelRequest) return;
            setData(res.data);
          }
        });
    };

    fetchData();
    return function cleanup() {
      cancelRequest = false;
    };
  }, [url, id]);

  return { data };
};

export default useQueryAPI;
