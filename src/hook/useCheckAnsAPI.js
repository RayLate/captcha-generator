import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useCheckAnsAPI = (url, answer, resultId) => {
  const [data, setData] = useState({});
  let cancelRequest = false;
  useEffect(() => {
    if (!answer || answer.length === 0 || !resultId || !url) return;

    const fetchData = async () => {
      await axios
        .post(url, null, { params: { answer, resultId } })
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
  }, [url, answer, resultId]);

  return { data };
};

export default useCheckAnsAPI;
