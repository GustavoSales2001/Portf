const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Garagem200@",
  database: "portfolio"
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor rodando...");
});

// Rota do formulário
app.post("/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.json({ mensagem: "Preencha todos os campos!" });
  }

  const sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, mensagem], (err, result) => {
    if (err) {
      console.log("Erro ao inserir no banco:", err);
      return res.status(500).json({ mensagem: "Erro ao salvar no banco" });
    }

    res.json({ mensagem: "Mensagem enviada com sucesso!" });
  });
});

// Porta do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});