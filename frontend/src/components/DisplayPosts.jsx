import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';

function DisplayPosts() {
    const [posts, addPosts] = useState([]);

    const userKey = localStorage.key('groupomania_user');
    const user = JSON.parse(localStorage.getItem(userKey));

    useEffect(() => {
        fetch ('http://localhost:3000/api/post/', {
            headers: {'authorization': 'bearer ' + user.token}
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((posts) => {
            addPosts(posts)
        })
        .catch(() => {
            alert('Problème lors du chargement du post!')
        })
    }, [])

    if (posts.length === 0) {
        return (
            <section>
                <h2>Pas de post pour le moment!</h2>
                <p>Créez en un!</p>
            </section>
        )
    } else {
        return (
            <section>
                {posts.map((post, index) => (
                    <Link key={index} to={'/posts/' + post._id}>
                        <div className='post'>
                            <div className='post_header'>
                                    <h2>{post.userFirstName + ' ' + post.userLastName}</h2>
                                    <p>{moment(post.date).locale('fr').format('lll')}</p>
                            </div>
                            <div className='post_body'>
                                <img className='post_img' src={post.imageUrl} alt={'Illustration du post: ' + '\u0022' + post.title + '\u0022'}/>
                                <h2>{post.title}</h2>
                                <p>{post.text}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        )
    }
};

export default DisplayPosts;