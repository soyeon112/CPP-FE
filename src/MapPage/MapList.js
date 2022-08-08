import React, { useEffect, useState, useRef } from 'react';
import './MapList.css';
import SearchBar from '../Component/SearchBar';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { kakao } = window;

const MapList = () => {
	const mapRef = useRef();
	const [cafesInCurMap, setCafesInCurMap] = useState();

	// let cafesInCurMap = null;
	const currentMapHandler = async () => {
		// 현재 지도 정보 설정
		const map = mapRef.current;
		const currentMapInfo = {
			swLatLng: {
				lat: map.getBounds().getSouthWest().getLat(),
				lng: map.getBounds().getSouthWest().getLng(),
			},
			neLatLng: {
				lat: map.getBounds().getNorthEast().getLat(),
				lng: map.getBounds().getNorthEast().getLng(),
			},
		};
		console.log(currentMapInfo.swLatLng.lat);

		// axios 요청
		const res = await axios.get(
			`http://api.cpp.co.kr:3300/cafes/map?swLat=${currentMapInfo.swLatLng.lat}&swLng=${currentMapInfo.swLatLng.lng}&neLat=${currentMapInfo.neLatLng.lat}&neLng=${currentMapInfo.neLatLng.lng}`
		);

		setCafesInCurMap(res.data);
		console.log(cafesInCurMap);
	};

	return (
		<>
			<div>
				<SearchBar placeholder={'지역 / 공간 이름을 입력해주세요.'} />
			</div>
			<div className='mapPageContainer'>
				<div className='mapPageTitle'>
					내 주변 카페 보기
					<button id='mapCurrentHandler' onClick={currentMapHandler}>
						현 위치 가져오기
					</button>
					<Map // 지도를 표시할 Container
						center={{
							// 지도의 중심좌표
							lat: 33.33,
							lng: 126.55,
						}}
						id='mapPage'
						level={11} // 지도의 확대 레벨
						ref={mapRef}
					>
						{cafesInCurMap &&
							cafesInCurMap.map((item, index) => (
								<>
									<MapMarker
										key={index}
										position={{
											lat: item.lat,
											lng: item.lng,
										}}
									>
										{/* {item.name} */}
									</MapMarker>
									<CustomOverlayMap
										position={{
											lat: item.lat,
											lng: item.lng,
										}}
										yAnchor={2.5}
									>
										<div id='markerName'>{item.name}</div>
									</CustomOverlayMap>
								</>
							))}
					</Map>
				</div>
				<div className='mapListTitle'>
					리스트 영역
					<div id='mapList'>
						{cafesInCurMap &&
							cafesInCurMap.map((item, index) => (
								<div key={index}>
									<img
										className='mapItemImg'
										src={item.photoURL}
										width={50}
										height={50}
									></img>
									<Link
										to={`/post/${item.postId}`}
										className='mapItemCafeName'
									>
										{item.name}
										<div className='mapItemCafeAddr'>
											{item.address}
										</div>
									</Link>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MapList;
