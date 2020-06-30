function urlDynamiquePost(postId) {
    //Déf d'une nouvelle URL 
    var url = new URL(window.location.href + "/../post.html");
    //Raccourci pour une recherche dans les paramètres :
    var UrlSearchParams = url.searchParams;
    //ajout de l'id dans l'URL
    UrlSearchParams.set('id', postId);
    //ObjectId devient une string, la recherche d'ID s'introduit dans l'url sous la forme "?id="
    url.search = UrlSearchParams.toString();
    //nouvelle url product.html personnalisée:
    return newUrl = url.toString();
}

function generationProfil(profil) {
    const section__profil = document.getElementById('profil__name');
    //Création des articles :  
    const article = document.createElement('article');
    article.className= "article"

    //création du profil
    article.innerHTML =`<h2 class="article__profil">${profil.response[0].firstName} ${profil.response[0].lastName}: </h2>
        <h3 class="article__profil">email : ${profil.response[0].email}</h3>`
    section__profil.appendChild(article);
}

var parsedUrl = new URL(window.location.href);
var id = parsedUrl.searchParams.get("id");

fetch('http://localhost:3000/api/auth/profile/' + id,  {
    headers: { "Authorization": `Bearer ${localStorage.token}`}
})
.then (response => {
    if (response.ok) {
        response.json()
        .then( profil => generationProfil(profil))
        .catch ( error => console.log(error))
    }
})
.catch ( error => console.log('erreur niveau requête'));