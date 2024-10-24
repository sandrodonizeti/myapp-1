const MessageModel = require('../models/messageModel');

class MessageController {
  // Renderiza a lista de mensagens
  static async index(req, res) {
    try {
      const messages = await MessageModel.findAll();
      return res.render('messages/index', { messages: messages });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Renderiza um formulário para criar uma nova mensagem
  static async createForm(req, res) {
    res.render('messages/create');
  }

  // Cria uma nova mensagem
  static async create(req, res) {
    try {
      const { content, user_id, filename, path } = req.body;
      const message = new MessageModel({
        content,
        user_id,
        filename,
        path
      });
      const insertedMessageId = await message.create();
      res.redirect(`/messages/${insertedMessageId}`);
    } catch (error) {
      console.log(error);
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Renderiza uma mensagem específica
  static async show(req, res) {
    try {
      const id = req.params.id;
      const message = await MessageModel.findById(id);
      if (!message) {
        return res.status(404).render('404.ejs');
      }
      res.render('messages/show', { message: message });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Renderiza o formulário de edição de uma mensagem
  static async editForm(req, res) {
    try {
      const id = req.params.id;
      const message = await MessageModel.findById(id);
      if (!message) {
        return res.status(404).render('404.ejs');
      }
      res.render('messages/edit', { message: message });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Atualiza uma mensagem
  static async edit(req, res) {
    try {
      const id = req.params.id;
      const { content, filename, path } = req.body;
      const message = new MessageModel({
        id,
        content,
        filename,
        path
      });
      const result = await message.update();
      if (!result) {
        return res.status(404).render('404.ejs');
      }
      res.redirect(`/messages/${id}`);
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Renderiza o formulário para deletar uma mensagem
  static async deleteForm(req, res) {
    try {
      const id = req.params.id;
      const message = await MessageModel.findById(id);
      if (!message) {
        return res.status(404).render('404.ejs');
      }
      res.render('messages/delete', { message: message });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  // Deleta uma mensagem
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const message = new MessageModel({ id });
      const result = await message.delete();
      if (!result) {
        return res.status(404).render('404.ejs');
      }
      res.redirect('/messages');
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }
}

module.exports = MessageController;
