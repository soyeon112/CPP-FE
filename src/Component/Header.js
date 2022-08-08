import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginPage/LoginModal';
import './Header.css';

function Header() {
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const logoutHeader = () => {
		axios
			.get('http://api.cpp.co.kr:3300/auth/logout')
			.then((res) => {
				console.log(res, '======로그아웃 성공======');
				setIsLogin(false);
				alert('로그아웃 성공');
				console.log(isLogin);
				sessionStorage.removeItem('id');
				window.open('/', '_self');
			})
			.catch((err) => {
				alert('로그아웃 실패 ');
			});
	};
	useEffect(() => {
		if (sessionStorage.getItem('id') === null) {
			// sessionStorage 에 id 라는 key 값으로 저장된 값이 없다면
			setIsLogin(false);
			console.log('isLogin ?? :: ', isLogin);
		} else {
			// sessionStorage 에 id 라는 key 값으로 저장된 값이 있다면
			// 로그인 상태 변경
			setIsLogin(true);
			console.log('isLogin ?? :: ', isLogin);
		}
	}, []);

	return (
		<div className='header'>
			<div className='logo'>
				<Link to='/'>
					<img
						src={`${process.env.PUBLIC_URL}/image/cpp_logo.png`}
						alt=''
					/>
				</Link>
			</div>
			<div className='header-navi'>
				<ul>
					<li>
						<Link to='/post/3'>
							<img
								src={`${process.env.PUBLIC_URL}/image/bookmarks-icon.png`}
								width='12px'
								height='12px'
								alt=''
							/>
						</Link>
					</li>
					<li>
						<Link to='/map'>Search</Link>
					</li>
					<li>
						{isLogin ? (
							<p onClick={logoutHeader}>Logout</p>
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
						<LoginModal closeLoginModal={setOpenLoginModal} />
					)}
					<li>
						{isLogin ? (
							<Link to='/mypage'>MyPage</Link>
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
