import {Link} from 'react-router-dom';
import Logo from '../components/Logo';
import SignUpForm from '../components/SignUpForm';

import '../styles/header.css';
import '../styles/form.css';

function SignUp() {
    return (
        <div id='bloc_page'>
            <header>
                <Link to='/'><Logo src='./assets/icon-left-font.png'/></Link>
            </header>
            <section>
                <SignUpForm /> 
            </section>
        </div>
    )
};

export default SignUp;