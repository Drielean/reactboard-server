const express = require("express");
const router = express.Router();
const passport = require("passport");

const Card = require("../models/Card.model");
const Column = require("../models/Column.model");
const User = require("../models/User.model");

// Crud (Create): Rota para criar um novo Card
router.post(
  "/card",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newCard = await Card.create({ ...req.body });
      // O banco responde com o documento recém-criado
      console.log(newCard);

      const updatedColumnCardsIDs = await Column.updateOne(
        { _id: newCard.columnId },
        // { $push: { cards: newCard._id } }
        { $push: { cards: { $each: [newCard._id], $position: 0 } } }
      );

      console.log(updatedColumnCardsIDs);

      const updatedUserCardsIDs = await User.updateOne(
        { _id: newCard.creatorId },
        // { $push: { cards: newCard._id } }
        { $push: { cards: { $each: [newCard._id], $position: 0 } } }
      );

      console.log(updatedUserCardsIDs);

      // Respondemos a requisição com o documento recém-criado e status 201 (Created)
      return res.status(201).json(newCard);
    } catch (err) {
      // Caso algo dê errado, respondemos com o status 500 (Internal Server Error) e o motivo do erro
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// // cRud (Read): Rota para listar todos os pets do usuário logado
// router.get(
//   "/pet",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     try {
//       // O find() sem filtros traz todos os documentos da collection
//       const pets = await Pet.find({ ownerId: req.user._id });
//       console.log(pets);

//       // O status 200 é um status genérico de sucesso (OK)
//       return res.status(200).json(pets);
//     } catch (err) {
//       return res.status(500).json({ msg: err });
//     }
//   }
// );

// cRud (Read): Rota para trazer um card específico
router.get(
  "/card/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // O findOne() traz a primeira ocorrência do resultado da consulta
      const card = await Card.findOne({ _id: req.params.id }).populate({
        path: "comments",
      });
      console.log(card);

      // Se o findOne() retornar null, ou seja, não encontrar o card no banco, retornamos um 404 dizendo que não encontramos o pet
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      // O status 200 é um status genérico de sucesso (OK)
      return res.status(200).json(card);
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
