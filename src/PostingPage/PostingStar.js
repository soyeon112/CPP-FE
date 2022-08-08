import React, { useRef, useState } from 'react';
import './PostingStar.css';

function PostingStar(props, { setAllState, allState }) {
  //별 기본값
  const [clicked, setClicked] = useState(null);
  const [hovered, setHovered] = useState(null); //마우스오버

  const starClick = (e) => {
    //setClicked를 e.target.id로 변경 1,2,3,4...
    console.log(e);
    setClicked(e.target.id);
    const saveTest = null;
    console.log('save', saveTest);

    console.log('start click num: ', e.target.id);
    console.log('clicked', clicked);

    //fetch 함수를 통해 백엔드로 보내줌
    // fetch(`http://localhost:3000/posting`, {
    //   //사용할 http 메소드
    //   method: 'POST',
    //   //토큰
    //   headers: {
    //     Authorization:
    //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.loTjeBWZ9SeXV-BcIxqOtX37AN30ROvsZl0_udeeRJU',
    //   },
    //   //서버에 보낼 데이터 (별점)
    //   body: JSON.stringify({
    //     //rating-> 백엔드와 변수명 같은걸로
    //     rating: e.target.id,
    //   }),
    // });
  };
  const titleRef = useRef();

  return (
    <>
      <div className="starItem">
        <p>{props.title}</p>
        <div className="starContainer">
          {/* <div className="starBox"> */}
          {[1, 2, 3, 4, 5].map((el) => (
            <div
              className={`grayStar ${
                //el만큼 클릭 하거나 || el만큼 호버를 하면 colorStar 클래스를 실행
                (clicked >= el) | (hovered >= el) && 'colorStar'
              }`}
              key={el}
              id={el}
              onMouseEnter={() => setHovered(el)}
              onMouseLeave={() => setHovered(null)}
              //onClick={() => setClicked(el)}
              onClick={starClick}
              alt=""
            >
              ★
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default PostingStar;
