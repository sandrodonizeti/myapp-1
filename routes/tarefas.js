const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefas');

// Listar todas as tarefas
router.get('/', tarefaController.listarTarefas);

// Formulário para cadastro de tarefa
router.get('/cadastrar', tarefaController.exibirFormularioCadastro);

// Cadastro da tarefa
router.post('/cadastrar', tarefaController.cadastrarTarefa);

// Exibição dos detalhes de uma tarefa com base no id
router.get('/exibir/:id', tarefaController.exibirDetalhesTarefa);

// Formulário para deleção de uma tarefa com base no id
router.get('/deletar/:id', tarefaController.exibirFormularioDelecao);

// Deleção de uma tarefa com base no id
router.post('/deletar/:id', tarefaController.deletarTarefa);

module.exports = router;