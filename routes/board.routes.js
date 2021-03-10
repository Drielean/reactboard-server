const express = require("express");
const router = express.Router();
const passport = require("passport");

const Board = require("../models/Board.model");

// Crud (Create): Rota para criar uma nova Board
router.post(
  "/board",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newBoard = await Board.create({ ...req.body });
      // O banco responde com o documento recém-criado
      console.log(newBoard);

      // Respondemos a requisição com o documento recém-criado e status 201 (Created)
      return res.status(201).json(newBoard);
    } catch (err) {
      // Caso algo dê errado, respondemos com o status 500 (Internal Server Error) e o motivo do erro
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para listar todos as boards
router.get(
  "/board",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // O find() sem filtros traz todos os documentos da collection
      const boards = await Board.find();
      console.log(boards);

      // O status 200 é um status genérico de sucesso (OK)
      return res.status(200).json(boards);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para trazer uma board específico
router.get(
  "/board/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // O findOne() traz a primeira ocorrência do resultado da consulta
      const board = await Board.findOne({ _id: req.params.id }).populate({
        path: "columns",
        populate: {
          path: "cards",
        },
      });
      console.log(board);

      // Se o findOne() retornar null, ou seja, não encontrar a board no banco, retornamos um 404 dizendo que não foi encontrada
      if (!board) {
        return res.status(404).json({ msg: "Board not found" });
      }

      // O status 200 é um status genérico de sucesso (OK)
      return res.status(200).json(board);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// // crUd (Update): Rota para substituir um pet específico pelo enviado no corpo da requisição
// router.put("/pet/:id", async (req, res) => {
//   try {
//     // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
//     const updatedPet = await Pet.findOneAndReplace(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );

//     // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
//     if (!updatedPet) {
//       return res.status(404).json({ msg: "Pet not found" });
//     }

//     return res.status(200).json(updatedPet);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: err });
//   }
// });

// // crUd (Update): Rota para atualizar um pet específico
// router.patch("/pet/:id", async (req, res) => {
//   try {
//     // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
//     const updatedPet = await Pet.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: req.body },
//       { new: true }
//     );

//     // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
//     if (!updatedPet) {
//       return res.status(404).json({ msg: "Pet not found" });
//     }

//     return res.status(200).json(updatedPet);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: err });
//   }
// });

// // cruD (Delete): Apaga o pet especificado do banco

// router.delete("/pet/:id", async (req, res) => {
//   try {
//     const deleted = await Pet.deleteOne({ _id: req.params.id });

//     if (!deleted) {
//       return res.status(404).json({ msg: "Pet not found" });
//     }

//     return res.status(200).json({});
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: err });
//   }
// });

// Exportar nossa instância de roteador configurada
module.exports = router;
