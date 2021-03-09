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

// crUd (Update): Rota para substituir uma coluna específica pela enviada no corpo da requisição
router.put("/column/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre,
    // atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
    const updatedColumn = await Column.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
    if (!updatedColumn) {
      return res.status(404).json({ msg: "Column not found" });
    }

    console.log(updatedColumn);
    return res.status(200).json(updatedColumn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// Exportar nossa instância de roteador configurada
module.exports = router;
