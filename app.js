require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
// const passport = require("./config/passport.config");

const app = express();

// Configurar nosso app Express para entender requisições com conteúdo JSON
app.use(express.json());

// Configurar nosso app para entender requisições do tipo URLEncoded (para envio de imagens)
// app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin Resource Sharing é um mecanismo de defesa padrão implementado pela maioria dos servidores web para bloquear requisições HTTP de outros domínios. Podemos liberar domínios diferentes manualmente usando o pacote cors do NPM
app.use(cors({ origin: process.env.CLIENT_URL }));

// Importar a configuração do banco de dados (mongoose)
const db = require("./config/db.config");
// Invoca a função que realiza a conexão com o banco de dados
db();

// Configura a instância do Express para usar o passport
// passport(app);

// Importar os roteadores
const boardRouter = require("./routes/board.routes");
app.use("/", boardRouter);

const columnRouter = require("./routes/column.routes");
app.use("/", columnRouter);

const cardRouter = require("./routes/card.routes");
app.use("/", cardRouter);

// Subir o servidor web para escutar requisições
app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
