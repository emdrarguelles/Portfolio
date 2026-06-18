import { Post } from '../../features/Feed/feedSlice';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div>
        	<p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.author}</p>
            <p>{post.score}</p>
            <p>{post.num_comments}</p>
            <p>{post.subreddit}</p>
            <p>{post.url}</p>
            <img src={post.thumbnail ?? undefined} alt={post.id} />
        </div>
            
    )
}

export default PostCard;