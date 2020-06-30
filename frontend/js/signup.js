const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const verifyPassword = document.getElementById('verifyPassword');

const submitButton = document.getElementById('submitButton');

form.addEventListener('change', function() {
    if(firstName.checkValidity() && lastName.checkValidity() && email.checkValidity() && password.checkValidity() && verifyPassword.value.length >= 8) {
        console.log("coucou")
        submitButton.removeAttribute('disabled');
    }
});

submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (verifyPassword.value != password.value) {
        alert('Les mots de passe ne correspondent pas !')
    }
    else {
        fetch('http://localhost:3000/api/auth/signup', {
            method: 'post',
            headers: {
               "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            })
        })
        .then (response => {
            if (response.ok) {
                fetch('http://localhost:3000/api/auth/login', {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value})
                })
                .then (response => {
                    if (response.ok) {
                        response.json()
                        .then (data => { 
                            localStorage.setItem('userId', data.response.userId) 
                            localStorage.setItem('token', data.response.token)
                            localStorage.setItem('modo', data.response.modo)
                            document.location.href = "accueil.html";
                        })
                        .catch (error => console.error('erreur : ' + error))
                    }
                })        
            }
        })
    }
});