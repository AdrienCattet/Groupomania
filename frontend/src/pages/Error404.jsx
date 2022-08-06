import {Link} from 'react-router-dom';
import Logo from '../components/Logo';
import LogInNavigation from '../components/LogInNavigation';
import Error404Component from '../components/Error404';

import '../styles/header.css';
import '../styles/navigation.css';

function Error404() {
    return (
        <div id='bloc_page'>
            <header>
                <Link to='/'><Logo src='./assets/icon-left-font.png'/></Link>
                <LogInNavigation />
            </header>
            <Error404Component />
        </div>
    )
};

export default Error404;