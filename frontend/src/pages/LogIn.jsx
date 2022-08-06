import {Link} from 'react-router-dom';
import Logo from '../components/Logo';
import LogInForm from '../components/LogInForm';

import '../styles/header.css';
import '../styles/form.css';

function LogIn() {
    return ( 
        <div id='bloc_page'>
            <header>
                <Link to='/'><Logo src='./assets/icon-left-font.png'/></Link>
            </header>
            <section>
                <LogInForm />
            </section>
        </div>
    )
};

export default LogIn;