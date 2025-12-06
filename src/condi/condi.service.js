const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllCondi, findCondiById, insertCondi, deleteCondi, editCondi } = require('./condi.repository.js');

const getAllCondi = async () => {
    const condi = await findAllCondi();
    return condi;
}

const getCondiById = async (condiId) => {
    const condi = await findCondiById(condiId);
    if (!condi) {
        throw new Error('Condition not found');
    }
    return condi;
}

const createCondi = async (newCondi) => {
    const condi = await insertCondi(newCondi);
        
    return condi;
}

const deleteCondiById = async (condiId) => {
    
    await getCondiById(condiId); //cek Condi ada atau tidak
    await deleteCondi(condiId);
    return;
}

const updateCondiById = async (condiId, condiData) => {
    await getCondiById(condiId); //cek Condi ada atau tidak
    const condi = await editCondi(condiId, condiData);
    return condi;
}

module.exports = {
    getAllCondi,
    getCondiById,
    createCondi,
    deleteCondiById,
    updateCondiById

};
