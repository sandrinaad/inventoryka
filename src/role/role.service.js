const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllRole, findRoleById, insertRole, deleteRole, editRole } = require('./role.repository.js');

const getAllRole = async () => {
    const role = await findAllRole();
    return role;
}

const getRoleById = async (roleId) => {
    const role = await findRoleById(roleId);

    if (!role) {
        throw new Error('User not found');
    }
    return role;
}

const createRole = async (newRole) => {
    const role = await insertRole(newRole);
        
    return role;
}

const deleteRolebyId = async (RoleId) => {
    
    await getRoleById(RoleId); //cek role ada atau tidak
    await deleteRole(RoleId);
    return;
}

const updateRoleById = async (roleId, roleData) => {
    await getRoleById(roleId); //cek role ada atau tidak
    const role = await editRole(roleId, roleData);
    return role;
}

module.exports = {
    getAllRole,
    getRoleById,
    createRole,
    deleteRolebyId,
    updateRoleById

};
