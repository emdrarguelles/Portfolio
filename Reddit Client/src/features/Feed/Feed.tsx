import { useEffect } from 'react';
import { fetchPostsBySubreddit, postSelector, selectedSubredditSelector, statusSelector } from './feedSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Posts from '../../components/Posts/Posts';

const Feed = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelector);
    const selectedSubreddit = useAppSelector(selectedSubredditSelector);
    const status = useAppSelector(statusSelector);

    useEffect(() => {
        dispatch(fetchPostsBySubreddit());
    },[])

    return (
        <div className="feed">
            <Posts post={post} selectedSubreddit={selectedSubreddit} status={status}  />
        </div>
    )
}

export default Feed;