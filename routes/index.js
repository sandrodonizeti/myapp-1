const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');
const multer = require('multer');
const photoController = require('../controllers/photoController');
const PhotoModel = require('../models/photoModel');
const MessageController = require('../controllers/messageController');

const path = require('path');
const { v4: uuidv4 } = require('uuid');
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4();
    const extension = path.extname(file.originalname).toLowerCase();
    const newFilename = uniqueFilename + extension;
    cb(null, newFilename); // Apenas o nome do arquivo sem o caminho completo
  },
});

const upload = multer({ storage: storage });

// Rota para renderizar a página inicial
router.get('/', async function (req, res, next) {
  try {
    const { user } = req.session;
    res.render('index', { user });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Rota para renderizar a página pratica
router.get('/pratica', async function (req, res, next) {
  try {
    const user_id = req.session.user.id;
    const sql = `
      SELECT message.content, 
             message.filename,
             message.path,
             DATE_FORMAT(message.createdAt, '%d/%m %H:%i') AS createdAt, 
             user.username,
             user.photo
      FROM message 
      LEFT JOIN user ON message.user_id = user.id`;
    const [rows] = await pool.query(sql, [user_id]);
    console.log(rows);
    res.render('users/pratica', { mensagens: rows, user_id: user_id, user: req.session.user }); // Passando req.session.user
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// Rota para renderizar a página pratica1
router.get('/pratica1', async function (req, res, next) {
  try {
    const user_id = req.session.user.id;
    const sql = `
      SELECT message.content, 
              message.filename,
              message.path,
             DATE_FORMAT(message.createdAt, '%d/%m %H:%i') AS createdAt, 
             user.username,
             user.photo
      FROM message 
      LEFT JOIN user ON message.user_id = user.id`;
    const [rows] = await pool.query(sql, [user_id]);
    console.log(rows);
    res.render('users/pratica1', { mensagens: rows, user_id: user_id, user: req.session.user }); // Passando req.session.user
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Rota para enviar uma mensagem na página pratica
router.post('/pratica', async function (req, res, next) {
  try {
    const sql = "insert into message (content,user_id) values (?, ?)";
    const values = [req.body.mensagem, req.body.user_id];
    const [rows] = await pool.query(sql, values);
    res.redirect('/pratica');
  } catch (error) {
    console.error(error);
    res.send('Ocorreu um erro ao enviar a mensagem.');
  }
});

// Rota para renderizar a página de confirmação de exclusão
router.get('/mensagens/deletar/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM message WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).render('404.ejs');
    }
    res.render('messages/delete', { message: rows[0] });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Rota para excluir uma mensagem
router.post('/mensagens/deletar/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM message WHERE id = ?";
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).render('404.ejs');
    }
    res.redirect('/pratica'); // Redireciona para a página de mensagens
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/upload', upload.single('file'), photoController.uploadPhoto);

module.exports = router;




