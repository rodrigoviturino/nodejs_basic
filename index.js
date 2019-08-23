const express = require('express');
const server = express();
// temos que dizer ao express que ele deve ler JSON no BODY da requisição
server.use(express.json());


const users = ['Rodrigo', 'Adelmo', 'Norris'];

// Todos os usuarios
server.get('/users', (req,res) => {
    return res.json(users);
});

// Um usuario
server.get('/users/:index', (req, res) => {
    let position = req.params.index;

    return res.json(users[position]);
});

// Criando usuario
server.post('/users', (req,res) => {
    const name = req.body.name; 

    users.push(name);
    return res.json(users);
});

// Editando Usuario
server.put('/users/:index', (req,res) => {
    const index = req.params.index;
    const name = req.body.name;

    users[index] = name;

    return res.json(users);
});

// Deletando Usuario
server.delete('/users/:index', (req,res) => {
    const index = req.params.index;
    
    users.splice(index, 1);

    return res.send(`Usuário ${index} Deletado! `);
});

server.listen(3000);