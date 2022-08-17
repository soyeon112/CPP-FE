import React, { useRef, useState } from 'react';
import './Posting.css';
import axios from 'axios';

function ReceiptSponser({ onClickSponsorBtn, onClickReceiptAddBtn }) {
  //영수증 첨부 여부 state
  const [isReceiptAdded, setIsReceiptAdded] = useState(false);
  //toggle btn state
  const [toggleBtn, setToggleBtn] = useState(false);

  //협찬여부 토글 버튼
  const sponToggle = () => {
    console.log('toggle 1');
    toggleBtn ? setToggleBtn(false) : setToggleBtn(true);
    onClickSponsorBtn();
  };

  const addReceipt = async (e) => {
    const receiptFormData = new FormData();
    console.log(e.target.files[0]);
    const receiptImg = e.target.files[0];
    console.log('receipt', receiptImg);
    receiptFormData.append('photo', receiptImg);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://api.cpp.co.kr:3300/posts/photo',
        data: receiptFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      onClickReceiptAddBtn(res.data.photoURL);
      setIsReceiptAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const inputImgBtn = useRef();

  const onClickImgUpload = (e) => {
    inputImgBtn.current.click();
    console.log('1111 click');
  };

  const handleAddImages = () => {
    // const currentImageUrl = URL.createObjectURL(receipt);
    setIsReceiptAdded(true);
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
          {isReceiptAdded ? (
            <p className="receiptResult">영수증이 첨부되었습니다.</p>
          ) : null}
        </div>
        <button
          id={toggleBtn ? 'sponserBtnYes' : 'sponserBtnNo'}
          onClick={sponToggle}
        >
          협찬/광고
        </button>
      </div>
    </>
  );
}

export default ReceiptSponser;
