import { useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import { Post } from '../../features/Feed/feedSlice';
import { resultsSelector, clearPost } from '../../features/Searchbar/searchbarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface PostsProps {
    post: Post[];
    selectedSubreddit: string;
    status: string;
}

const Posts = ({ post, selectedSubreddit }: PostsProps) => {
    const dispatch = useAppDispatch();
    const results = useAppSelector(resultsSelector);

    useEffect(() => {
        dispatch(clearPost());

    },[selectedSubreddit, dispatch])

    return (
        <>  
            { results.length > 0 ? 
                results.map(result => (
                    <PostCard key={result.id} post={result} />
                )) : post.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            }
        </>
    )
}

export default Posts;