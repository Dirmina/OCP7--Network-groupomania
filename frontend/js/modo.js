//DOM variables :
const modoPost = document.getElementById('modoPosts')
const commentPost = document.getElementById('modoComments')

//Si modo les boutons apparaissent :
modoPost.style.display = 'none'
commentPost.style.display = 'none'
if (localStorage.modo == 1) {
    modoPost.style.display = 'inline'
    commentPost.style.display = 'inline'
}