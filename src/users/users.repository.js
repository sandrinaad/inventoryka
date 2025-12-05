const { prisma } = require('../db');
const { getUsersById } = require('./users.service');

const findAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const findUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
}

const insertUser = async (userData) => {
    const user = await prisma.user.create({
        data: {
            nama: userData.nama,
            email: userData.email,
            password: userData.password,
            role_id: userData.role_id
        }
    });
    return user;
}

const deleteUser = async (userId) => {
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
}

const editUser = async (userId, userData) => {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            nama: userData.nama,
            email: userData.email,
            password: userData.password,
            role_id: userData.role_id
        }
    });
    return user;
}

module.exports = {
    findAllUsers,
    findUserById,
    insertUser,
    deleteUser,
    editUser
};
