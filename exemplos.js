
// Query Params = ?teste=nome
server.post('/projects', (req,res) =>{
    const title = req.query.title;
    tasks.push(title);
    return res.json(tasks);
});

// Route Params = /users/1
server.post('/projects/:id', (req,res) => {
    // const {id} = req.params;  podemos usar assim como destruturação
    const id = req.params.id;
    tasks.push(id);
    return res.json(tasks);
});