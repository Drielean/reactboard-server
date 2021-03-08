const express = require("express");
const router = express.Router();

const Column = require("../models/Column.model");

// Crud (Create): Rota para criar uma nova Coluna
router.post("/column", async (req, res) => {
  try {
    const newColumn = await Column.create({ ...req.body });
    // O banco responde com o documento recém-criado
    console.log(newColumn);

    // Respondemos a requisição com o documento recém-criado e status 201 (Created)
    return res.status(201).json(newColumn);
  } catch (err) {
    // Caso algo dê errado, respondemos com o status 500 (Internal Server Error) e o motivo do erro
    return res.status(500).json({ msg: err });
  }
});

// Exportar nossa instância de roteador configurada
module.exports = router;
