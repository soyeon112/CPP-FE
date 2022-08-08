import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../MainPage/Main.css';
import axios from 'axios';
import { PostIdContext } from '../Context/PostIdContext';

function SearchBar({ placeholder, data }) {
	const { contextPostId, setContextPostId } = useContext(PostIdContext);

	const [search, setSearch] = useState('');
	const [showResult, setShowResult] = useState(false);
	const changeText = (e) => {
		setSearch(e.target.value);
		// GetSearch();
		console.log(e.target.value);
	};
	const searchResults = () => {
		setShowResult(true);
	};

	const initDataSearch = {
		name: [
			{
				id: null,
				name: null,
				address: null,
				postId: null,
			},
		],
		address: [
			{
				id: null,
				name: null,
				address: null,
				postId: null,
			},
		],
	};

	axios.defaults.withCredentials = true;
	const [getSearch, setGetSearch] = useState(initDataSearch);
	const GetSearch = async () => {
		console.log('search : ', search);
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/cafes/search?keyword=${search}`
		);
		setGetSearch(res.data);
		console.log('getSearch1 : ', getSearch);
	};

	useEffect(() => {
		GetSearch();
	}, []);

	// const onEnter = (e) => {
	//   if (e.key === 'Enter') {
	//     GetSearch(); //엔터 클릭하면 axios실행
	//     console.log('enter click');
	//   }
	// };
	const contextSet = (it) => {
		// const clickedPostId = useContext(it.postId);
	};
	return (
		<div className='searchBar'>
			<input
				id='searchBar'
				name='search'
				type='text'
				placeholder={placeholder}
				value={search}
				onKeyUp={(e) => {
					{
						searchResults();
					}
				}}
				onChange={changeText}
				// onKeyPress={onEnter} //enter key
			/>
			<img
				id='searchIcon'
				src={`${process.env.PUBLIC_URL}/image/search-icon.png`}
				alt='검색아이콘'
			/>

			{/* 검색창 클릭시 검색결과 리스트 출력 */}
			{showResult ? (
				<div
					className='searchResult'
					onBlur={(e) => {
						console.log('되냐?');
						setShowResult(false);
					}}
				>
					<div className='SectionBar'></div>
					<div>
						<p className='resultTitle'>카페별</p>
						<ul>
							{getSearch.name
								.filter(
									(store) =>
										store.name.includes(search) &&
										store.postId !== null
								)
								.map((it) => (
									<Link to={`/post/${it.postId}`}>
										<li
											key={it.id}
											className='searchresultItem'
											onClick={contextSet(it)} //선택한 검색어의 postid를 context에 저장
										>
											{it.name}
											<div className='resultAddr'>
												{it.address}
											</div>
										</li>
									</Link>
								))}
						</ul>
					</div>

					<div>
						<p className='resultTitle'>지역별</p>
						<ul>
							{getSearch.address
								.filter(
									(store) =>
										store.address.includes(search) &&
										store.postId !== null
								)
								.map((it) => (
									<Link to={`/post/${it.id}`}>
										<li
											key={it.id}
											className='searchresultItem'
										>
											{it.name}
											<div className='resultAddr'>
												{it.address}
											</div>
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
