import Logo from '../components/Logo.jsx';
import LogOutNavigation from '../components/LogOutNavigation.jsx';
import DisplayPosts from '../components/DisplayPosts.jsx';

import '../styles/header.css';
import '../styles/navigation.css';
import '../styles/posts.css';

function Posts() {
    return (
        <div id='bloc_page'>
            <header>
                <Logo src='./assets/icon-left-font.png'/>
                <LogOutNavigation />
            </header>
            <DisplayPosts />
        </div>
    )
};

export default Posts;