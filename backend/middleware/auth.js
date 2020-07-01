//Modules :
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
//Connexion : 
const connectdb = require('../database/connection-db.js');


module.exports = (req, res, next) => {
    try {
        //Vérification identité :
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
        const userId = decodedToken.userId;
        //Formatage de la requête SQL :
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) FROM users WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        //Requête envoyé à la DB :
        connectdb.query(sql, function( err, result ){
            //Si erreur :
            if (err) reject( { error : "Erreur dans l'inscription" });

            //Si le token.userId n'est pas retrouvé dans la DB :
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
            } 

            //On passe à la suite : 
            else {
                next();
            }
        })
    }
    //Si l'authentification n'est pas valide :
    catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée!'})
    }
}; 