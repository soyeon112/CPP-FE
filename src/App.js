import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

import Header from './Component/Header';
import Footer from './Component/Footer';
import Join from './JoinPage/Join';
import Policy from './JoinPage/Policy';
import Login from './LoginPage/LoginModal';
import Main from './MainPage/Main';
import MapList from './MapPage/MapList';
import Mypage from './MyPage/Mypage';
import ProfileModify from './MyPage/profileModify';
import UserDrop from './MyPage/UserDrop';
import PostPage from './PostPage/PostPage';
import Posting from './PostingPage/Posting';
import OtherPost from './Component/OtherPost';
import { PostIdContext } from './Context/PostIdContext';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const [contextPostId, setContextPostId] = useState();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <PostIdContext.Provider value={{ contextPostId, setContextPostId }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/modify" element={<ProfileModify />} />
            <Route path="/userdrop" element={<UserDrop />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/map" element={<MapList />} />
          </Routes>
        </PostIdContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
