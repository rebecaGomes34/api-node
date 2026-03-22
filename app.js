const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});


app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if (preco < 0) {
        return res.status(400).send('Preço não pode ser negativo');
    }

    const sql = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
    db.query(sql, [nome, preco], (err, result) => {
        if (err) return res.send(err);
        res.send('Produto criado!');
    });
});



app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});


app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    if (preco < 0) {
        return res.status(400).send('Preço não pode ser negativo');
    }

    const sql = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
    db.query(sql, [nome, preco, id], (err, result) => {
        if (err) return res.send(err);
        res.send('Produto atualizado!');
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.send(err);
        res.send('Produto removido!');
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

password: 'Becadeba061046!'