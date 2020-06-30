const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const connectdb = require('../database/connection-db');
const { connect } = require('../app');

exports.signup = (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 10)
    .then(hash => {
        let sqlInserts = [firstName, lastName, email, hash];
        let sql = "INSERT INTO Users VALUES (NULL, ?, ?, ?, ?, NULL, 0)"
        sql =  mysql.format(sql, sqlInserts);
        new Promise((resolve, reject) => {
            connectdb.query(sql, (err, result) => {
                if (err) reject({err})
               resolve({message: "New User !"})
            })
        })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }));
    })
}

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    let sql = "SELECT * From Users WHERE email=?"
    sql = mysql.format(sql, sqlInserts);
    new Promise((resolve, reject) => {
        connectdb.query(sql, (err, result) => {
            
            if (err) reject({ err })

            if (!result) {
                reject({ message: "ID introuvable !"})
            }
            else {
                bcrypt.compare(password, result[0].password) 
                .then(valid => { 
                    if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                    resolve({
                        userId: result[0].id,
                        token: jwt.sign(
                            { userId: result[0].id, moderation: result[0].modo },
                            'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr',
                            { expiresIn: '24h' }
                        ),
                        moderation: result[0].modo
                    });
                })
            }
        })
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}


exports.seeAProfile = (req, res, next) => {
    const userId = req.params.id;
    let sqlInserts = [userId];
    let sql = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) reject({ err });
            resolve(result);
        }) 
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

exports.updateUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    let userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, userId];
    let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) reject({ err });
            resolve({ result });
        }) 
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    let sql = 'DELETE FROM users WHERE id = ?'; 
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) return reject({ err });
            resolve({message : 'Utilisateur supprimé'});
        }) 
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

