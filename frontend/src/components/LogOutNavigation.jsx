import {Link} from 'react-router-dom';

function LogOutNavigation() {
    function handleLogOut() {
        const userKey = localStorage.key('groupomania_user');
        localStorage.removeItem(userKey)
    };

    return (
        <nav>
            <ul>
                <li><Link to='/newpost'>Créer un post</Link></li>
                <li><Link to='/' onClick={handleLogOut}>Déconnection</Link></li>
            </ul>
        </nav>
    )
};

export default LogOutNavigation;