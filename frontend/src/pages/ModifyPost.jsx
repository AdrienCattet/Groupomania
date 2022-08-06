import {Link} from 'react-router-dom';
import Logo from '../components/Logo';
import LogOutNavigation from '../components/LogOutNavigation';
import ModifyPostForm from '../components/ModifyPostForm';

import '../styles/header.css';
import '../styles/navigation.css';
import '../styles/form.css';

function ModifyPost() {
    return(
        <div id='bloc_page'>
            <header>
                <Link to='/posts'><Logo src='../assets/icon-left-font.png'/></Link>
                <LogOutNavigation />
            </header>
            <section>
                <ModifyPostForm />
            </section>
        </div>
    )
};

export default ModifyPost;