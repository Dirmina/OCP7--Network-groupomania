//DOM Variables :
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const submitButton = document.getElementById('submitButton');
const deleteButton = document.getElementById('deleteButton');

//Envoi de la Mise à jour :
submitButton.addEventListener('click', function() {
    var id = localStorage.userId
    fetch('http://localhost:3000/api/auth/profile/' + id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
             email: email.value
        })
    })
    .then (response => {
        if (response.ok) {
            response.json()
            .then( response =>  res.status(201).json({ response }))
            .catch (error => console.log(error))
        }   
    })
    .catch (error => res.status(500).json({ error: "no put" }))
});

//Suppression du compte :
deleteButton.addEventListener('click', function() {
    //Si confirmation :
    if(confirm("Etes-vous sûr ?")) {
    var id = localStorage.userId
    fetch('http://localhost:3000/api/auth/profile/' + id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    .then (response => {
        if (response.ok) {
            document.location.href = 'login.html'
        }   
    })
    .catch (error => res.status(500).json({ error: "no put" }))
    }
});