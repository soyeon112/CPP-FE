import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profileModify.css';

function ProfileModify() {
  axios.defaults.withCredentials = true;

  const [modiState, setModiState] = useState({
    nickName: '',
    newPW: '',
    checkNewPW: '',
  });

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

  const ModifyNick = () => {
    console.log('con1', modiState.nickName);
    axios({
      method: 'PATCH',
      url: 'http://api.cpp.co.kr:3300/users/8',
      data: {
        nickname: modiState.nickName,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const ModifyPw = () => {
    console.log('con2', modiState.newPW);
    console.log(modiState);
    axios({
      method: 'PATCH',
      url: 'http://api.cpp.co.kr:3300/users/8',
      data: {
        password: modiState.newPW,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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

  const [clickNick, setClicknick] = useState(true);
  const [clickPW, setClickPW] = useState(false);

  const clickTab_Nick = () => {
    setClicknick(true);
    setClickPW(false);
    console.log('click nick');
  };

  const clickTab_PW = () => {
    setClicknick(false);
    setClickPW(true);
    console.log('click pw');
  };

  const inputFile = useRef();
  // const fileUpload = (e) => {
  //   console.log('value', inputFile.current.value);

  //   axios({
  //     method: 'PATCH',
  //     url: 'http://api.cpp.co.kr:3300/users/8',
  //     data: {
  //       profileURL: inputFile.current.value,
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  const ChangePhoto = () => {
    const [prePhoto, setPrePhoto] = useState();
    const [crrPhoto, setCrrPhoto] = useState();

    if (!prePhoto.value) {
      setCrrPhoto(inputFile.current.value); //새로 첨부된 파일 명
    } else {
      setPrePhoto(crrPhoto); //현재 첨부된 파일명을 이전파일명으로 보내고
      setCrrPhoto(inputFile.current.value); //새로 첨부된 파일 명
    }

    if (prePhoto === crrPhoto) {
      console.log('둘이 같음');
    } else {
      console.log('둘이 다름');
    }
  };

  return (
    <div>
      <div className="profilePhotoModi">
        <img
          className="ModiprofileImg"
          src={`${process.env.PUBLIC_URL}/image/ex-img.jpg`}
        />
        <div className="btnAndInfo">
          <div className="profileModiBtn">
            <div className="profileInputSet">
              <input
                type="file"
                accept="image/*"
                className="profileInputBtn"
                ref={inputFile}
                onChange={console.log('dddddddd')}
              />
              <button className="photoModiBtn" onClick={ChangePhoto}>
                프로필 사진 변경
              </button>
            </div>
            <button className="photoDeleteBtn">삭제</button>
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
