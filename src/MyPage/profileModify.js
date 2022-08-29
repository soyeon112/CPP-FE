import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profileModify.css';

function ProfileModify({ userID }) {
  axios.defaults.withCredentials = true;

  const [modiState, setModiState] = useState({
    nickName: '',
    newPW: '',
    checkNewPW: '',
  });
  //기본 프로필 이미지
  const defaultProfileImg = process.env.PUBLIC_URL + '/image/profile-icon.png';
  //input창 아래 error 메세지
  const [modiError, setModiError] = useState({});
  //닉네임 중복확인
  const [isModiNick, setIsModiNIck] = useState(false);
  //회원정보 가져오기
  const [userInfo, setUserInfo] = useState([]);
  //선택한 이미지 저장해서 src에 전달
  const [previewProfile, setPreviewProfile] = useState('');
  //파일 선택 여부 관리
  const [profileState, setProfileState] = useState(false);
  //프로필사진 변경
  const inputProfileImg = useRef();
  //닉네임 탭
  const [clickNick, setClicknick] = useState(true);
  //비밀번호 탭
  const [clickPW, setClickPW] = useState(false);
  //닉네임 탭 클릭
  const clickTab_Nick = () => {
    setClicknick(true);
    setClickPW(false);
    console.log('click nick');
  };

  //비밀번호 탭 클릭
  const clickTab_PW = () => {
    setClicknick(false);
    setClickPW(true);
    console.log('click pw');
  };

  //화면 오픈 될때 회원 정보 가져오기
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://api.cpp.co.kr:3300/users/${userID}`,
      data: {
        id: userID,
      },
      withCredentials: true,
    })
      .then((res) => {
        setUserInfo(res.data);
        console.log('userID', userID);
        //처음 회원가입 후 프로필 설정 되어있지 않을때(기본 프로필 이미지로 설정됨)
        if (res.data.profileURL === null) {
          res.data.profileURL = defaultProfileImg;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setModiState({
      ...modiState,
      [e.target.name]: e.target.value,
    });
  };

  //닉네임 변경 axios
  const ModifyNick = () => {
    axios({
      method: 'PATCH',
      url: `http://api.cpp.co.kr:3300/users/${userID}`,
      data: {
        nickname: modiState.nickName,
      },
    })
      .then((res) => window.alert(res.data.message))
      .catch((err) => window.alert(err.response.data.message));
  };

  //비밀번호 변경 axios
  const ModifyPw = () => {
    axios({
      method: 'PATCH',
      url: `http://api.cpp.co.kr:3300/users/${userID}`,
      data: {
        password: modiState.newPW,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //프로필사진 변경 axios
  const ModiProfileImg = async (profilePhotoURL) => {
    console.log('type', typeof profilePhotoURL);
    await axios({
      method: 'PATCH',
      url: `http://api.cpp.co.kr:3300/users/${userID}`,
      data: {
        profileURL: profilePhotoURL,
      },
    })
      .then((res) => alert('프로필 변경 완료!'))
      .catch((err) => console.log(err));
  };

  /* --- 프로필 사진 변경 --- */
  const onClickProfileUpload = () => {
    inputProfileImg.current.click();
  };

  //파일 선택되었을때 axios전송 & 변경된 사진으로 이미지 변경됨
  const postProfileImage = async (e) => {
    console.log('postProfileImage : ', e.target.files[0]);

    const file = e.target.files;
    const formData = new FormData();

    console.log('file[0] : s', file);
    setPreviewProfile(URL.createObjectURL(file[0]));
    console.log('b url: ', previewProfile);

    console.log(file[0]);
    formData.append('photo', file[0]);
    setProfileState(true);

    await axios({
      method: 'POST',
      url: 'http://api.cpp.co.kr:3300/users/photo',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
      .then((res) => {
        let profilePhotoURL = res.data.photoURL;
        console.log(profilePhotoURL);
        ModiProfileImg(profilePhotoURL);
      })
      .catch((err) => console.log(err));
  };

  //사진 삭제 버튼 클릭시  (프로필 사진 삭제 버튼을 빼버려서 함수 사용은 안됨.)
  const onClickDeleteImg = () => {
    setProfileState(false); //기본 프로필 이미지로 변경
  };

  //******************닉네임 중복확인******************
  const checkNickname = async (e) => {
    const nicknameRegEx = /^[가-힣A-Za-z0-9]{2,20}$/; //영문자, 숫자만 가능
    console.log(modiState.nickName);
    if (
      modiState.nickName.length > 0 &&
      !nicknameRegEx.test(modiState.nickName)
    ) {
      const newModiError = {
        ...modiError,
        nickName: '입력하신 정보를 확인해주세요.',
      };
      setModiError(newModiError);
      setIsModiNIck(false);
      return;
    }

    try {
      const res = await axios({
        method: 'get',
        url: `http://api.cpp.co.kr:3300/users/nickname?nickname=${modiState.nickName}`,
        withCredentials: true,
      });
      if (res.status === 200) {
        const newModiError = {
          ...modiError,
          nickName: '사용할 수 있는 닉네임입니다.',
        };
        setModiError(newModiError);
        setIsModiNIck(true);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        const newModiError = {
          ...modiError,
          nickName: err.response.data.message,
        };
        setModiError(newModiError);
        setIsModiNIck(false);
      }
    }
  };

  //***************** 새 비밀번호 ***************
  //비밀번호 정규식
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  //새 비밀번호
  if (modiState.newPW.length > 0 && !passwordRegEx.test(modiState.newPW)) {
    modiError.newPW = '입력하신 정보를 확인해주세요.';
    //setIsPassword(false);
  } else if (
    modiState.newPW.length > 0 &&
    passwordRegEx.test(modiState.newPW) === true
  ) {
    modiError.newPW = 'ok!';
    //setIsPassword(true);
  }
  //***************** 비밀번호 확인***************
  if (
    modiState.checkNewPW.length > 0 &&
    modiState.newPW === modiState.checkNewPW
  ) {
    modiError.checkNewPW = '비밀번호를 똑같이 입력했어요 :p';
    //setIsPasswordConfirm(true);
  } else if (
    modiState.checkNewPW.length > 0 &&
    modiState.newPW !== modiState.checkNewPW
  ) {
    modiError.checkNewPW = '비밀번호가 틀려요. 다시 확인해주세요';
    //setIsPasswordConfirm(false);
  }

  return (
    <div>
      <div className="profilePhotoModi">
        {profileState ? (
          <img
            className="modiprofileImg"
            src={previewProfile}
            alt={'profileimg'}
          />
        ) : (
          <img className="modiprofileImg" src={userInfo.profileURL} />
        )}
        <div className="btnAndInfo">
          <div className="profileModiBtn">
            <div className="profileInputSet">
              <label htmlFor="input-file">
                <button className="photoModiBtn" onClick={onClickProfileUpload}>
                  프로필 사진 변경하기
                </button>
                <input
                  ref={inputProfileImg}
                  type="file"
                  accept="image/*"
                  className="profileInputBtn"
                  onChange={postProfileImage}
                />
              </label>
            </div>
            {/* <button className="photoDeleteBtn" onClick={onClickDeleteImg}>
              현재 사진 삭제
            </button> */}
          </div>
          <div className="profileModiInfo">
            <p>프로필 사진은 원형 94px 썸네일로 생성됩니다. </p>
            <p>
              다른 사람이 프로필을 볼 수 있습니다. <br /> 프로필 영역에
              노출됩니다.
            </p>
          </div>
          <Link to="/userdrop">
            <p className="dropOutBtn">회원탈퇴하기</p>
          </Link>
        </div>
      </div>

      <div className="modifyTab">
        <p className="nick_Tab" onClick={clickTab_Nick}>
          닉네임 변경
        </p>
        <p className="pw_Tab" onClick={clickTab_PW}>
          비밀번호 변경
        </p>
      </div>
      <div className="bar_width900"></div>

      <div className="modifyPlace">
        {clickNick ? (
          <div className="Inputs">
            <div className="ModiNickName">
              <p>닉네임</p>
              <input
                type="text"
                name="nickName"
                placeholder="한글, 영문, 숫자 혼용가능 (2 ~ 20 자 이내)"
                onChange={handleChange}
              />

              {modiError.nickName && (
                <p className="inputInfo">{modiError.nickName}</p>
              )}
              <button onClick={checkNickname}>중복확인</button>
            </div>
            <div className="okBtnDiv">
              <button className="modifyBtn" onClick={ModifyNick}>
                변경하기
              </button>
            </div>
          </div>
        ) : null}

        {clickPW ? (
          <>
            <div>
              <div className="Inputs">
                <div className="ModiItem">
                  <p>새 비밀번호</p>
                  <input
                    type="password"
                    name="newPW"
                    placeholder="8자 이상 20자 이내로 작성해주세요"
                    onChange={handleChange}
                  />
                  {modiError.newPW && (
                    <p className="inputInfo">{modiError.newPW}</p>
                  )}
                </div>
              </div>

              <div className="Inputs">
                <div className="ModiItem">
                  <p>새 비밀번호 확인</p>
                  <input
                    type="password"
                    name="checkNewPW"
                    onChange={handleChange}
                  />
                  {modiError.checkNewPW && (
                    <p className="inputInfo">{modiError.checkNewPW}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="okBtnDiv">
              <button className="modifyBtn" onClick={ModifyPw}>
                변경하기
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileModify;
