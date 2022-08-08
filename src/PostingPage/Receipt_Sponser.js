import React, { useRef, useState } from 'react';
import './Posting.css';
import axios from 'axios';

function Receipt_Sponser({ setAllState, allState }) {
  //영수증 첨부

  const [saveReceipt, setSaveReceipt] = useState();

  //협찬여부 토글 버튼
  const SponToggle = () => {
    console.log('toggle 1');
    if (toggleBtn === true) {
      setToggleBtn(false);
      setAllState({
        ...allState,
        isSponsored: false,
      });
    } else {
      setToggleBtn(true);
      setAllState({
        ...allState,
        isSponsored: true,
      });
    }
  };
  const [toggleBtn, setToggleBtn] = useState(false);

  const addReceipt = async (e) => {
    const receiptFormData = new FormData();
    console.log(e.target.files[0]);
    const receiptImg = e.target.files[0];
    receiptFormData.append('photo', receiptImg);
    setSaveReceipt(receiptImg);

    // let receiptUrl = allState.receiptURL; // 응답받은 영수증 image Url 담기

    await axios({
      method: 'POST',
      url: 'http://api.cpp.co.kr:3300/posts/photo',
      data: receiptFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
      .then((res) => {
        const receiptImg = res.data.photoURL;
        setAllState({
          ...allState,
          receiptUrl: receiptImg,
        });
        console.log('receipt', receiptImg);
      })
      .catch((err) => console.log(err));
  };

  console.log('state', allState);

  const inputImgBtn = useRef();

  const onClickImgUpload = (e) => {
    inputImgBtn.current.click();
    console.log('1111 click');
  };

  const handleAddImages = (e) => {
    const receipt = e.target.files;
    // const currentImageUrl = URL.createObjectURL(receipt);
    setSaveReceipt(receipt);
  };

  return (
    <>
      <div className="adversponBtn">
        <div className="receiptDiv">
          <label
            htmlFor="input-file"
            onClick={onClickImgUpload}
            onChange={handleAddImages}
          >
            <button id="authReceiptBtn">영수증</button>
          </label>
          <input
            ref={inputImgBtn}
            type="file"
            className="reciptInput"
            accept="image/jpg, image/png, image/jpeg"
            onChange={addReceipt} //axios post
          />
          {saveReceipt ? (
            <p className="receiptResult">영수증이 첨부되었습니다.</p>
          ) : null}
        </div>
        {toggleBtn ? (
          <button id="sponserBtnYes" onClick={SponToggle}>
            협찬/광고
          </button>
        ) : (
          <button id="sponserBtnNo" onClick={SponToggle}>
            협찬/광고
          </button>
        )}
      </div>
    </>
  );
}

export default Receipt_Sponser;
