import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import PostForm from '../Component/PostForm';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          //반응형 옵션
          breakpoint: 1024, //화면사이즈
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    // 슬라이더 참고: https://velog.io/@mokyoungg/CodeReview-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%8D%94-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC

    return (
      <div className="sliderPlace">
        <Slider {...settings}>
          <RecoListup />
          {/* <PostForm nickName="복돌루이" />
          <PostForm nickName="쿠쿠루핑퐁" />
          <PostForm nickName="soyeon" />
          <PostForm nickName="소길별하" />
          <PostForm nickName="ㅇㅇ" />
          <PostForm nickName="nickName" />
          <PostForm nickName="nickName" />
          <PostForm nickName="nickName" /> */}
        </Slider>
      </div>
    );
  }
}

function RecoListup() {
  const initOtherPost = {
    id: null, //post
    cafeId: null,
    userId: null,
    nickname: null,
    profileURL: null,
    photoURL: null,
  };
  const [otherPost, setOtherPost] = useState(initOtherPost);

  const getOtherPost = async () => {
    const res = await axios.get('http://api.cpp.co.kr:3300/posts?cafeId=3');
    setOtherPost(res.data);
  };

  useEffect(() => {
    getOtherPost();
    console.log('다른유저게시물 : ', otherPost);
  }, []);
  return <></>;
}

// function RecommendPost({nickName}){
//   return(
//     <>
//       <div className="recoPost">
//         <Link to =''><img onClick={console.log('click')} className ='recoPostImg' src={`${process.env.PUBLIC_URL}/image/ex-img2.jpg`} width='185px' height='280px'/></Link>
//         <div className='recoPostUser'>
//           <img className = 'recoPostUserImg' src={`${process.env.PUBLIC_URL}/image/ex-img3.jpg`}/>
//           <p className='recoPostUserName'>{nickName}</p>
//         </div>
//       </div>
//     </>
//   )
// }
