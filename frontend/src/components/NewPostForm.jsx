import {useState} from 'react';

function NewPostForm() {
    const [file, updateFile] = useState('../assets/default.png');

    function handleNewPost(e) {
        e.preventDefault();
        const userKey = localStorage.key('groupomania_user');
        const user = JSON.parse(localStorage.getItem(userKey));
        const newPost = {
            userId: user.userId,
            date: new Date(),
            title: document.getElementById('title').value,
            text: document.getElementById('text').value,
        };
        const image = document.getElementById('image').files[0];
        const formData = new FormData();
        formData.append('newPost', JSON.stringify(newPost));
        formData.append('image', image);
        fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {authorization: 'bearer ' + user.token},
            body: formData})
        .then((res) => {
            if (res.ok) {
                return res.json()
            }})
        .then(() => {
            window.location.href = 'http://localhost:4000/posts'
        })
        .catch(() => {
            alert(`Problème lors de la création du nouveau post!.`);
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

    return(
        <form>
            <div className='form_div'>
                <label htmlFor='image'>Image: </label>
                <input className='file' type='file' id='image' name='image' accept='image/jpg, image/jpeg, image/png' onChange={handleFile}/>
                <img className='form_img' src={file} alt='Illustration du post'/>
                <button className='input button' name='button' onClick={handleClickHiddenFile}><i className='fas fa-upload'></i>&ensp;Sélectionner une image!</button>
            </div>
            <div className='form_div'>
                <label htmlFor='title'>Titre: </label>
                <input className='input' type='text' name='title' id='title' required/>
            </div>
            <div className='form_div'>
                <label htmlFor='text'>Texte: </label>
                <textarea className='input' type='text' name='text' id='text' required></textarea>
            </div>
            <div className='form_div'>
                <input className='input button' type='submit' value='Créer un nouveau post!' onClick={handleNewPost}/>
            </div>
        </form>
    )
};

export default NewPostForm;