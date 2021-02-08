const express = require('express');
const {pool} = require('../config/pgconfig');

const app = express();

app.get('/todos',(req, res) => {
    pool.query(`SELECT * FROM todo as td`, (err, todos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            conteo: todos.rowCount,
            todos: todos.rows
        });
    });
});

app.get('/todos/:id',(req,res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM todo As td WHERE td.todo_id =$1`, [id], (err, todo) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            conteo: todo.rowCount,
            todo: todo.rows
        });
    });
});

app.post('/todos', (req, res) => {
    const {name, title} = req.body;
    pool.query(`INSERT INTO todo(name, title) VALUES($1,$2)`, [name, title], (err, todo) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: todo.command
        });
    });
});

app.put('/todos/:id',(req, res) => {
    const todoId = parseInt(req.params.id);
    const {name, title, completed} = req.body;
    pool.query(`UPDATE todo as td SET name=$2, title=$3, completed=$4 WHERE td.todo_id=$1`, [todoId,name,title,completed], (err, todo) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            todo: {
                message: `Actividad con ID:${todoId} ha sido actualizado.`
            }
        });
    });
});

app.delete('/todos/:id',(req,res) => {
    const todoId = parseInt(req.params.id);
    const completed = true;
    pool.query(`UPDATE todo as td SET completed=$1 WHERE td.todo_id=$2`, [completed, todoId], (err, todo) =>{
        if(err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            todo: {
                message: `Actividad con ID: ${todoId} ha sido borrada.`
            }
        });
    });
});

module.exports = app;