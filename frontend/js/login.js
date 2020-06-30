const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

const submitButton = document.getElementById('submitButton');

form.addEventListener('change', function() {
    if(email.checkValidity()) {
        submitButton.removeAttribute('disabled');
    }
});

submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/api/auth/login', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then (response => {
        if (response.ok) {
            response.json()
            .then (data => { 
                localStorage.setItem('userId', data.response.userId) 
                localStorage.setItem('token', data.response.token)
                localStorage.setItem('modo', data.response.moderation)
                document.location.href = "accueil.html";
            })
            .catch (error => console.error('erreur : ' + error))
        }
    })
});