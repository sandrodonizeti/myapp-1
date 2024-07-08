const UserModel = require('../models/userModel');

async function createUserTest() {
    try {
        const user = new UserModel({
            name: 'Carlos Alberto',
            username: 'carlosalberto',
            birthDate: '1990-01-01',
            password: '123456',
            email: 'carlosalberto@gmail.com',
            sex: 'Masculino'
        });

        const userId = await user.create();
        console.log(`Usuário cadastrado com ID: ${userId}`);
    } catch (error) {
        console.error(error);
    }
}

async function updateUserTest() {
    try {
        const user = await UserModel.findById(1); 

        if (user) {
            user.name = 'João Silva Torres';
            user.username = 'joaosilvatorres@gmail.com';

            const isUpdated = await user.update();
            if (isUpdated) {
                console.log('Usuário atualizado com sucesso.');
            } else {
                console.log('Nenhum usuário foi atualizado.');
            }
        } else {
            console.log('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteUserTest() {
    try {
        const user = await UserModel.findById(6); 

        if (user) {
            const isDeleted = await user.delete();
            if (isDeleted) {
                console.log('Usuário excluído com sucesso.');
            } else {
                console.log('Nenhum usuário foi excluído.');
            }
        } else {
            console.log('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function findUserByIdTest() {
    try {
        const user = await UserModel.findById(1);

        if (user) {
            console.log('Usuário encontrado:');
            console.log(user);
        } else {
            console.log('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function findAllUsersTest() {
    try {
        const users = await UserModel.findAll();

        if (users.length > 0) {
            console.log('Usuários encontrados:');
            console.log(users);
        } else {
            console.log('Nenhum usuário encontrado.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function findUserByUsernameOrEmailTest() {
    try {
        const usernameOrEmail = 'maria@gmail.com'; 
        const user = await UserModel.findByUsernameOrEmail(usernameOrEmail);

        if (user) {
            console.log('Usuário encontrado:');
            console.log(user);
        } else {
            console.log('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

// createUserTest();
// updateUserTest();
// deleteUserTest();
// findUserByIdTest();
// findAllUsersTest();
// findUserByUsernameOrEmailTest();