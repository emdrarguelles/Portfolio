import { Post } from '../../features/Feed/feedSlice';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="post-card">
            <p className="post-meta">r/{post.subreddit} • Posted by u/{post.author}</p>
            <p className="post-title" onClick={() => navigate(`/post/${post.id}`)} >{post.title}</p>
            <img className="post-thumbnail" src={post.thumbnail ?? undefined} alt={post.title} />
            <div className="post-actions">
                <button className="post-action-btn">▲ {post.score}</button>
                <button className="post-action-btn">💬 {post.num_comments} Comments</button>
                <button className="post-action-btn">Share</button>
            </div>
        </div>
            
    )
}

export default PostCard;