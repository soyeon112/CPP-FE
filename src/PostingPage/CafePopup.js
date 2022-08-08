import CafePopupSearch from './CafePopupSearch';
import CafePopupList from './CafePopupList';
import { useState } from 'react';

//카페 검색 모달창에 렌더링할 컴포넌트
const CafePopup = ({ onClickCafe }) => {
	const [cafeList, setCafeList] = useState([]);

	const onChangeKeyword = (cafeList) => {
		setCafeList(cafeList);
	};

	return (
		<div>
			<CafePopupSearch onChangeKeyword={onChangeKeyword} />
			<CafePopupList cafeList={cafeList} onClickCafe={onClickCafe} />
		</div>
	);
};

export default CafePopup;
