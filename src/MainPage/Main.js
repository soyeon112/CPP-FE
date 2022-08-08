import Reacet from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import SearchBar from '../Component/SearchBar';
import RecoPost from '../Component/RecoPost';

function Main() {
  return (
    <div>
      <SearchBar
        placeholder={'지역 / 공간 이름을 입력해주세요.'} /*data = {Store}*/
      />
      <div className="mainBanner">
        {/* <img
          src={`${process.env.PUBLIC_URL}/image/banner1-ver2.png`}
          width="100%"
        /> */}
        <img
          // src={`${process.env.PUBLIC_URL}/image/banner2-ver2-1.png`}
          src={`${process.env.PUBLIC_URL}/image/cpp-banner2.png`}
          width="1200px"
        />
        <Link to="/map">
          <img
            className="mainBannerBtn"
            src={`${process.env.PUBLIC_URL}/image/main-banner-btn.png`}
          />
        </Link>
      </div>
      <div className="recommendPost">
        <div className="recoText">
          <p>TODAY C:P:P PICK♥</p>
        </div>
        <div>
          <RecoPost />
          {/*  
          ------------left, right slider btn---------------- < >
          <div className='reco_Btn'>  
            <img src={`${process.env.PUBLIC_URL}/image/left-icon.png`}/>
            <img src={`${process.env.PUBLIC_URL}/image/right-icon.png`}/>
          </div> 
          */}
        </div>
      </div>
    </div>
  );
}

export default Main;
