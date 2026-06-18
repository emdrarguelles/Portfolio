import { Post } from '../../features/Feed/feedSlice';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="post-card">
            <p className="post-meta">r/{post.subreddit} • Posted by u/{post.author}</p>
            <p className="post-title">{post.title}</p>
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