import PostCard from '../PostCard/PostCard';

interface Post {
    id: string;
    title: string;
    author: string;
    score: number;
    num_comments: number;
    subreddit: string;
    url: string;
    thumbnail: string;
}

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