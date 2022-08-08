import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Join.css';
import LoginModal from '../LoginPage/LoginModal';
import Policy from './Policy';
function Join() {
	//약관모달창 상태관리
	const [openPolicyModal, setopenPolicyModal] = useState(false);
	const policyModal = () => {
		setopenPolicyModal(true);
	};
	useEffect(() => {
		policyModal();
		<Link to='/policy' />;
	}, []);
	//로그인 모달
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [joinInit, setJoinInit] = useState({
		registerNickname: '',
		registerEmail: '',
		registerPassword: '',
	});
	//input창 아래 error메세지
	const [joinError, setJoinError] = useState({});
	//유효성 감사
	const [isNickname, setIsNickname] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	//const [isPassword, setIsPassword] = useState(false);
	const joinBtn = async (e) => {
		e.preventDefault();
		try {
			const res = await axios({
				method: 'post',
				url: 'http://api.cpp.co.kr:3300/users',
				data: {
					nickname: joinInit.registerNickname,
					email: joinInit.registerEmail,
					password: joinInit.registerPassword,
				},
				withCredentials: true,
			});
			console.log(res);
			if (res.status === 200) {
				window.alert('회원가입이 완료되었습니다! 로그인 해주세요 :p');
				window.open('/', '_self');
			}
		} catch (err) {
			if ((setIsEmail || setIsNickname) === false) {
				window.alert('중복확인을 해주세요!');
			} else if (err.response.status === 400) {
				window.alert(
					'회원가입이 정상적으로 되지 않았습니다. 입력하신 정보를 확인해주세요 :('
				);
			}
		}
	};
	//닉네임
	const nicknameCheck = async (e) => {
		e.preventDefault();
		const nicknameRegEx = /^[가-힣A-Za-z0-9]{2,20}$/; //영문자, 숫자만 가능
		console.log(joinInit.registerNickname);
		if (
			joinInit.registerNickname.length > 0 &&
			!nicknameRegEx.test(joinInit.registerNickname)
		) {
			const newJoinError = {
				...joinError,
				registerNickname: '입력하신 정보를 확인해주세요.',
			};
			setJoinError(newJoinError);
			setIsNickname(false);
			return;
		}
		try {
			const res = await axios({
				method: 'get',
				url: `http://api.cpp.co.kr:3300/users/nickname?nickname=${joinInit.registerNickname}`,
				withCredentials: true,
			});
			if (res.status === 200) {
				const newJoinError = {
					...joinError,
					registerNickname: '사용할 수 있는 닉네임입니다.',
				};
				setJoinError(newJoinError);
				setIsNickname(true);
			}
		} catch (err) {
			console.log(err);
			if (err.response.status === 400) {
				const newJoinError = {
					...joinError,
					registerNickname: err.response.data.message,
				};
				setJoinError(newJoinError);
				setIsNickname(false);
			}
		}
	};
	//이메일 + 중복검사
	const emailCheck = async (e) => {
		e.preventDefault();
		const emailRegEx =
			/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
		if (
			joinInit.registerEmail.length > 0 &&
			!emailRegEx.test(joinInit.registerEmail)
		) {
			const newJoinError = {
				...joinError,
				registerEmail: '입력하신 정보를 확인해주세요.',
			};
			setJoinError(newJoinError);
			setIsEmail(false);
			return;
		}
		try {
			const res = await axios({
				method: 'get',
				url: `http://api.cpp.co.kr:3300/users/email?email=${joinInit.registerEmail}`,
				withCredentials: true,
			});
			console.log(res);
			if (res.status === 200) {
				const newJoinError = {
					...joinError,
					registerEmail: '사용할 수 있는 이메일입니다.',
				};
				setJoinError(newJoinError);
				setIsEmail(true);
			}
		} catch (err) {
			console.log(err);
			if (err.response.status === 400) {
				const newJoinError = {
					...joinError,
					registerEmail: err.response.data.message,
				};
				setJoinError(newJoinError);
				setIsEmail(false);
			}
		}
	};
	//비밀번호 정규식
	const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
	//비밀번호
	if (
		joinInit.registerPassword.length > 0 &&
		!passwordRegEx.test(joinInit.registerPassword)
	) {
		joinError.registerPassword = '입력하신 정보를 확인해주세요.';
	} else if (
		joinInit.registerPassword.length > 0 &&
		passwordRegEx.test(joinInit.registerPassword) === true
	) {
		joinError.registerPassword = 'ok!';
	}
	return (
		<div>
			{openPolicyModal && (
				<Policy closePolicyModal={setopenPolicyModal} />
			)}
			<div className='joinContainer'>
				<div className='joinHeader'>
					<p>회원가입</p>
					<p className='joinText'>
						가입을 통해 더 나은 서비스를 만나보세요! :p
					</p>
				</div>
				<form className='joinForm' id='joinForm' onSubmit={joinBtn}>
					<div className='joinBody'>
						<div className='formControl'>
							<label>닉네임</label>
							<input
								id='joinNickname'
								type='text'
								name='nickname'
								placeholder='2자 이상 20자 이내로 작성해주세요'
								value={joinInit.registerNickname}
								onChange={(e) =>
									setJoinInit({
										...joinInit,
										registerNickname: e.target.value,
									})
								}
							/>
							{joinError.registerNickname && (
								<small className='error'>
									{joinError.registerNickname}
								</small>
							)}
							<button
								className='checkButton'
								onClick={nicknameCheck}
							>
								중복확인
							</button>
						</div>
						<div className='formControl'>
							<label>이메일</label>
							<input
								id='joinEmail'
								type='text'
								name='Email'
								placeholder='cpp@cpp.com'
								value={joinInit.registerEmail}
								onChange={(e) =>
									setJoinInit({
										...joinInit,
										registerEmail: e.target.value,
									})
								}
							/>
							{joinError.registerEmail && (
								<small className='error'>
									{joinError.registerEmail}
								</small>
							)}
							<button
								className='checkButton'
								onClick={emailCheck}
							>
								중복확인
							</button>
						</div>
						<div className='formControl'>
							<label>비밀번호</label>
							<input
								id='joinPW'
								type='password'
								name='password'
								placeholder='8자 이상 20자 이내로 작성해주세요'
								value={joinInit.registerPassword}
								onChange={(e) =>
									setJoinInit({
										...joinInit,
										registerPassword: e.target.value,
									})
								}
							/>
							{joinError.registerPassword && (
								<small className='error'>
									{joinError.registerPassword}
								</small>
							)}
						</div>
					</div>
				</form>
				<div className='joinBtnPlace'>
					<button
						className='joinButton'
						type='submit'
						onClick={joinBtn}
					>
						가입하기
					</button>
				</div>
				<div className='notJoin'>
					<p>이미 회원이신가요?</p>
					<p
						className='goLogin'
						onClick={() => {
							setOpenLoginModal(true);
						}}
					>
						로그인 하러가기
					</p>
					{openLoginModal && (
						<LoginModal closeLoginModal={setOpenLoginModal} />
					)}
				</div>
			</div>
		</div>
	);
}
export default Join;
