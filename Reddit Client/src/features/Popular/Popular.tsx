import { useEffect } from 'react';
import { fetchPopularSubreddits, subredditsSelector, statusSelector } from './popularSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Popular = () => {
    const dispatch = useAppDispatch();
    const subreddits = useAppSelector(subredditsSelector);
    const status = useAppSelector(statusSelector);

    useEffect(() => {
        dispatch(fetchPopularSubreddits())
    },[])
    return (
        <>
           {subreddits.map(subreddit => (
            <div key={subreddit.name}>
                <img src={subreddit.icon ?? undefined} alt={subreddit.name} />
                <p>{subreddit.name}</p>
            </div>
            ))}
        </>
    )
}

export default Popular;