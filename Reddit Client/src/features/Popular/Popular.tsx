import { useEffect } from 'react';
import { fetchPopularSubreddits, subredditsSelector } from './popularSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSubreddit } from '../Feed/feedSlice';

const Popular = () => {
    const dispatch = useAppDispatch();
    const subreddits = useAppSelector(subredditsSelector);

    useEffect(() => {
        dispatch(fetchPopularSubreddits())
    },[dispatch])
    return (
        <>
           {subreddits.map(subreddit => (
            <div key={subreddit.name} className="subreddit-item">
                <div className="subreddit-icon" />
                <span className="subreddit-name" onClick={() => dispatch(selectSubreddit(subreddit.name))}>{subreddit.name}</span>
            </div>
            ))}
        </>
    )
}

export default Popular;