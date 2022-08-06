function LogInForm() {

    function handleLogIn(e) {
        e.preventDefault();
        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(user)})
        .then((res) => {
            if (res.ok) {
                return res.json()
            }})
        .then((res) => {
            const localStorageKey = 'groupomania_user';
            const localStorageValue = {...res};
            localStorage.setItem(JSON.stringify(localStorageKey), JSON.stringify(localStorageValue))
        })
        .then(() => {
            window.location.href = 'http://localhost:4000/posts'
        })
        .catch(() => {
            alert(`Problème lors de la connection à votre compte!.`);
        });
    };

    return ( 
        <form>
            <div className='form_div'>
              <label htmlFor='email'>Email: </label>
              <input className='input' type='email' name='email' id='email' required/>
            </div>
            <div className='form_div'>
                <label htmlFor='password'>Mot de passe: </label>
                <input className='input' type='password' name='password' id='password' required/>
            </div>
            <div className='form_div'>
                <input className='button input' type='submit' value='Se connecter!' onClick={handleLogIn}/>
            </div>
        </form>
    )
};

export default LogInForm;