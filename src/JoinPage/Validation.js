// import React from 'react';
// import axios from 'axios';

// const Validation = ({ joinInit, setIsPassword, setIsPasswordConfirm }) => {
//   console.log(joinInit);
//   let joinError = {};

//   //비밀번호 정규식
//   const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

//   //비밀번호
//   if (
//     joinInit.registerPassword.length > 0 &&
//     !passwordRegEx.test(joinInit.registerPassword)
//   ) {
//     joinError.registerPassword = '입력하신 정보를 확인해주세요.';
//     setIsPassword(false);
//   } else if (
//     joinInit.registerPassword.length > 0 &&
//     passwordRegEx.test(joinInit.registerPassword) === true
//   ) {
//     joinError.registerPassword = 'ok!';
//   }
//   //비밀번호 확인
//   if (joinInit.registerPassword === joinInit.passwordConfirm) {
//     joinError.passwordConfirm = '비밀번호를 똑같이 입력했어요 :p';
//     setIsPasswordConfirm(true);
//   } else {
//     joinError.passwordConfirm = '비밀번호가 틀려요. 다시 확인해주세요';
//     setIsPasswordConfirm(false);
//   }

//   return joinError;
// };

// export default Validation;
