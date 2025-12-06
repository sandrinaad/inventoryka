const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllBarang, findBarangById, insertBarang, deleteBarang, editBarang } = require('./barang.repository.js');

const getAllBarang = async () => {
    const barang = await findAllBarang();
    return barang;
}

const getBarangById = async (barangId) => {
    const barang = await findBarangById(barangId);
    if (!barang) {
        throw new Error('Barang not found');
    }
    return barang;
}

const createBarang = async (newBarang) => {
    const barang = await insertBarang(newBarang);
    
    return barang;
}

const deleteBarangById = async (barangId) => {
    
    await getBarangById(barangId); //cek Barang ada atau tidak
    await deleteBarang(barangId);
    return;
}

const updateBarangById = async (barangId, barangData) => {
    await getBarangById(barangId); //cek Barang ada atau tidak
    const barang = await editBarang(barangId, barangData);
    return barang;
}

module.exports = {
    getAllBarang,
    getBarangById,
    createBarang,
    deleteBarangById,
    updateBarangById
};
