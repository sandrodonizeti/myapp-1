const pool = require('../config/dbConfig');

class MessageModel {
  constructor({ id, content, user_id, filename, path }) {
    this.id = id;
    this.content = content;
    this.user_id = user_id;
    this.filename = filename;
    this.path = path;
  }

  // Cria uma nova mensagem
  async create() {
    try {
      const sql = "INSERT INTO message (content, user_id, filename, path) VALUES (?, ?, ?, ?)";
      const values = [this.content, this.user_id, this.filename, this.path];
      const [result] = await pool.query(sql, values);
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar a mensagem.');
    }
  }

  // Encontra uma mensagem pelo ID
  static async findById(id) {
    try {
      const sql = "SELECT * FROM message WHERE id = ?";
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar a mensagem.');
    }
  }

  // Atualiza uma mensagem
  async update() {
    try {
      const sql = "UPDATE message SET content = ?, filename = ?, path = ? WHERE id = ?";
      const values = [this.content, this.filename, this.path, this.id];
      const [result] = await pool.query(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar a mensagem.');
    }
  }

  // Deleta uma mensagem
  async delete() {
    try {
      const sql = "DELETE FROM message WHERE id = ?";
      const [result] = await pool.query(sql, [this.id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao deletar a mensagem.');
    }
  }

  // Encontra todas as mensagens
  static async findAll() {
    try {
      const sql = "SELECT * FROM message";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar mensagens.');
    }
  }
}

module.exports = MessageModel;
