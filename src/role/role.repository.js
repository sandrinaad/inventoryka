const { prisma } = require('../db');

const findAllRole = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const findRoleById = async (roleId) => {
    const role = await prisma.role.findUnique({
        where: {
            id: roleId
        }
    });
    return role;
}

const insertRole = async (roleData) => {
    const role = await prisma.role.create({
        data: {
            nama: roleData.nama,
        }
    });
    return role;
}

const deleteRole = async (roleId) => {
    await prisma.role.delete({
        where: {
            id: roleId,
        },
    });
}

const editRole = async (roleId, roleData) => {
    const role = await prisma.role.update({
        where: {
            id: roleId
        },
        data: {
            nama: roleData.nama,
        }
    });
    return role;
}

module.exports = {
    findAllRole,
    findRoleById,
    insertRole,
    deleteRole,
    editRole
};
