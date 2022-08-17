import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginPage/LoginModal';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const logout = () => {
    axios
      .get('http://api.cpp.co.kr:3300/auth/logout')
      .then((res) => {
        console.log(res, '======로그아웃 성공======');
        setIsLogin(false);
        alert('로그아웃 성공');
        sessionStorage.removeItem('user');
        navigate('/');
      })
      .catch((err) => {
        alert('로그아웃 실패 ');
      });
  };
  useEffect(() => {
    sessionStorage.getItem('user') ? setIsLogin(true) : setIsLogin(false);
  }, []);

  const onLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/image/cpp_logo.png`} alt="" />
        </Link>
      </div>
      <div className="header-navi">
        <ul>
          <li>
            <Link to="/post/3">
              <img
                src={`${process.env.PUBLIC_URL}/image/bookmarks-icon.png`}
                width="12px"
                height="12px"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link to="/map">Search</Link>
          </li>
          <li>
            {isLogin ? (
              <p onClick={logout}>Logout</p>
            ) : (
              <p
                onClick={() => {
                  setOpenLoginModal(true);
                }}
              >
                Login
              </p>
            )}
          </li>
          {openLoginModal && (
            <LoginModal closeLoginModal={setOpenLoginModal} onLogin={onLogin} />
          )}
          <li>
            {isLogin ? (
              <Link to="/mypage">MyPage</Link>
            ) : (
              <p
                onClick={() => {
                  setOpenLoginModal(true);
                }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
