import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';

function LoginModal({ closeLoginModal }) {
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
					console.log('로그인 성공');
					sessionStorage.setItem('id', res.data.id);
					sessionStorage.setItem('nickname', res.data.nickname);
					sessionStorage.setItem('profileURL', res.data.profileURL);
					console.log(res.data.id);
					closeLoginModal(false);
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
				alert('ERROR : 입력하신 정보를 다시 확인해주세요!!');
			});
	};

	//회원가입페이지 open
	const openJoin = () => {
		window.open('/join', '_blank');
		closeLoginModal(false);
	};

	return (
		<div className='LoginPlace'>
			<div className='ModalBackground'>
				<div className='LoginContainer'>
					<button onClick={() => closeLoginModal(false)}>
						<img
							className='closeBtn'
							src={`${process.env.PUBLIC_URL}/image/close_icon.png`}
							width='20px'
							height='20px'
							alt=''
						></img>
					</button>
					<div className='LoginTitle'>
						<h1>로그인</h1>
						<div className='LoginBody'>
							<div className='loginEmailForm'>
								<p id='loginEmail'>이메일</p>
								<input
									className='loginInput'
									placeholder='이메일'
									type='email'
									value={loginEmail}
									onChange={(e) =>
										setLoginEmail(e.target.value)
									}
								/>
							</div>
							<div className='loginPWForm'>
								<p id='loginPassword'>비밀번호</p>
								<input
									className='loginInput'
									placeholder='비밀번호'
									type='password'
									value={loginPassword}
									onChange={(e) =>
										setLoginPassword(e.target.value)
									}
								/>
							</div>
							<div className='LoginFooter'>
								<button id='loginButton' onClick={loginBtn}>
									로그인하기
								</button>
								<p>아직 회원이 아니신가요?</p>
								<button id='joinButton' onClick={openJoin}>
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
