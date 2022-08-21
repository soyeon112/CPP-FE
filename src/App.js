import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css';

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

function App() {
  const userID = sessionStorage.getItem('id');
  console.log('app.js 유저 아이디', userID);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/post/:id" element={<PostPage userID={userID} />} />
          <Route path="/mypage" element={<Mypage userID={userID} />} />
          <Route path="/modify" element={<ProfileModify userID={userID} />} />
          <Route path="/userdrop" element={<UserDrop userID={userID} />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/map" element={<MapList />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
