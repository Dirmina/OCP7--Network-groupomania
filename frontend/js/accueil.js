//functions : 
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

        //Si l'utilisateur à créer le post :
        if ((localStorage.userId == post.userId))  {
            article.innerHTML =`<img src="https://picsum.photos/34" alt="" />
                <a href="${newUrlProfil}" class="pseudo__link">${post.firstName} ${post.lastName}</a>
                <p>${post.date} à ${post.time}</p>
                <p class="article__p">${post.content}</p>
                <ul class="actions__post">
                    <li><a class="link__post" href="${newUrl}">Voir plus...</a></li>
                    <li><button class="link__post" id="updatePost${post.id}">Modifier</button></li>
                    <li><button class="link__post" id="deletePost${post.id}">Supprimer</button></li>
                </ul>
                                    
                <form method="post" id="form__update${post.id}" class="update__post">
                    <textarea id="contentUpdate${post.id}" name="contentUpdate">${post.content}</textarea>
                    <input id="submit__update${post.id}" type="submit" value="Envoyer" />
                </form>`;
                
            section__publishing.appendChild(article);
            //bouton de suppression lié au post :
            const updateButton = document.getElementById(`updatePost${post.id}`);
            updateButton.addEventListener('click', () => {
                document.getElementById(`form__update${post.id}`).style.display = "block";
            })
                                
            const contentUpdate = document.getElementById(`contentUpdate${post.id}`)
            const submitUpdate = document.getElementById(`submit__update${post.id}`)
            //Envoi de la modification :
            submitUpdate.addEventListener('click', () => {
                fetch('http://localhost:3000/api/posts/' + post.id, {
                    method: 'PATCH',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    body: JSON.stringify({
                        content: contentUpdate.value})
                })
                .then (response => {
                    if (response.ok) {
                        response.json()
                        .then( response =>  res.status(201).json({ response }))
                        .catch (error => console.log(error))
                    }   
                })
                .catch (error => res.status(500).json({ error: "no put" }))
            })

            //Bouton de suppression lié au post :
            const deleteButton = document.getElementById(`deletePost${post.id}`);
            deleteButton.addEventListener('click', () => {
                //Si confirmation :
                if (confirm('Etes-vous sûr ?')) {
                    fetch('http://localhost:3000/api/posts/' + post.id, {
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
        //Sinon si l'utilisateur n'a pas créé le post :
        else {
            article.innerHTML =`<img src="https://picsum.photos/34" alt=""/>
                <a href="${newUrlProfil}" class="pseudo__link">${post.firstName} ${post.lastName}</a>
                <p>${post.date} à ${post.time}</p>
                <p class="article__p">${post.content}</p>
                <ul>
                    <li><a class="link__post" href="${newUrl}">Voir plus...<a></li>
                </ul>`;
            section__publishing.appendChild(article);
        }     
    }
}

//Envoyer le content
const form = document.querySelector('form');
const content = document.getElementById('content');
const submitButton = document.getElementById('submitButton');
const submitButtonComment = document.getElementById('submitButtonComment');

form.addEventListener('input', () => {
    if (content.value) {
        submitButton.removeAttribute('disabled');
    }
})
//Récupération des posts :
fetch('http://localhost:3000/api/posts',  {
    headers: { "Authorization": `Bearer ${localStorage.token}`}
})
.then (response => {
    if (response.ok) {
        response.json()
        .then( posts => {
            generationPost(posts);
        })
        .catch ( error => console.log(error))
    }
})
.catch ( error => console.log('erreur niveau requête'));
form.addEventListener('change', function() {
    if(email.checkValidity()) {
        submitButton.removeAttribute('disabled');
    }
});

//Si on clique sur le bouton d'envoi de publication :
submitButton.addEventListener('click', function(e) {
    fetch('http://localhost:3000/api/posts', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            userId: localStorage.userId,
            content: content.value 
        })
    })
    .then (response => {
        if (response.ok) {
            response.json()
            .then( posts => {
                generationPost(posts);
                location.reload();
            })
        }
    })
    .catch (error => console.log(error))
});