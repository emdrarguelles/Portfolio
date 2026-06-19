import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchPostsById, postSelector, commentsSelector } from './postDetailSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CommentCard from '../../components/CommentCard/CommentCard';

const PostDetail = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelector);
    const comments = useAppSelector(commentsSelector);
    const { postId } = useParams();

    useEffect(() => {
       if (postId) {
        dispatch(fetchPostsById(postId))
        }
    },[postId, dispatch])

    
    if (!postId) {
        return <div>Post not found.</div>;
    }

    // Loading state (recommended)
    if (!post) {
        return <div>Loading post...</div>;
    }

 
    return (
        <>
            <div className="post-card">
                <p className="post-meta">r/{post.subreddit} • Posted by u/{post.author}</p>
                <p
                    className="post-title"
                    style={{ cursor: 'pointer' }}
                >
                    {post.title}
                </p>
                {post.thumbnail && (
                    <img
                        className="post-thumbnail"
                        src={post.thumbnail ?? undefined}
                        alt={post.title}
                    />
                )}
                <div className="post-actions">
                    <button className="post-action-btn">▲ {post.score}</button>
                    <button className="post-action-btn">💬 {post.num_comments} Comments</button>
                    <button className="post-action-btn">Share</button>
                </div>
            </div>
            <div>
                {comments?.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                )) || <p>No Comments yet.</p>}
            </div>
        </>
    );
};

export default PostDetail;