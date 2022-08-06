import {Link} from 'react-router-dom';
import Logo from '../components/Logo';
import LogOutNavigation from '../components/LogOutNavigation';
import NewPostForm from '../components/NewPostForm';

import '../styles/header.css';
import '../styles/navigation.css';
import '../styles/form.css';

function NewPost() {
    return(
        <div id='bloc_page'>
            <header>
                <Link to='/posts'><Logo src='./assets/icon-left-font.png'/></Link>
                <LogOutNavigation />
            </header>
            <section>
                <NewPostForm />
            </section>
        </div>
    )
};

export default NewPost;