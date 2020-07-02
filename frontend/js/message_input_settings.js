const firstNameCheck = document.getElementById('firstName');
const lastNameCheck = document.getElementById('lastName');
const emailCheck = document.getElementById('email');

const error_firstName = document.getElementById('error_firstName');
const error_lastName = document.getElementById('error_lastName');
const error_email = document.getElementById('error_email');

firstNameCheck.addEventListener('blur', () => {
    if (!firstNameCheck.checkValidity()) {
        error_firstName.textContent = "Ce champ est invalide."
    }
    else {
        error_firstName.textContent = ''
    }
})

lastNameCheck.addEventListener('blur', () => {
    if (!lastNameCheck.checkValidity()) {
        error_lastName.textContent = "Ce champ est invalide."
    }
    else {
        error_lastName.textContent = ''
    }
})

emailCheck.addEventListener('blur', () => {
    if (!emailCheck.checkValidity()) {
        error_email.textContent = "Ce champ est invalide."
    }
    else {
        error_email.textContent = ''
    }
})