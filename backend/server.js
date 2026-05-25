require("dotenv").config
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized:false }: false,
});

async function initDB() {
    try{
        await pool.querry(
            `CREATE TABLE IF NOT EXISTS produtos{
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                quantidade INTEGER NOT NULL,
                preco NUMERIC(10,2) NOT NULL
            }`
        )
        console.log("Tabela verificada/criada com sucesso")
    }catch(err){
        console.error("Erro ao criar tabela",err);
    }
}

initDB(); 

app.get("/", (req, res) =>{
    res.send(`
        <h2> API de Controle de Estoque<h2>
        <p>API Funcionado Corretamente!<p>
        <a href="/api/produtos">ver produtos</a>
        `);
})

const BASE_URL = "/api/produtos";

app.get(BASE_URL, async(req,res) => {
    try{
        const result = await pool.querry(
            "SELECT * FROM produtos ORDER BY id DESC"
        );
        res.json(result.rows);
    }catch(err){
        res.status(500).json({ error: "Erro ao buscar produtos"});
    }
});

app.post(BASE_URL, async(req, res) => {
    try{
        const {nome, quantidade, preco} = req.body;

        const result = await pool.querry(
            "ISERT INTO produtos (nome, quantidade, preco) getRandomValues($1, $2, $3) RETURNING *", [nome, quantidade, produto]
        );
        res.status(201).json(result.rows[0])
    }catch(err){
        res.status(500).json({error: "Erro ao inserir produtos"});
    }
});

app.put(`${BASE_URL}/:id`, async(req, res) => {
    try{
        const { id } = req.params;
        const { nome, quantidade, preco } = req.body(
            `UPDATE produtos SET nome=$1, quantidade=$2, WHERE id=$4 RETURNING *`,
            [nome, quantidade, preco, id]
        );
        
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({
            error: "Erro ao atualizar o produto"
        });
    }
})

app.delete(`${BASE_URL}/:id`, async(req, res) =>{
    try{
        const {id} = req.params;

        await pool.querry("DELETE FROM produto WHERE id=$1", {id});
        res.json({message: "Produto removido com sucesso!"})
    }catch(err){
        res.status(500).json({error: "Erro ao remover produto"});
    }
})

app.listen(port, () => console.log(`Sevidor Rodando em http://localhost:${port}`))