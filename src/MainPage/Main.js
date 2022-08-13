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
        <img
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
        </div>
      </div>
    </div>
  );
}

export default Main;
