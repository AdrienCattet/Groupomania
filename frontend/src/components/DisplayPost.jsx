import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';

function DisplayPost() {
    const [post, addPost] = useState([]);
    const [owner, updateOwner] = useState(Boolean);
    const [likes, updateLikes] = useState(Number);
    const [liked, updateLiked] = useState(Boolean);
    const [dislikes, updateDislikes] = useState(Number);
    const [disliked, updateDisliked] = useState(Boolean);
    const {postId} = useParams();

    useEffect(() => {
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        const userId = user.userId;

        fetch ('http://localhost:3000/api/post/' + postId, {
            headers: {'authorization': 'bearer ' + user.token},
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((post) => {
            addPost(post)
            if (post.userId === userId || post.userId === 'true') {
                updateOwner(true)
            } else {
                updateOwner(false)
            } if (post.usersLiked.indexOf(userId) === -1) {
                updateLiked(false)
            } else {
                updateLiked(true)
            } if (post.usersDisliked.indexOf(userId) === -1) {
                updateDisliked(false)
            } else {
                updateDisliked(true)
            }
            updateLikes(post.likes)
            updateDislikes(post.dislikes)
        })
        .catch(() => {
            alert('Problème lors du chargement du post!')
        })
    }, [])

    function handleLikes(e) {
        e.preventDefault();
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        if (liked === false) {
            if (disliked === true) {
                fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                    method: 'POST',
                    headers: {
                        'authorization': 'bearer ' + user.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'likes': +1,
                        'dislikes': -1
                    })
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }})
                    .then(() => {
                        updateLikes(likes + 1)
                        updateLiked(true)
                        updateDislikes(dislikes - 1)
                        updateDisliked(false)
                    })
                    .catch(() => {
                        alert(`Problème lors de l'ajout du like!.`);
                    });
            } else {
                fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                    method: 'POST',
                    headers: {
                        'authorization': 'bearer ' + user.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'likes': +1})
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }})
                    .then(() => {
                        updateLikes(likes + 1)
                        updateLiked(true)
                    })
                    .catch(() => {
                        alert(`Problème lors de l'ajout du like!.`);
                    });
            }
        } else {
            fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                method: 'POST',
                headers: {
                    'authorization': 'bearer ' + user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'likes': - 1})
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }})
                .then(() => {
                    updateLikes(likes - 1)
                    updateLiked(false)
                })
                .catch(() => {
                    alert(`Problème lors de l'ajout du like!.`);
                });
        }
    };

    function handleDislikes(e) {
        e.preventDefault();
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        if (disliked === false) {
            if (liked === true) {
                fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                    method: 'POST',
                    headers: {
                        'authorization': 'bearer ' + user.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'likes': -1,
                        'dislikes': +1
                    })
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }})
                    .then(() => {
                        updateLikes(likes - 1)
                        updateLiked(false)
                        updateDislikes(dislikes + 1)
                        updateDisliked(true)
                    })
                    .catch(() => {
                        alert(`Problème lors de l'ajout du dislike!.`);
                    });
            } else {
                fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                    method: 'POST',
                    headers: {
                        'authorization': 'bearer ' + user.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'dislikes': +1})
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }})
                    .then(() => {
                        updateDislikes(dislikes + 1)
                        updateDisliked(true)
                    })
                    .catch(() => {
                        alert(`Problème lors de l'ajout du dislike!.`);
                    });
            }
        } else {
            fetch ('http://localhost:3000/api/post/' + postId + '/like', {
                method: 'POST',
                headers: {
                    'authorization': 'bearer ' + user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'dislikes': - 1})
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }})
                .then(() => {
                    updateDislikes(dislikes - 1)
                    updateDisliked(false)
                })
                .catch(() => {
                    alert(`Problème lors de l'ajout du dislike!.`);
                });
        }
    };

    return (
        <section>
            <div id='post'>
                <div className='post_header'>
                    <h2>{post.userFirstName + ' ' + post.userLastName}</h2>
                    <p>{moment(post.date).locale('fr').format('lll')}</p>
                </div>
                <div className='post_body'>
                    <img className='post_img' src={post.imageUrl} alt={'Illustration du post: ' + '\u0022' + post.title + '\u0022'}/>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                </div>
                <div className='post_footer'>
                    <div className='post_likes'>
                        <button id='like_button' className='likes_button' onClick={handleLikes}>{likes}&ensp;<i className='far fa-thumbs-up'></i></button>
                        <button id='dislike_button' className='likes_button' onClick={handleDislikes}>{dislikes}&ensp;<i className='far fa-thumbs-down'></i></button>
                    </div>
                   {owner === true &&
                        <Link to={'/modifypost/' + post._id}>
                            <button className='modify_button'>Modifier le post!</button>
                        </Link>
                    }
                </div>
            </div>
        </section>
    )
};

export default DisplayPost;