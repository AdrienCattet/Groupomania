import {Link} from 'react-router-dom';

function LogInNavigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Connection</Link></li>
                <li><Link to="/signup">Créer un compte</Link></li>
            </ul>
        </nav>
    )
};

export default LogInNavigation;