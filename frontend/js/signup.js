//DOM variables :
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const verifyPassword = document.getElementById('verifyPassword');

const submitButton = document.getElementById('submitButton');

//Check la validité du formulaire :
form.addEventListener('change', function() {
    //Si tout est valide :
    if(firstName.checkValidity() && lastName.checkValidity() && email.checkValidity() && password.checkValidity() && verifyPassword.value.length >= 8) {
        //Le bouton est cliquable :
        submitButton.removeAttribute('disabled');
    }
});

//Envoi du formulaire :
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    //Si le MDP n'est pas bon :
    if (verifyPassword.value != password.value) {
        alert('Les mots de passe ne correspondent pas !')
    }
    //Sinon :
    else {
        //Envoi des données :
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
                //Quand les données sont envoyé : Connexion et redirection sur accueil.html :
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
                            //On stock les données qui nous seront utiles sur les autres routes :
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