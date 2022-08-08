import React, { useState } from 'react';
import axios from 'axios';
import './UserDrop.css';

//회원탈퇴 확인 창(비밀번호 재입력)
function UserDrop() {
  axios.defaults.withCredentials = true;

  //탈퇴버튼 클릭
  const clickDropBtn = () => {
    console.log('회원탈퇴');

    axios({
      method: 'DELETE',
      url: 'http://api.cpp.co.kr:3300/users/2',
      data: {
        password: dropPW,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [dropPW, setDropPW] = useState('');
  const userDropPW = (e) => {
    setDropPW(e.target.value);
    console.log(dropPW);
  };

  return (
    <div className="dropPlace">
      <div className="dropTexts">
        <p className="dropTitle">회원 탈퇴</p>
        <p className="subTitle">회원 인증을 위해 비밀번호를 입력해주세요.</p>
      </div>
      <div className="dropInputPlace">
        <p>현재 비밀번호</p>
        <input
          className="dropPwInput"
          name="pw"
          onChange={userDropPW}
          type="password"
        />
      </div>
      <div className="dropBtnPlace">
        <button onClick={clickDropBtn}>탈퇴하기</button>
      </div>
    </div>
  );
}

export default UserDrop;
