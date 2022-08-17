import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../MainPage/Main.css';
import axios from 'axios';

function SearchBar({ placeholder }) {
  const [showResult, setShowResult] = useState(false);
  const [getSearch, setGetSearch] = useState({});

  const keywordInput = useRef();

  const GetSearch = useCallback(async (keyword) => {
    if (keyword !== '') {
      console.log('search : ', keyword);
      const res = await axios.get(
        `http://api.cpp.co.kr:3300/cafes/search?keyword=${keyword}`,
        { withCredentials: true }
      );
      //검색 키워드를 빠르게 지울경우 axios가 비동기이기 때문에 이전 검색 결과가
      //남아 있는 경우가 있음 따라서 해당 부분 처리하기 위해 코드 추가
      if (keywordInput.current.value !== '') {
        setGetSearch(res.data);
        setShowResult(true);
      }
    } else {
      console.log('빈 문자열 ');
      setGetSearch({});
      setShowResult(false);
    }
  }, []);

  const onChangeText = useCallback(
    async (e) => {
      console.log(e.target.value);
      await GetSearch(e.target.value);
    },
    [GetSearch]
  );

  return (
    <div className="searchBar">
      <input
        id="searchBar"
        name="search"
        type="text"
        placeholder={placeholder}
        onChange={onChangeText}
        ref={keywordInput}
        // onKeyPress={onEnter} //enter key
      />
      <img
        id="searchIcon"
        src={`${process.env.PUBLIC_URL}/image/search-icon.png`}
        alt="검색아이콘"
      />

      {/* 검색창 클릭시 검색결과 리스트 출력 */}
      {showResult ? (
        <div
          className="searchResult"
          onBlur={(e) => {
            console.log('되냐?');
            setShowResult(false);
          }}
        >
          <div className="SectionBar"></div>
          <div>
            <p className="resultTitle">카페별</p>
            <ul>
              {getSearch.name?.map((it, index) => (
                <Link key={index} to={`/post/${it.postId}`}>
                  <li className="searchresultItem">
                    {it.name}
                    <div className="resultAddr">{it.address}</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div>
            <p className="resultTitle">지역별</p>
            <ul>
              {getSearch.address?.map((it, index) => (
                <Link key={index} to={`/post/${it.postId}`}>
                  <li className="searchresultItem">
                    {it.name}
                    <div className="resultAddr">{it.address}</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
