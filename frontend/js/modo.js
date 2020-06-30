const modoPost = document.getElementById('modoPosts')
const commentPost = document.getElementById('modoComments')

modoPost.style.display = 'none'
commentPost.style.display = 'none'
if (localStorage.modo == 1) {
    modoPost.style.display = 'inline'
    commentPost.style.display = 'inline'
}