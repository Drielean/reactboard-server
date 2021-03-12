const express = require("express");
const router = express.Router();
const passport = require("passport");

const Board = require("../models/Board.model");
const Column = require("../models/Column.model");

// Crud (Create): Rota para criar uma nova Board
router.post(
  "/board",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newBoard = await Board.create({ ...req.body });

      const columnToDo = await Column.create({
        key: "fazer",
        boardId: newBoard._id,
        title: "Fazer",
        cards: [],
      });
      const columnDoing = await Column.create({
        key: "fazendo",
        boardId: newBoard._id,
        title: "Fazendo",
        cards: [],
      });
      const columnDone = await Column.create({
        key: "feito",
        boardId: newBoard._id,
        title: "Feito",
        cards: [],
      });

      await Board.updateOne(
        { _id: newBoard._id },
        {
          $push: { columns: [columnToDo._id, columnDoing._id, columnDone._id] },
        }
      );

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
      const boards = await Board.find().sort({ created: -1 });
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

// Exportar nossa instância de roteador configurada
module.exports = router;
