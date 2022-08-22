import { Link } from 'react-router-dom';

const PostForm = (props) => {
  const clickedPostID = () => {
    console.log('id', props);
  };

  return (
    <>
      <div className="recoPost">
        <Link to={`/post/${props.postId}`} onClick={clickedPostID}>
          <img
            className="recoPostImg"
            src={`${props.photoURL}`}
            width="185px"
            height="280px"
          />
        </Link>
        <div className="recoPostImgSet">
          <p className="recoPostCafeName">{props.cafeName}</p>
        </div>
        <div className="recoPostUser">
          <img className="recoPostUserImg" src={`${props.profileURL}`} />
          <p className="recoPostUserName">{props.nickname}</p>
        </div>
      </div>
    </>
  );
};

export default PostForm;
