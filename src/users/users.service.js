const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllUsers, findUserById, insertUser, deleteUser, editUser } = require('./users.repository.js');

const getAllUsers = async () => {
    const users = await findAllUsers();
    return users;
}

const getUsersById = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const createUser = async (newUser) => {
    const user = await insertUser(newUser);
        
    return user;
}

const deleteUserbyId = async (userId) => {
    
    await getUsersById(userId); //cek user ada atau tidak
    await deleteUser(userId);
    return;
}

const updateUserById = async (userId, userData) => {
    await getUsersById(userId); //cek user ada atau tidak
    const user = await editUser(userId, userData);
    return user;
}

module.exports = {
    getAllUsers,
    getUsersById,
    createUser,
    deleteUserbyId,
    updateUserById
};
