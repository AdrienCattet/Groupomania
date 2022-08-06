import {Link} from 'react-router-dom';
import Logo from "../components/Logo.jsx";
import LogOutNavigation from '../components/LogOutNavigation.jsx';
import DisplayPost from '../components/DisplayPost.jsx';

import '../styles/header.css';
import '../styles/navigation.css';
import '../styles/posts.css';

function Post() {
    return (
        <div id='bloc_page'>
            <header>
                <Link to='/posts'><Logo src="../assets/icon-left-font.png"/></Link>
                <LogOutNavigation />
            </header>
            <DisplayPost />
        </div>
    )
};

export default Post;