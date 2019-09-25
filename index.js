const express = require('express');
const server = express();
// temos que dizer ao express que ele deve ler JSON no BODY da requisição
server.use(express.json());

// Query Params = ?teste=1
server.get('/users', (req,res) =>{
    const nome = req.query.nome;

    return res.json({ message: `${nome}`});
});

// Route Params = /users/1
server.get('/users/:id', (req,res) => {
    const id = req.params.id;
    return res.json({ message: `Selecionou o id ${id}`});
});

// Request body = { "name": "Rodrigo", "email": "teste@teste.com"}

// CRUD - Create, Read, Update, Delete

const users = ['Rodrigo', 'Adelmo', 'Norris'];

// Middleware GLOBAL
server.use( (req,res, next) => {
    // console.time('Request');
    console.log(` Method: ${req.method} URL: ${req.url}`);

    return next();
    // console.timeEnd('Request');    
});


// Middleware LOCAL
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'User name is required'
        });
    }

    return next();
}

// Middleware que recebe USUARIO NO PARAMETRO
function checkUserInArray(req,res, next) {
    const user = users[req.params.next];
    if(!user) {
        return res.status(400).json({
            error: 'User NOT EXIST!'
        });
    }

    req.user = user;

    return next();
}


// Todos os usuarios
server.get('/users', (req,res) => {
    return res.json(users);
});

// Um usuario
server.get('/users/:index', checkUserInArray, (req, res) => {
    let position = req.params.index;

    return res.json(users[position]);
});

// Criando usuario
server.post('/users', checkUserExists,checkUserInArray, (req,res) => {
    // NAME do req, vai pegar no corpo do body que esta no código do 'Insomnia' o slug NAME
    const name = req.body.name; 

    users.push(name);
    
    return res.json(users);
});

// Editando Usuario
// [INDEX] está pegando o INDEX DO ARRAY
server.put('/users/:index',checkUserExists, checkUserInArray, (req,res) => {
    const { index } = req.params;
    const { name } = req.body;

    // ID do parametro vai selecionar o indece do array e com isso, vai receber o valor do 'Corpo do Body'
    users[index] = name;

    return res.json(users);
});

// Deletando Usuario
server.delete('/users/:index',checkUserExists, checkUserInArray, (req,res) => {
    const index = req.params.index;
    
    users.splice(index, 1);

    return res.send(`Usuário ${index} Deletado! `);
});

server.listen(3000);