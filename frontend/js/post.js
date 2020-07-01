//Functions :
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
function generationPost(post) {
    console.log(post.response[0])
    //Création Url pour le profil :
    urlDynamiqueProfil(post.response[0].userId)
    const section__publishing = document.getElementById('section__publishing');
    //Création de la publication :  
    const article = document.createElement('article');
    article.className= "article";
    article.innerHTML =`<img src="https://picsum.photos/34" alt=""/>
        <a href="${newUrlProfil}" class="pseudo__link">${post.response[0].firstName} ${post.response[0].lastName}</a>
        <p>${post.response[0].date} à ${post.response[0].time}</p>
        <p class="article__p">${post.response[0].content}</p>
        <form method="POST" class="article">
            <label for="content">Ajouter une publication :</label>
            <textarea name="content" id="content" placeholder="Ajouter une commentaire..." row="25"></textarea>
            <button type="submit" class="button__add--post" id="submitButton" value="Ajouter un nouveau commentaire">Envoyer</button>
        </form>
        <section id="section__comments${post.response[0].id}></section>`;              
    section__publishing.appendChild(article);

    const content = document.getElementById('content');
    const submitButton = document.getElementById('submitButton');
    //Envoi d'un commentaire :
    submitButton.addEventListener('click', function(e) {
        fetch('http://localhost:3000/api/posts/' + id + '/comments', {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                content: content.value 
            })
        })
        .then (response => {
            if (response.ok) {
                response.json()
                .then( comments => {
                    generationComments(comments);
                    location.reload();
                })
            }
        })
        .catch (error => console.log(error))
    });
}

function generationComments(comments) {
    for (comment of comments) {
        urlDynamiqueProfil(comment.userId)
            
        //Création des commentaires :  
        const article = document.createElement('article');
        article.className= "article";
        //Si c'est l'utilisateur ou le modérateur On rajoute des boutons :
        if ((localStorage.userId == comment.userId) || localStorage.modo == 1)  {
            article.innerHTML =`<img src="https://picsum.photos/34" alt="" />
                <a href="${newUrlProfil}" class="pseudo__link">${comment.firstName} ${comment.lastName}</a>
                <p>${comment.date}</p>
                <p class="article__p">${comment.content}</p>
                <ul class="actions__post">
                    <li><button class="link__post" id="updatePost${comment.id}">Modifier</button></li>
                    <li><button class="link__post" id="deletePost${comment.id}">Supprimer</button></li>
                </ul>
                                    
                <form method="post" id="form__update${comment.id}" class="update__post">
                    <label for="contentUpdate">Mise à jour du commentaire :</label>
                    <textarea id="contentUpdate${comment.id}" name="contentUpdate">${comment.content}</textarea>
                    <input id="submit__update${comment.id}" type="submit" value="Envoyer" />
                </form>`;
                
            section__publishing.appendChild(article);
            //Les boutons apparaissent :
            const updateButton = document.getElementById(`updatePost${comment.id}`);
            updateButton.addEventListener('click', () => {
                document.getElementById(`form__update${comment.id}`).style.display = "block";
            })
            //Modifier un commentaire :           
            const contentUpdate = document.getElementById(`contentUpdate${comment.id}`)
            const submitUpdate = document.getElementById(`submit__update${comment.id}`)
            submitUpdate.addEventListener('click', () => {
                fetch('http://localhost:3000/api/posts/comments/' + comment.id, {
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
            //Supprimer un commentaire :
            const deleteButton = document.getElementById(`deletePost${comment.id}`);
            deleteButton.addEventListener('click', () => {
                if (confirm('Etes-vous sûr ?')) {
                    fetch('http://localhost:3000/api/posts/comments/' + comment.id, {
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
        //Sinon le commentaire apparait normalement :
        else {
            article.innerHTML =`<img src="https://picsum.photos/34" alt=""/>
                <a href="${newUrlProfil}" class="pseudo__link">${comment.firstName} ${comment.lastName}</a>
                <p class="article__p">${comment.content}</p>`
            section__publishing.appendChild(article);
        }            
    }
}



//Programme :
var parsedUrl = new URL(window.location.href);
var id = parsedUrl.searchParams.get("id");
//ajout de l'id dans la requête, récupération de l'objet, Fetch version
fetch("http://localhost:3000/api/posts/" + id,  {
    headers: { "Authorization": `Bearer ${localStorage.token}`}
})
.then(function (response) { //promesse de réponse serveur
    if (response.ok) {
       response.json()
        .then( post => { //promesse de json parsed
            generationPost(post);      
        })
    }
})
.catch(function() {
    alert("Le serveur ne répond pas ! Nos équipes travaillent au bon rétablissement des services ! Merci de votre patience.")
})

fetch("http://localhost:3000/api/posts/" + id + "/comments",  {
    headers: { "Authorization": `Bearer ${localStorage.token}`}
})
.then(function (response) { //promesse de réponse serveur
    if (response.ok) {
        response.json()
        .then(function (comments) { //promesse de json parsed
            generationComments(comments);
        })
    }
})
.catch(function() {
    alert("Le serveur ne répond pas ! Nos équipes travaillent au bon rétablissement des services ! Merci de votre patience.")
});

