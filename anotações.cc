Temos 3 tipos de parametros
    - Query Params = ?teste=1
        
    - Route params = /users/1
    - Request body = { "name" : 'Rodrigo', "email": 'teste@teste.com' }
        - Geralmente é usado nos métodos POST/PUT

        *Utilizando o Query params => req.query.users
            server.get('/teste', (req, res) => {
                let users = req.query.users;
                return res.json({
                    message: ` Hello ${users} `
                });
            });

        *Utilizando o Route params => req.params.id
        server.get('/users/:id', (req, res) => {
            let id = req.params.id;
            return res.json({
                message: ` Buscando o usuario ${id} `
            });
        });

        // CRUD - Create, Read, Update, Delete