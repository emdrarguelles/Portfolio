import PostCard from '../PostCard/PostCard';
import { Post } from '../../features/Feed/feedSlice';

interface PostsProps {
    post: Post[];
    selectedSubreddit: string;
    status: string;
}

const Posts = ({ post }: PostsProps) => {
    return (
        <>
            {post.map(post => (
            <PostCard key={post.id} post={post} />
            ))}
        </>
    )
}

export default Posts;