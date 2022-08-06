import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function ModifyPostForm() {
    const [post, setPost] = useState([]);
    const [file, updateFile] = useState(String);
    const {postId} = useParams();

    useEffect(() => {
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));

        fetch ('http://localhost:3000/api/post/' + postId, {
            headers: {'authorization': 'bearer ' + user.token},
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((res) => {
            setPost(res);
            updateFile(res.imageUrl)
        })
        .catch(() => {
            alert('Problème lors du chargement du post!')
        })
    }, []);

    function handleChange(input) {
        setPost({
          ...post,
          [input.target.name]: [input.target.value]
        });
    };

    function handleClickHiddenFile(e) {
        e.preventDefault();
        const hiddenFileInput = document.getElementById('image');
        hiddenFileInput.click();
    };

    function handleFile(e) {
        e.preventDefault();
        const fileUploaded = e.target.files[0];
        updateFile(URL.createObjectURL(fileUploaded));
    };

    function modifyPost(e) {
        e.preventDefault();
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        const modifiedPost = {
            title: document.getElementById('title').value,
            text: document.getElementById('text').value,
        };
        const newImage = document.getElementById('image').files[0];
        const formData = new FormData();
        formData.append('modifiedPost', JSON.stringify(modifiedPost));
        formData.append('image', newImage);
        fetch('http://localhost:3000/api/post/' + postId, {
            method: 'PUT',
            headers: {'authorization': 'bearer ' + user.token},
            body: formData})
        .then((res) => {
            if (res.ok) {
                return res.json()
            }})
        .then(() => {
            window.location.href = 'http://localhost:4000/posts'
        })
        .catch(() => {
            alert(`Problème lors de la modification du post!.`);
        })
    };

    function deletePost(e) {
        e.preventDefault();
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        fetch('http://localhost:3000/api/post/' + postId, {
            method: 'DELETE',
            headers: {'authorization': 'bearer ' + user.token}
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }})
        .then(() => {
            window.location.href = 'http://localhost:4000/posts'
        })
        .catch(() => {
            alert(`Problème lors de la suppression du post!.`);
        })
    }

    return(
        <form>
            <div className='form_div'>
                <label htmlFor='image'>Image: </label>
                <input className='file' type='file' id='image' name='image' accept='image/jpg, image/jpeg, image/png' onChange={handleFile}/>
                <img className='form_img' src={file} alt={'Image de ' + post.title}/>
                <button className='input button' name='button' onClick={handleClickHiddenFile}><i className='fas fa-upload'></i>&ensp;Modifier l'image!</button>
            </div>
            <div className='form_div'>
                <label htmlFor='title'>Titre: </label>
                <input className='input' type='text' name='title' id='title' value={post.title} onChange={handleChange} required/>
            </div>
            <div className='form_div'>
              <label htmlFor='text'>Texte: </label>
              <textarea className='input' type='text' name='text' id='text' value={post.text} onChange={handleChange} required></textarea>
            </div>
            <div className='form_div'>
                <input className='input button' type='submit' value='Modifier le post!' onClick={modifyPost}/>
            </div>
            <div className='form_div'>
                <input className='input button' type='submit' value='Supprimer le post!' onClick={deletePost}/>
            </div>
        </form>
    )
};

export default ModifyPostForm;