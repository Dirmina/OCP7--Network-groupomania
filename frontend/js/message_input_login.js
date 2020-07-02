const emailCheck = document.getElementById('email');
const error_email = document.getElementById('error_email');

emailCheck.addEventListener('blur', () => {
    if (!emailCheck.checkValidity()) {
        error_email.textContent = "Ce champ est invalide."
    }
    else {
        error_email.textContent = ''
    }
})