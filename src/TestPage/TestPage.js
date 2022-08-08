import { useState, useEffect } from 'react';
const axios = require('axios');
const Test = () => {
  console.log('시작');
  const [postdata, setPostData] = useState({});
  const getdata = async () => {
    console.log('getdata 첫번째');
    const data = await axios({
      method: 'get',
      url: 'http://api.cpp.co.kr:3300/posts/1',
    });
    setPostData(data.data);
    console.log('getdata 이후');
  };
  useEffect(() => {
    getdata();
  }, []);
  console.log(postdata);
  console.log('끝');
  return <div>{postdata.content}</div>;
};
export default Test;
