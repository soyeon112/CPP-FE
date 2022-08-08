import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import PostForm from './PostForm';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function OtherPost() {
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
    console.log(otherPost);
  };

  useEffect(() => {
    getOtherPost();
    console.log('다른유저게시물 : ', otherPost);
  }, []);

  // 슬라이더 참고: https://velog.io/@mokyoungg/CodeReview-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%8D%94-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC

  return (
    <div className="sliderPlace">
      {otherPost.cafeId !== null ? (
        <Slider {...settings}>
          {Object.values(otherPost)
            .slice(0, 8)
            .map((it) => (
              <PostForm
                key={it.id}
                photoURL={it.photoURL}
                nickname={it.nickname}
                profileURL={it.profileURL}
              />
            ))}
        </Slider>
      ) : null}
    </div>
  );
}

export default OtherPost;
