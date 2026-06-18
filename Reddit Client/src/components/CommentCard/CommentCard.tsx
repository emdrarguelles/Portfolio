import { Comment } from '../../features/PostDetail/postDetailSlice';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <div>
        	<p>{comment.id}</p>
            <p>{comment.author}</p>
            <p>{comment.author_icon}</p>
            <p>{comment.body}</p>
            <p>{comment.score}</p>
        </div>
            
    )
}

export default CommentCard;