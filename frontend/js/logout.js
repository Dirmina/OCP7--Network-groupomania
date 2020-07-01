const logout = document.getElementById('logout')
//Clear pour la déconnexion :
logout.addEventListener('click', () => {
    localStorage.clear()
    document.location.href='login.html'
})