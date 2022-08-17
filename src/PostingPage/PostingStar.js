import React, { useState } from 'react';
import './PostingStar.css';

function PostingStar({ title, property, onClickStar }) {
  //별 기본값
  const [clicked, setClicked] = useState(null);
  const [hovered, setHovered] = useState(null); //마우스오버

  const starClick = (e) => {
    const starValue = e.target.getAttribute('value');
    //setClicked를 e.target.value로 변경 1,2,3,4...
    console.log('start click num: ', starValue);
    setClicked(starValue);
    onClickStar(property, Number(starValue));
  };

  return (
    <>
      <div className="starItem">
        <p>{title}</p>
        <div className="starContainer">
          {[1, 2, 3, 4, 5].map((el) => (
            <div
              className={`grayStar ${
                //el만큼 클릭 하거나 || el만큼 호버를 하면 colorStar 클래스를 실행
                (clicked >= el) | (hovered >= el) && 'colorStar'
              }`}
              key={el}
              id={el}
              value={el}
              onMouseEnter={() => setHovered(el)}
              onMouseLeave={() => setHovered(null)}
              onClick={starClick}
            >
              ★
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PostingStar;
