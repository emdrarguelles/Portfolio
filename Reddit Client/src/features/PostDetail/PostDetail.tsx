import { useEffect } from 'react';
import { fetchPostsById, postSelector, commentsSelector } from './postDetailSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CommentCard from '../../components/CommentCard/CommentCard';

const PostDetail = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelector);
    const comment = useAppSelector(commentsSelector);

    useEffect(() => {
        dispatch(fetchPostsById())
    },[])
    
    return (
        <>
            {comment.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
            ))}
        </>
    )
}

export default PostDetail;