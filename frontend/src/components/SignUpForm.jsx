function SignUpForm() {
    
    function handleSignUp(e) {
        e.preventDefault();
        const newUser = {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newUser)})
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
            alert(`Problème lors de la création de votre compte!.`);
        });
    };

    return (
        <form>
            <div className='form_div'>
                <label htmlFor='firstname'>Prénom: </label>
                <input className='input' type='text' name='firstname' id='firstname' required/>
            </div>
            <div className='form_div'>
                <label htmlFor='lastName'>Nom: </label>
                <input className='input' type='text' name='lastname' id='lastname' required/>
            </div>
            <div className='form_div'>
                <label htmlFor='email'>Email: </label>
                <input className='input' type='email' name='email' id='email' required/>
            </div>
            <div className='form_div'>
                <label htmlFor='password'>Mot de passe: </label>
                <input className='input' type='password' name='password' id='password' required/>
            </div>
            <div className='form_div'>
                <input className='input button' type='submit' value='Créer un compte!' onClick={handleSignUp}/>
            </div>
        </form>
    )
};

export default SignUpForm;