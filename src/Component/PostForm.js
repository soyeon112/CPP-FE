import { Link } from 'react-router-dom';

const PostForm = (props) => {
	const clickedPostID = (e) => {
		console.log('id', props.key);
	};

	return (
		<>
			<div className='recoPost'>
				<Link to={`/post/${props.postId}`} onClick={clickedPostID}>
					{/* {`/post/${props.key}` */}
					<img
						className='recoPostImg'
						src={`${props.photoURL}`}
						width='185px'
						height='280px'
					/>
				</Link>
				<div className='recoPostUser'>
					<img
						className='recoPostUserImg'
						src={`${props.profileURL}`}
					/>
					<p className='recoPostUserName'>{props.nickname}</p>
				</div>
			</div>
		</>
	);
};

export default PostForm;
