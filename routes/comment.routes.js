const express = require("express");
const router = express.Router();
const passport = require("passport");

const Comment = require("../models/Comment.model");
const Card = require("../models/Card.model");
const User = require("../models/User.model");

// Crud (Create): Rota para criar um novo Comment
router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newComment = await Comment.create({ ...req.body });
      // O banco responde com o documento recém-criado
      console.log(newComment);

      const updatedCardsCommentsIDs = await Card.updateOne(
        { _id: newComment.cardId },
        { $push: { comments: { $each: [newComment._id], $position: 0 } } }
      );
      console.log(updatedCardsCommentsIDs);

      const updatedUserCommentsIDs = await User.updateOne(
        { _id: newComment.creatorId },
        // { $push: { cards: newCard._id } }
        { $push: { comments: { $each: [newComment._id], $position: 0 } } }
      );

      console.log(updatedUserCommentsIDs);

      // Respondemos a requisição com o documento recém-criado e status 201 (Created)
      return res.status(201).json(newComment);
    } catch (err) {
      // Caso algo dê errado, respondemos com o status 500 (Internal Server Error) e o motivo do erro
      console.log(err);
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

// crUd (Update): Rota para atualizar um comentário específico
router.patch("/comment/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
    if (!updatedComment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    return res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD (Delete): Apaga o pet especificado do banco

router.delete("/comment/:id", async (req, res) => {
  try {
    const { creatorId } = await Comment.findOne({ _id: req.params.id });
    const { cardId } = await Comment.findOne({ _id: req.params.id });

    const deleted = await Comment.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    await User.updateOne(
      { _id: creatorId },
      { $pull: { comments: req.params.id } }
    );
    await Card.updateOne(
      { _id: cardId },
      { $pull: { comments: req.params.id } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// Exportar nossa instância de roteador configurada
module.exports = router;
