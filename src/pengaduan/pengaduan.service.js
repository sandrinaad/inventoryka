
const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllPengaduan, findPengaduanById, insertPengaduan, deletePengaduan, editPengaduan } = require('./pengaduan.repository.js');

const getAllPengaduan = async () => {
    const pengaduan = await findAllPengaduan();
    return pengaduan;
}

const getPengaduanById = async (pengaduanId) => {
    const pengaduan = await findPengaduanById(pengaduanId);
    if (!pengaduan) {
        throw new Error('Pengaduan not found');
    }
    return pengaduan;
}

const createPengaduan = async (dataPengaduan, userId) => {
    const pengaduan = await insertPengaduan(dataPengaduan, userId);
    if (!dataPengaduan.barang_id || !dataPengaduan.category_id || !dataPengaduan.location_id || !dataPengaduan.condi_id) {
        throw new Error("Semua field (barang_id, category_id, location_id, condi_id) wajib diisi");
    }
    return pengaduan;
}


const deletePengaduanById = async (pengaduanId) => {
    await getPengaduanById(pengaduanId); //cek Pengaduan ada atau tidak
    await deletePengaduan(pengaduanId);
    return;
}

const updatePengaduanById = async (pengaduanId, pengaduanData) => {
    await getPengaduanById(pengaduanId); //cek Pengaduan ada atau tidak
    const pengaduan = await editPengaduan(pengaduanId, pengaduanData);
    return pengaduan;
}

const updateStatusPengaduanById = async (pengaduanId, status) => {
    await getPengaduanById(pengaduanId);
    const pengaduan = await updateStatusPengaduan(pengaduanId, status);
    return pengaduan;
}

module.exports = {
    getAllPengaduan,
    getPengaduanById,
    createPengaduan,
    deletePengaduanById,
    updatePengaduanById,
    updateStatusPengaduanById
};

