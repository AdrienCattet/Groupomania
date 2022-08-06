import Logo from '../components/Logo.jsx';
import LogInNavigation from '../components/LogInNavigation.jsx';

import '../styles/header.css';
import '../styles/navigation.css';

function Welcome() {
    return (
        <div id='bloc_page'>
            <header>
                <Logo src='./assets/icon-left-font.png'/>
                <LogInNavigation />
            </header>
            <section>
                <h1>Bienvenue sur le réseau social de Groupomania!</h1>
                <p>Nouveau? Créez un compte!</p>
                <p>Ancien? Connectez-vous!</p>
            </section>
        </div>
    )
};

export default Welcome;