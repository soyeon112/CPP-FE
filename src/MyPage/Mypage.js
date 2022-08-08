import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import axios from 'axios';

function Mypage() {
	axios.defaults.withCredentials = true;

	const initAuth = {
		id: '',
		email: '',
		name: '',
		birth: '',
		nickname: '',
		profileURL: '',
		provider: '',
		snsId: '',
		createdAt: '',
		updatedAt: '',
	};
	const initDataPost = {
		id: null, // posts id
		photoURL: null,
		cafeName: null,
		cafeAdress: null,
	};

	const initDataPick = {
		id: null, // posts id
		photoURL: null,
		cafeName: null,
		cafeAdress: null,
	};

	const userID = 27;

	//유저정보 가져오기
	const [userAuth, setUserAuth] = useState(initAuth);

	const myNickname = sessionStorage.getItem('nickname');
	const myProfileURL = sessionStorage.getItem('profileURL');

	//*****************회원정보요청*****************
	useEffect(() => {
		axios({
			method: 'get',
			url: `http://api.cpp.co.kr:3300/users/${userID}`,
			data: {
				id: userID,
			},
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
				setUserAuth(res.data);
				console.log(setUserAuth);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [getPostList, setGetPostList] = useState(initDataPost);
	const [getPickList, setGetPickList] = useState(initDataPick);
	//회원 게시물 리스트
	const PostListGET = async () => {
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/users/${userID}/posts`
		);
		setGetPostList(res.data);
		console.log(getPostList);
		console.log(res);
	};

	useEffect(() => {
		PostListGET();
		console.log(getPostList);
	}, []);

	//저장한 게시물 리스트
	const PickListGET = async () => {
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/users/${userID}/stored-posts`
		);
		setGetPickList(res.data);
		console.log(getPickList);
	};

	useEffect(() => {
		PickListGET();
		console.log(getPickList);
	}, []);

	//기본값 : 내포스트 show / 저장포스트 hide
	const [showPost, setShowPost] = useState(true);
	const [showPick, setShowPick] = useState(false);

	const MyPlaceClick = (e) => {
		setShowPost(true);
		setShowPick(false);

		console.log(
			'place click : showPost -> ',
			showPost,
			'showPick',
			showPick
		);
	};
	const MyPickClick = () => {
		setShowPost(false);
		setShowPick(true);
		console.log(
			'pick click : showPost -> ',
			showPost,
			'showPick',
			showPick
		);
	};

	return (
		<div>
			<div className='profile_AddBtn'>
				<div className='profile'>
					<img
						className='profileImg'
						src={userAuth.profileURL}
						width='130px'
						height='130px'
					/>
					<p className='profileName'>{userAuth.nickname}</p>
					<Link to='/modify'>
						<img
							className='settingBtn'
							src={`${process.env.PUBLIC_URL}/image/setting-icon-color.png`}
							width='22px'
							height='22px'
						/>
					</Link>
				</div>
				<Link to='/posting'>
					<img
						className='postAddBtn'
						src={`${process.env.PUBLIC_URL}/image/add-btn.png`}
					/>
				</Link>
			</div>
			<div className='tab'>
				<p className='tabPlcae' onClick={MyPlaceClick}>
					My Place :P
				</p>
				<p className='tabPick' onClick={MyPickClick}>
					My Pick :P
				</p>
			</div>
			<div className='bar_width900'></div>
			{/* my place tab click */}
			{showPost == true && getPostList.length >= 1 ? (
				<div className='postList'>
					{Object.values(getPostList).map((it) => (
						<>
							{/* 참고:  https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop */}
							<div className='recoOneLine'>
								<div className='recoPost'>
									<Link to={`/post/${getPostList.id}`}>
										<img
											className='recoPostImg'
											src={it.photoURL}
										/>
									</Link>
									<div className='PostCafeInfo'>
										<p className='my_cafeName'>
											{it.cafeName}
										</p>
										<p className='my_cafeAddr'>
											{it.cafeAddress}
										</p>
									</div>
								</div>
							</div>
						</>
					))}
				</div>
			) : showPost && getPickList.length == 0 ? (
				<div className='notPost'>
					<h3> 작성된 게시물이 없습니다.</h3>
					<p>마음에 드는 공간을 소개해보세요! :p</p>
				</div>
			) : null}

			{/* my pick tab cick  */}
			{showPick && getPickList.length >= 1 ? (
				<div className='postList'>
					{Object.values(getPickList).map((it) => (
						<div className='recoPost'>
							<Link to={`/post/${getPickList.id}`}>
								<img
									className='recoPostImg'
									src={it.photoURL}
								/>
							</Link>
							<div className='PostCafeInfo'>
								<p className='my_cafeName'>{it.cafeName}</p>
								<p className='my_cafeAddr'>{it.cafeAddress}</p>
							</div>
						</div>
					))}
				</div>
			) : showPick && getPickList.length == 0 ? (
				<div className='notPost'>
					<h3> 저장된 공간이 없습니다.</h3>
					<p>마음에 드는 공간을 저장해보세요! :p</p>
				</div>
			) : null}
		</div>
	);
}

export default Mypage;
