import axios from 'axios';
import './CafePopupSearch.css';

//카페 검색 바 컴포넌트
const CafePopupSearch = ({ onChangeKeyword }) => {
	const searchCafesToKakao = (e) => {
		const cafeKeyword = e.target.value;
		if (e.target.value === '') {
			onChangeKeyword([]);
		}
		axios
			.get(
				`https://dapi.kakao.com/v2/local/search/keyword.json?query=${cafeKeyword}&category_group_code=CE7`,
				{
					headers: {
						Authorization:
							'KakaoAK 28b0ed1622ad7f615d58b53ab77837ed',
					},
					withCredentials: false,
				}
			)
			.then((res) => {
				console.log(res);
				console.log(res.data.documents);
				let cafeList = res.data.documents;
				cafeList = cafeList.map((cafe) => {
					return {
						name: cafe.place_name,
						address: cafe.address_name,
						lat: cafe.y,
						lng: cafe.x,
						phone: cafe.phone,
					};
				});
				onChangeKeyword(cafeList);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<input
				className='cafeAddInput'
				type='text'
				onChange={searchCafesToKakao}
				placeholder='검색할 카페명을 입력해주세요.'
			/>
		</>
	);
};
export default CafePopupSearch;
