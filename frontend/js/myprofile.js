//Mise en place de l'adresse profil :
const myProfile = document.getElementById('link__my__profile');
myProfile.href = `./profil.html?id=${localStorage.userId}`;