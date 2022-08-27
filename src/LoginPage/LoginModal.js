import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginModal({ closeLoginModal, onLogin }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  //login axios
  const loginBtn = () => {
    axios({
      method: 'post',
      url: 'http://api.cpp.co.kr:3300/auth/login',
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          console.log('로그인 성공!!');
          console.log('로그인된 사용자 id : ', res.data.id);
          sessionStorage.setItem('user', JSON.stringify(res.data));
          onLogin();
          closeLoginModal(false);
          navigate(pathname);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        // alert('ERROR : 입력하신 정보를 다시 확인해주세요!!');
      });
  };

  //회원가입페이지 open
  const openJoin = () => {
    navigate('/join');
    closeLoginModal(false);
  };

  const loginSocial = (e) => {
    const onMessage = (e) => {
      console.log(e);
      if (e.origin === 'http://api.cpp.co.kr:3300') {
        sessionStorage.setItem('user', e.data);
        onLogin();
        closeLoginModal(false);
        navigate(pathname);
      }
    };
    window.addEventListener('message', onMessage);
    const popup = window.open(
      `http://api.cpp.co.kr:3300/auth/${e.target.value}`,
      'popup',
      'width=400px,height=400px'
    );
    //1초마다 팝업창이 닫혔는지를 검사하여 닫혔으면 부모창의 message이벤트를 삭제함
    const intervalId = setInterval(() => {
      if (!popup || popup.closed) {
        window.removeEventListener('message', onMessage);
        clearInterval(intervalId);
      }
    }, 1000);
    //팝업창 닫힘 이벤트 감지 코드(동작 하지 않아서 주석 처리 해놓음)
    // popup.addEventListener('beforeunload', () => {
    //   console.log('호출됨');
    //   window.removeEventListener('message', onMessage);
    // });
  };

  return (
    <div className="LoginPlace">
      <div className="ModalBackground">
        <div className="LoginContainer">
          <button onClick={() => closeLoginModal(false)}>
            <img
              className="closeBtn"
              src={`${process.env.PUBLIC_URL}/image/close_icon.png`}
              width="20px"
              height="20px"
              alt=""
            ></img>
          </button>
          <div className="LoginTitle">
            <h1>로그인</h1>
            <div className="LoginBody">
              <div className="loginEmailForm">
                <p id="loginEmail">이메일</p>
                <input
                  className="loginInput"
                  placeholder="이메일"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPWForm">
                <p id="loginPassword">비밀번호</p>
                <input
                  className="loginInput"
                  placeholder="비밀번호"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="LoginFooter">
                <button id="loginButton" onClick={loginBtn}>
                  로그인하기
                </button>
                <p>SNS</p>
                <button
                  className="socialLoginButton"
                  onClick={loginSocial}
                  value="kakao"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/image/kakao-talk.png`}
                    width="40px"
                    height="40px"
                    alt=""
                  ></img>
                </button>
                <button
                  className="socialLoginButton"
                  onClick={loginSocial}
                  value="google"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/image/google.png`}
                    width="40px"
                    height="40px"
                    alt=""
                  ></img>
                </button>
                <p>아직 회원이 아니신가요?</p>
                <button id="joinButton" onClick={openJoin}>
                  회원가입 하러가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
