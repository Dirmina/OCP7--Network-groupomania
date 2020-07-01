//function : 
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

function urlDynamiqueProfil(userId) {
    //Déf d'une nouvelle URL 
    var url = new URL(window.location.href + "/../profil.html");
    //Raccourci pour une recherche dans les paramètres :
    var UrlSearchParams = url.searchParams;
    //ajout de l'id dans l'URL
    UrlSearchParams.set('id', userId);
    //ObjectId devient une string, la recherche d'ID s'introduit dans l'url sous la forme "?id="
    url.search = UrlSearchParams.toString();
    //nouvelle url product.html personnalisée:
    return newUrlProfil = url.toString();
}

function generationPost(posts) {
    for (const post of posts.response) {
    urlDynamiquePost(post.id)
    urlDynamiqueProfil(post.userId)
    const section__publishing = document.getElementById('section__publishing');
    //Création des articles :  
    const article = document.createElement('article');
    article.className= "article"

    //création du Post :
    article.innerHTML =`<img src="https://picsum.photos/34" />
        <a href="${newUrlProfil}" class="pseudo__link">${post.firstName} ${post.lastName}</a>
        <p class="article__p">${post.content}</p>
        <ul class="actions__post">
            <li><a class="link__post" href="${newUrl}">Voir plus...</a></li>
            <li><button class="link__post" id="deletePost${post.id}">Supprimer</button></li>
        </ul>`;
            
    section__publishing.appendChild(article);
        const deleteButton = document.getElementById(`deletePost${post.id}`);
        deleteButton.addEventListener('click', () => {
            if (confirm('Etes-vous sûr ?')) {
                fetch('http://localhost:3000/api/modo/posts/' + post.id, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.token}`
                    }
                })
                .then (response => {
                    if (response.ok) {
                        response.json()
                        .then( response =>  {
                            location.reload()
                            res.status(201).json({ response })    
                        })
                        .catch (error => console.log(error))
                    }   
                })
                .catch (error => res.status(500).json({ error: "no put" }))
            }
        })
    }     
}

//Programme :
fetch('http://localhost:3000/api/modo/posts',  {
    headers: { "Authorization": `Bearer ${localStorage.token}`}
})
.then (response => {
    if (response.ok) {
        response.json()
        .then( posts => {
            console.log(posts)
            generationPost(posts);
        })
        .catch ( error => console.log(error))}
})
.catch ( error => console.log('erreur niveau requête'));