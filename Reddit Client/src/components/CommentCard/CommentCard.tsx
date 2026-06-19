import { Comment } from '../../features/PostDetail/postDetailSlice';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <div className="comment-card">
            <p className="comment-author">u/{comment.author}</p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-score">▲ {comment.score}</p>
            {comment.replies.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map(reply => (
                        <CommentCard key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentCard;