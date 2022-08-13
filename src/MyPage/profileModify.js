import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profileModify.css';

// #### 회원정보 수정 페이지

function ProfileModify({ userID }) {
  axios.defaults.withCredentials = true;

  console.log('userID', userID);

  const [modiState, setModiState] = useState({
    nickName: '',
    newPW: '',
    checkNewPW: '',
  });

  const defaultProfileImg = process.env.PUBLIC_URL + '/image/profile-icon.png'; //기본 프로필 이미지
  //화면 오픈 될때 회원 정보 가져오기
  const [userInfo, setUserInfo] = useState([]);
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
    console.log(e.target.name + ' : ' + e.target.value);
  };

  //새 비밀번호 확인
  const correctPW = (e) => {
    console.log(ModifyInput.newPW.value);

    // if(this.newPW.value === this.checkNewPW.value){
    //   console.log('비밀번호 일치');
    // }else{
    //   console.log('일치하지 않음');
    // }
  };
  const checkNickname = () => {
    console.log('닉네임 중복확인');
    // axios({
    //   method : 'GET',
    //   url : 'http://api.cpp.co.kr:3300/users/nickname?nickname=soyeon1111',
    //   data: {
    //     nickname: modiState.nickName,
    //   },
    // }).then((res) => console.log(res))
    // .catch((err) => console.log(err));
  };

  //비밀번호 / 닉네임 변경 탭 클릭시
  const [clickNick, setClicknick] = useState(true);
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

  /* --- axios --- */
  //닉네임 변경 axios
  const ModifyNick = () => {
    console.log('con1', modiState.nickName);
    axios({
      method: 'PATCH',
      url: `http://api.cpp.co.kr:3300/users/${userID}`,
      data: {
        nickname: modiState.nickName,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //비밀번호 변경 axios
  const ModifyPw = () => {
    console.log('con2', modiState.newPW);
    console.log(modiState);
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
  const inputProfileImg = useRef();

  const onClickProfileUpload = () => {
    inputProfileImg.current.click();
  };

  //선택한 이미지 저장해서 src에 전달
  const [previewProfile, setPreviewProfile] = useState('');
  //파일 선택 여부 관리
  const [profileState, setProfileState] = useState(false);

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
              <input type="text" name="nickName" onChange={handleChange} />
              <p className="inputInfo">
                한글, 영문, 숫자 혼용가능 (2 ~ 20 자 이내)
              </p>
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
              <ModifyInput
                title="새 비밀번호"
                name="newPW"
                onChange={handleChange}
                type="password"
                info="8 ~ 20자 이내로 입력해주세요."
              />
              <ModifyInput
                title="새 비밀번호 확인"
                name="checkNewPW"
                onChange={handleChange}
                type="password"
              />
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

//닉네임 수정 폼 (버튼때문에 따로 뺌)
// function ModifyNickName(props){
//   return(
//     <>
//     <div className='Inputs'>
//       <div className='ModiNickName'>
//         <p>{props.title}</p>
//         <input type={props.type} name={props.name} onChange={props.onChange}/>
//         <p className='inputInfo'>{props.info}</p>
//         <button onClick={checkNickname}>중복확인</button>
//       </div>
//     </div>
//     </>
//   )
// }

//그외 수정 폼
function ModifyInput(props) {
  return (
    <>
      <div className="Inputs">
        <div className="ModiItem">
          <p>{props.title}</p>
          <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
          />
          <p className="inputInfo">{props.info}</p>
        </div>
      </div>
    </>
  );
}

export default ProfileModify;
