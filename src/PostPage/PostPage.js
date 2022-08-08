import React, { useState, useRef, useMemo, useEffect } from 'react';
import RecoSlider from '../MainPage/Main-Recommend';
import OtherPost from '../Component/OtherPost';
import './PostPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostPage() {
	axios.defaults.withCredentials = true;
	const params = useParams();

	const initData = {
		id: null,
		content: null,
		views: null,
		visited: null,
		receiptURL: null,
		isSponsored: null,
		isLiked: null,
		isStored: null,
		likes: null,
		rate: {
			taste: null,
			vibe: null,
			service: null,
			parking: null,
			bathroom: null,
			amenity: null,
		},
		cafe: {
			id: null,
			name: null,
			address: null,
			phone: null,
			openingHours: null,
		},
		photoURLs: [null],
		user: {
			id: null,
			nickname: null,
			profileURL: null,
		},
	};

	// 데이터 받았는지 상태체크
	const [postData, setPostData] = useState(initData);
	// const [isRender, setIsRender] = useState(false);

	// 포스트 정보 가져오기 axios
	const getdata = async () => {
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/posts/${params.id}`
		);
		console.log(params.id);
		setPostData(res.data);
		console.log('getdata');
	};

	useEffect(() => {
		getdata();
		console.log('postData', postData);
	}, []);

	console.log(postData);
	return (
		<div>
			<div className='postPlace'>
				<PostImage {...postData} />
				<PostCafeInfo {...postData} />
				<div className='bar'></div>
				<div className='star'>
					<PostStar title='맛' rate={postData.rate.taste} />
					<PostStar title='분위기' rate={postData.rate.vibe} />
					<PostStar title='서비스' rate={postData.rate.service} />
					<PostStar title='주차' rate={postData.rate.parking} />
					<PostStar title='화장실' rate={postData.rate.bathroom} />
					<PostStar title='편의시설' rate={postData.rate.amenity} />
				</div>
				<div className='bar'></div>
				<PostText {...postData} />

				<div className='visitDate'>
					<p>방문일 : </p>
					<p className='date'>{postData.visited}</p>
				</div>
				<div className='bar'></div>
			</div>
			<div className='OtherPost'>
				<OtherUser />
			</div>
		</div>
	);
}

// 사진 슬라이더 참고: https://react-slick.neostack.com/
function PostImage({ user, photoURLs }) {
	const [countImg, setCountImg] = useState(0);
	console.log('user', user);
	//이전 버튼(img)
	const ArrowLeft = (e) => {
		if (countImg !== 0) {
			setCountImg(countImg - 1);
		}
	};
	//다음 버튼(img)
	const ArrowRight = () => {
		if (countImg !== photoURLs.length - 1) {
			setCountImg(countImg + 1);
		}
	};

	return (
		<>
			<div className='postImgSet'>
				<div className='ImgArrowSet'>
					{countImg !== 0 ? (
						<img
							className='arrowBtn'
							name='arrowLeft'
							onClick={ArrowLeft}
							src={`${process.env.PUBLIC_URL}/image/arrow-left-icon.png`}
							width='20px'
							height='20px'
							alt='left'
						/>
					) : (
						<img
							src={`${process.env.PUBLIC_URL}/image/transparent-icon.png`}
							width='20px'
							height='20px'
							alt='left'
						/>
					)}

					{countImg !== photoURLs.length - 1 ? (
						<img
							className='arrowBtn'
							name='arrowRight'
							onClick={ArrowRight}
							src={`${process.env.PUBLIC_URL}/image/arrow-right-icon.png`}
							width='20px'
							height='20px'
							alt='left'
						/>
					) : (
						<img
							src={`${process.env.PUBLIC_URL}/image/transparent-icon.png`}
							width='20px'
							height='20px'
							alt='left'
						/>
					)}
				</div>

				<img
					className='postMainImg'
					src={photoURLs[countImg]}
					alt='left'
				/>

				<UserInfo username={user.nickname} />
			</div>
		</>
	);
}

//메뉴버튼
function MenuIcon() {
	const [clickMenu, setClickMenu] = useState(false);
	const openMenu = () => {
		setClickMenu(true);
		console.log('click menu');
	};
	const closeMenu = () => {
		setClickMenu(false);
	};

	const deletePost = () => {
		axios
			.delete(`http://api.cpp.co.kr:3300/posts/{id}`, {})
			.then(() => console.log('삭제가 완료되었습니다'))
			.catch((err) => console.log('오류: ' + err));
	};

	return (
		<>
			<img
				className='menuIcon'
				onClick={openMenu}
				src={`${process.env.PUBLIC_URL}/image/post-menu-icon.png`}
				width='22px'
				height='22px'
				alt='left'
			/>
			{clickMenu ? (
				<div
					className='menu'
					onBlur={(e) => {
						setClickMenu(false);
						console.log('click menu2');
					}}
				>
					<div className='menuModifyPost'>
						<p>수정</p>
					</div>
					<div className='menuBoxBar'></div>
					<div className='menuDeletePost' onClick={deletePost}>
						<p>삭제</p>
					</div>
				</div>
			) : null}
		</>
	);
}

//유저 정보
function UserInfo(props) {
	return (
		<>
			<div className='UserInfo_photo'>
				<img
					src={`${process.env.PUBLIC_URL}/image/user-icon.png`}
					width='20px'
					height='20px'
					alt='left'
				/>
				<p className='postUsername'>{props.username}</p>
			</div>
		</>
	);
}

//다른유저게시물
function OtherUser(props) {
	return (
		<>
			<div className='otherUserPostPlace'>
				<p>방문한 다른 유저의 게시물 보기</p>
				<div className='otherUserPost'>
					<OtherPost />
				</div>
			</div>
		</>
	);
}

//본문 출력
function PostText({ content }) {
	const [isShowMore, setIsShowMore] = useState(false);
	const textLimit = useRef(60);
	let comment = content;
	// console.log(props);
	if (comment === null) {
		comment = '';
	}

	const commenter = useMemo(() => {
		// 조건에 따라 게시글을 보여주는 함수

		const shortReview = comment.slice(0, textLimit.current); // 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자

		if (comment.length > textLimit.current) {
			// 원본이 길면 (원본 글자수 > 제한된 갯수)
			if (isShowMore) {
				return comment;
			} // 더보기가 true 면 원본 바로 리턴
			return shortReview; // (더보기가 false면) 짧은 버전 리턴해주자
		}
		return comment; // 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
	}, [isShowMore]);

	return (
		<>
			<div className='postText'>{commenter}</div>
			{/* 본문 > 더보기 / 닫기 버튼 */}
			<div
				onClick={() => setIsShowMore(!isShowMore)}
				className='postText'
			>
				{comment.length > textLimit.current &&
					(isShowMore ? (
						<p className='textClose_More'>닫기</p>
					) : (
						<p className='textClose_More'>더보기</p>
					))}
			</div>
		</>
	);
}

//별점
function PostStar(props) {
	const colorStarIcon = `star-icon-color.png`;
	const starIcon = `star-icon-gray2.png`;
	let starArr = [];
	for (let i = 0; i < props.rate; i++) {
		starArr.push(
			<img
				src={`${process.env.PUBLIC_URL}/image/${colorStarIcon}`}
				width='15px'
				height='15px'
				alt='left'
			/>
		);
	}
	if (props.rate < 5) {
		let rateResult = 5 - props.rate;
		for (let i = 0; i < rateResult; i++) {
			starArr.push(
				<img
					src={`${process.env.PUBLIC_URL}/image/${starIcon}`}
					width='15px'
					height='15px'
					alt='left'
				/>
			);
		}
	}
	return (
		<>
			<div className='starItem'>
				<p>{props.title}</p>
				<div className='starSet'>{starArr}</div>
			</div>
		</>
	);
}

//카페정보
function PostCafeInfo({ cafe, views, id }) {
	return (
		<>
			<div className='postCafeInfo'>
				<div className='postCafeInfo_name'>
					<p className='cafeName'>{cafe.name}</p>
					<InfoHover
						cafeName={cafe.name}
						cafeAddr={cafe.address}
						cafeTel={cafe.phone}
						cafeTime={cafe.openingHours}
					/>
				</div>
				<div className='postCafeInfo_Icons'>
					<div className='postViewSet'>
						<img
							src={`${process.env.PUBLIC_URL}/image/view-icon.png`}
							width='20px'
							height='20px'
							alt='left'
						/>
						{/* 조회수 */}
						<p className='postViewCount'>{views}</p>
					</div>
					{/* 영수증 */}
					<img
						src={`${process.env.PUBLIC_URL}/image/receipt-icon.png`}
						onClick={() => {
							console.log('영수증클릭');
						}}
						alt='left'
					/>
					{/* 좋아요 */}
					<img
						src={`${process.env.PUBLIC_URL}/image/heart-icon.png`}
						onClick={() => {
							console.log('좋아요클릭');
						}}
						alt='left'
					/>
					{/* 저장 */}
					<img
						src={`${process.env.PUBLIC_URL}/image/bookmarks-icon.png`}
						onClick={() => {
							console.log('저장하기클릭');
						}}
						alt='left'
					/>
				</div>
			</div>
			<div className='postCafeLocation'>
				<img
					className='locationIcon'
					src={`${process.env.PUBLIC_URL}/image/location-icon.png`}
					alt='left'
				/>
				<p className='locationText'>{cafe.address}</p>
				<div className='postMenu'>
					<MenuIcon />
				</div>
			</div>
		</>
	);
}

//infoBox
function InfoHover(props) {
	const [openinfo, setOpeninfo] = useState(false);
	const openInfoBox = () => {
		setOpeninfo(true);
	};
	const closeInfoBox = () => {
		setOpeninfo(false);
	};

	return (
		<>
			<div className='hoverPlace' onClick={openInfoBox}>
				{/* onMouseOut={closeInfoBox} */}
				<img
					className='infoIcon'
					src={`${process.env.PUBLIC_URL}/image/info-icon.png`}
					width='17px'
					height='17px'
					alt='left'
				/>
			</div>
			{openinfo && (
				<div className='hoverInfoBox'>
					<div>
						<p>- cafe info -</p>
						<img
							className='infoCloseBtn'
							onClick={closeInfoBox}
							src={`${process.env.PUBLIC_URL}/image/close_icon.png`}
							width='12px'
							height='12px'
							alt='left'
						/>
					</div>
					<div className='infoTexts'>
						<p>카페명 : {props.cafeName}</p>
						<p>주소 : {props.cafeAddr}</p>
						<p>전화번호 : {props.cafeTel}</p>
						<p>영업시간 : {props.cafeTime}</p>
					</div>
				</div>
			)}
		</>
	);
}

export default PostPage;
