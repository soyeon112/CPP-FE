import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Posting.css';
import PostingUpload from './PostingUpload';
import DatePicker, { registerLocale } from 'react-datepicker';
import './DatePicker.css';
import PostingStar from './PostingStar';
import axios from 'axios';
import Receipt_Sponser from './Receipt_Sponser';
import ko from 'date-fns/locale/ko';
import Modal from 'react-modal';
import CafePopup from './CafePopup';
registerLocale('ko', ko);

function Posting({ location, history }) {
	//모달창 오픈,클로즈 여부
	const [modalIsOpen, setModalIsOpen] = useState(false);

	//본문내용
	const [content, setContent] = useState('');
	// -----
	console.log('location', location);
	console.log('history', history);
	const [allState, setAllState] = useState({
		photoURLs: [],
		cafeId: '',
		visited: '',
		rate: {
			//////////////////////////////////////// 여기 수정하세요!!
			taste: 5,
			vibe: 5,
			service: 4,
			parking: 3,
			bathroom: 2,
			amenity: 5,
		},
		content: '',
		receiptURL: null,
		isSponsored: false,
	});

	//방문일 달력
	const [visitDate, setVisitDate] = useState('');
	//본문내용
	const [contentText, setContentText] = useState('');
	const initCafe = {
		address: [
			{
				id: null,
				name: null,
				address: null,
				postId: null,
			},
		],
		name: [
			{
				id: null,
				name: null,
				address: null,
				postId: null,
			},
		],
	};

	//search cafe
	//검색 데이터 저장 (axios로 받아온 데이터 저장)
	const [cafeInfo, setCafeInfo] = useState(initCafe);
	//input값
	const [keyword, setKeyword] = useState('');

	//검색창 데이터 get
	const GetCafeData = async () => {
		console.log('들어옴?');
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/cafes/search?keyword=${keyword}`
		);
		setCafeInfo(res.data);
		console.log('cafeInfo', cafeInfo);
	};

	useEffect(() => {
		GetCafeData();
	}, []);

	//input 키워드 변경
	const getKeyword = (e) => {
		setKeyword(e.target.value);
	};
	// useEffect(() => {
	//   setCafeInfo(keyword);
	// }, [keyword]);

	//포스팅 작성 완료 버튼
	const ClickPostingDone = async (e) => {
		if (contentText === '') {
			console.log('text없음');
			alert('본문이 입력되지 않았습니다. 글을 입력해주세요.');
		} else {
			console.log(allState);
			// setAllState({
			//   ...allState,
			//   content: contentText,
			// });
			console.log('State content : ', allState.content);
			console.log('텍스트 있음');
			try {
				const response = await axios.post(
					'http://api.cpp.co.kr:3300/posts',
					{
						...allState,
						content: contentText,
					},
					{ withCredentials: true }
				);
				console.log(response.data.id);
				alert('작성 성공');
				// window.location.href = '/';
				//id값을 사용해서 해당 포스트 상세보기 페이지로 전환
			} catch (err) {
				console.log(err);
			}
		}
	};

	//카페명 검색결과 창
	const [showCafeRe, setShowCafeRe] = useState(false);
	//리스트중에서 선택된 카페명 저장
	const [selectCafe, setSelectCafe] = useState();

	//카페명 검색 결과 오픈
	const cafeNameRe = () => {
		setShowCafeRe(true);
	};

	//카페명 검색창 인풋 ref
	const cafenameRef = useRef();

	//모달창에서 리스트 요소(카페목록) 클릭시 selectCafe state 변경해주기
	//위한 함수
	const changeSelectCafe = (cafe) => {
		console.log('cafe', cafe);
		setSelectCafe(cafe);
		cafenameRef.current.value = cafe.name;
		setModalIsOpen(false);
	};
	console.log('cafeInfo', cafeInfo);

	function selectDate(date) {
		// console.log('date', data);
		// console.log(typeof data);
		console.log(date.toISOString().slice(0, 10));
		const day = date.toISOString().slice(0, 10);
		console.log('day', day);
		setVisitDate(date);
		setAllState({
			...allState,
			visited: day,
		});
	}

	/*별 점수 상태관리*/
	const [rateTaste, setRateTaste] = useState(''); //맛
	const [rateVibe, setRateVibe] = useState(''); //분위기
	const [rateService, setRateService] = useState(''); //서비스
	const [rateParking, setRateParking] = useState(''); //주차
	const [rateBathroom, setRateBathroom] = useState(''); //화장실
	const [rateAmenity, setRateAmenity] = useState(''); //편의시설

	//선택한 날짜 저장 state
	function selectDate(date) {
		// console.log('date', data);
		// console.log(typeof data);
		console.log(date.toISOString().slice(0, 10));
		const day = date.toISOString().slice(0, 10);
		console.log('day', day);
		setVisitDate(date);
		setAllState({
			...allState,
			visited: day,
		});
	}
	return (
		<div className='postingContainer'>
			<PostingUpload setAllState={setAllState} allState={allState} />
			<div className='selectAll'>
				<form>
					<input
						ref={cafenameRef}
						id='placeName'
						name='keyword'
						type='text'
						placeholder='매장명'
						onKeyUp={(e) => {
							cafeNameRe();
						}}
						onChange={getKeyword}
					/>
					{showCafeRe ? (
						<div
							className='cafeSearchResult'
							onBlur={(e) => {
								setShowCafeRe(false); //결과창 hide
							}}
						>
							<ul>
								{/* <li className="noResultItem">검색결과가 없습니다.</li> */}
								{console.log('cafe name: ')}
								{cafeInfo.name
									.filter((store) =>
										store.name.includes(keyword)
									)
									.map((it) => (
										<li
											key={it.id}
											className='cafeSearchResultItem'
											onClick={(e) => {
												setSelectCafe(it);
												setShowCafeRe(false);
												cafenameRef.current.value =
													it.name;
												// 카페id state관리
												setAllState({
													...allState,
													cafeId: it.id,
												});
											}}
										>
											{it.name}
										</li>
									))}
							</ul>
						</div>
					) : null}
				</form>

				{/* 선택된 매장명에 따라 주소 변경됨 */}
				{selectCafe !== undefined ? (
					<input
						id='placeAddress'
						type='text'
						placeholder='매장위치'
						value={selectCafe.address}
						onChange={getKeyword}
					/>
				) : (
					<input
						id='placeAddress'
						type='text'
						placeholder='매장위치'
						// value={keyword.address}
						onChange={getKeyword}
					/>
				)}

				<DatePicker
					id='visitDate'
					placeholderText='방문일'
					dateFormat='yyyy-MM-dd'
					selected={visitDate}
					locale='ko'
					onChange={selectDate}
				/>
				{console.log('data:', visitDate)}
			</div>
			{/* //현준 start*/}
			<button onClick={() => setModalIsOpen(true)}>등록버튼</button>
			{/* 카카오 장소 검색 api를 사용한 카페 검색 api */}
			<Modal isOpen={modalIsOpen}>
				<CafePopup onClickCafe={changeSelectCafe} />
				<button onClick={() => setModalIsOpen(false)}>x</button>
			</Modal>
			{/* 현준 end */}
			<div className='postingbar'></div>
			<div className='postingReview'>
				<p>별점을 매겨서 정보를 공유하세요!</p>
				{/* 영수증, 협찬 버튼 */}
				<Receipt_Sponser
					setAllState={setAllState}
					allState={allState}
				/>
			</div>
			<div className='postingStarContainer'>
				<div className='postingStar'>
					<PostingStar
						title='맛'
						setAllState={setAllState}
						allState={allState}
					/>
					<PostingStar title='분위기' />
					<PostingStar
						title='서비스'
						setRate={setRateService}
						rate={rateService}
					/>
					<PostingStar
						title='주차'
						setRate={setRateParking}
						rate={rateParking}
					/>
					<PostingStar
						title='편의시설'
						setRate={setRateBathroom}
						rate={rateBathroom}
					/>
					<PostingStar
						title='화장실'
						setRate={setRateAmenity}
						rate={rateAmenity}
					/>
				</div>
			</div>

			<div className='Posting'>
				<textarea
					// ref={textRef}
					value={contentText}
					onChange={(e) => setContentText(e.target.value)}
					// onInput={handleResizeHeight}
					placeholder='소개하는 글을 작성해보세요 :p'
				/>
			</div>
			<button id='uploadBtn' onClick={ClickPostingDone}>
				완료
			</button>
		</div>
	);
}

// function StarTitle(props) {
//   return (
//     <>
//       <div className="starItem">
//         <p>{props.title}</p>
//         <PostingStar />
//       </div>
//     </>
//   );
// }
export default Posting;
