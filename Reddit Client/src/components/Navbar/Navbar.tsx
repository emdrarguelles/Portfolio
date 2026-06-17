import Searchbar from '../../features/Searchbar/Searchbar';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Reddit Client</div>
            <Searchbar />
        </nav>
    )
}

export default Navbar;