import { search, searchTermSelector, fetchPostsBySearch, clearSearch } from './searchbarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Searchbar = () => {
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector(searchTermSelector);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim().length > 0) {
            dispatch(fetchPostsBySearch(searchTerm));
            dispatch(clearSearch());
        }
    }

    return (
        <div className="searchbar-container">
            <form onSubmit={onSubmit}>
                <input
                    className="searchbar-input"
                    type='text'
                    value={searchTerm}
                    onChange={(e) => dispatch(search(e.target.value))}
                    placeholder='Search...' 
                />
                <button className="searchbar-btn" type='submit'>Search</button>
            </form>

        </div>
    )
}

export default Searchbar;