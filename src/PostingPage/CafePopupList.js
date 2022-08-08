import axios from 'axios';

//검색된 카페들을 렌더링할 컴포넌트
const CafePopupList = ({ cafeList, onClickCafe }) => {
	const registCafe = (cafe) => {
		axios
			.post(
				'http://api.cpp.co.kr:3300/cafes',
				{
					name: cafe.name,
					address: cafe.address,
					lat: Number(cafe.lat),
					lng: Number(cafe.lng),
					phone: cafe.phone,
					openingHours: '',
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data);
				//성공했을 경우 Posting 컴포넌트의 cafeInfo state값을 변경
				onClickCafe({
					id: res.data.id,
					name: cafe.name,
					address: cafe.address,
					postId: null,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='cafePopupList'>
			<ul>
				{cafeList.map((cafe, index) => (
					<li
						className='poupListLi'
						key={index}
						onClick={() => {
							registCafe(cafe);
						}}
					>
						{cafe.name}, {cafe.address}
					</li>
				))}
			</ul>
		</div>
	);
};
export default CafePopupList;
