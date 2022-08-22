import React, { useState, useRef, useCallback } from 'react';
import './Posting.css';
import PostingUpload from './PostingUpload';
import DatePicker, { registerLocale } from 'react-datepicker';
import './DatePicker.css';
import PostingStar from './PostingStar';
import axios from 'axios';
import ReceiptSponser from './ReceiptSponser';
import ko from 'date-fns/locale/ko';
import Modal from 'react-modal';
import CafePopup from './CafePopup';
import { useNavigate } from 'react-router-dom';
registerLocale('ko', ko);

function Posting() {
  //방문일 state
  const [visitDate, setVisitDate] = useState('');
  //photoURLs 담아두는 state
  const [photoURLs, setPhotoURLs] = useState([]);
  //영수증 url state
  const [receiptURL, setReceiptURL] = useState('');
  // 스폰서 state
  const [isSponsored, setIsSponsored] = useState(false);
  //리스트중에서 선택된 카페 정보 저장해둘 state
  const [selectCafe, setSelectCafe] = useState({});
  //별점 상태관리 통합
  const [rate, setRate] = useState({});
  //모달창 오픈,클로즈 여부 state(카카오 장소 api 사용하여 카페정보 검색 모달창)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //search cafe
  //검색 데이터 저장 (axios로 받아온 데이터 저장)
  const [cafeInfo, setCafeInfo] = useState({});
  //카페명 검색결과 창
  const [showCafeRe, setShowCafeRe] = useState(false);
  //선택된 카페명 state
  const [selectedCafeName, setSelectedCafeName] = useState('');

  //본문내용 textarea 선택 ref
  const contentText = useRef();

  //네비게이터
  const navigate = useNavigate();

  //ReceiptSponsor 컴포넌트에 props로 전달해줄 함수(receiptURL state 변경용)
  const onClickReceiptAddBtn = useCallback((url) => {
    setReceiptURL(url);
  }, []);

  //ReceiptSponsor 컴포넌트에 props로 전달해줄 함수(isSponsored state 변경용)
  const onClickSponsorBtn = useCallback(() => {
    isSponsored ? setIsSponsored(false) : setIsSponsored(true);
  }, [isSponsored]);

  const onClickStar = useCallback(
    (property, value) => {
      setRate({ ...rate, [property]: value });
    },
    [rate]
  );

  const onAddPhoto = useCallback(
    (photoURL) => {
      setPhotoURLs([...photoURLs, photoURL]);
    },
    [photoURLs]
  );

  //검색창 데이터 get
  const getCafeData = useCallback(async (e) => {
    let keyword = e.target.value;
    setSelectedCafeName(keyword);
    console.log('들어옴?');
    if (keyword !== '') {
      try {
        const res = await axios.get(
          `http://api.cpp.co.kr:3300/cafes/search?keyword=${keyword}`
        );
        //axios가 비동기이기 떄문에 빠르게 지울경우 예외가 발생하는걸 방지하기 위해
        //추가한 코드(SearchBar.js 컴포넌트와 같음 )
        keyword = e.target.value;
        if (keyword !== '') {
          setShowCafeRe(true);
          setCafeInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowCafeRe(false);
      setCafeInfo({});
    }
  }, []);

  //포스팅 작성 완료 버튼
  const clickPostingDone = async () => {
    if (contentText.current.value === '') {
      console.log('text없음');
      alert('본문이 입력되지 않았습니다. 글을 입력해주세요.');
    } else {
      try {
        const response = await axios.post(
          'http://api.cpp.co.kr:3300/posts',
          {
            content: contentText.current.value,
            visited: visitDate.toISOString().slice(0, 10),
            photoURLs: photoURLs,
            ...(receiptURL && { receiptURL: receiptURL }),
            isSponsored: isSponsored,
            cafeId: selectCafe.id,
            rate: rate,
          },
          { withCredentials: true }
        );
        console.log(response.data.id);
        alert('작성 성공');
        //id값을 사용해서 해당 포스트 상세보기 페이지로 전환
        navigate('/post/' + response.data.id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  //모달창에서 리스트 요소(카페목록) 클릭시 selectCafe state 변경해주기위한 함수
  const changeSelectCafe = useCallback((cafe) => {
    console.log('cafe', cafe);
    setSelectCafe(cafe);
    setSelectedCafeName(cafe.name);
    setModalIsOpen(false);
  }, []);

  //선택한 날짜 저장 state
  const selectDate = useCallback((date) => {
    // console.log('date', data);
    // console.log(typeof data);
    console.log(date.toISOString().slice(0, 10));
    const day = date.toISOString().slice(0, 10);
    console.log('day', day);
    setVisitDate(date);
  }, []);

  return (
    <div className="postingContainer">
      {/* <PostingUpload setAllState={setAllState} allState={allState} /> */}
      <PostingUpload onAddPhoto={onAddPhoto} />
      <div className="selectAll">
        <form>
          <input
            value={selectedCafeName}
            id="placeName"
            name="keyword"
            type="text"
            placeholder="매장명"
            onChange={getCafeData}
          />
          {showCafeRe ? (
            <div
              className="cafeSearchResult"
              onBlur={() => {
                setShowCafeRe(false); //결과창 hide
              }}
            >
              <ul>
                {/* <li className="noResultItem">검색결과가 없습니다.</li> */}
                {console.log('cafe name: ')}
                {cafeInfo.name?.map((it) => (
                  <li
                    key={it.id}
                    className="cafeSearchResultItem"
                    onClick={(e) => {
                      setSelectCafe(it);
                      setSelectedCafeName(it.name);
                      setShowCafeRe(false);
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
        <input
          id="placeAddress"
          type="text"
          readOnly="true"
          placeholder="매장위치"
          value={selectCafe.address}
        />
        <DatePicker
          id="visitDate"
          placeholderText="방문일"
          dateFormat="yyyy-MM-dd"
          selected={visitDate}
          locale="ko"
          onChange={selectDate}
        />
        {console.log('data:', visitDate)}
      </div>

      {/* //현준 start*/}
      <button onClick={() => setModalIsOpen(true)}>등록버튼</button>
      {/* 카카오 장소 검색 api를 사용한 카페 검색 api */}
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            position: 'fixed',

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            width: '600px',
            top: '40px',
            left: '450px',
            right: '450px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
        }}
      >
        <p className="modalTitle">새로운 공간 추가하기</p>
        <div className="modalCafeNameSet">
          <p className="modalCafeName">카페명 : </p>
          <CafePopup onClickCafe={changeSelectCafe} />
        </div>

        <button className="modalCloseBtn" onClick={() => setModalIsOpen(false)}>
          x
        </button>
      </Modal>
      {/* 현준 end */}

      <div className="postingbar"></div>
      <div className="postingReview">
        <p>별점을 매겨서 정보를 공유하세요!</p>
        {/* 영수증, 협찬 버튼 */}
        <ReceiptSponser
          onClickSponsorBtn={onClickSponsorBtn}
          onClickReceiptAddBtn={onClickReceiptAddBtn}
        />
      </div>
      {/* 별점 section */}
      <div className="postingStarContainer">
        <div className="postingStar">
          {[
            { title: '맛', property: 'taste' },
            { title: '분위기', property: 'vibe' },
            { title: '서비스', property: 'service' },
            { title: '주차', property: 'parking' },
            { title: '화장실', property: 'bathroom' },
            { title: '편의시설', property: 'amenity' },
          ].map((item, index) => (
            <PostingStar
              key={index}
              title={item.title}
              property={item.property}
              onClickStar={onClickStar}
            />
          ))}
        </div>
      </div>
      {/* 본문내용 section */}
      <div className="Posting">
        <textarea
          ref={contentText}
          // onInput={handleResizeHeight}
          placeholder="소개하는 글을 작성해보세요 :p"
        />
      </div>
      <button id="uploadBtn" onClick={clickPostingDone}>
        완료
      </button>
    </div>
  );
}
export default Posting;
