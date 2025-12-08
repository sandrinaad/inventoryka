
const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllPengajuan, findPengajuanById, insertPengajuan, deletePengajuan, editPengajuan } = require('./pengajuan.repository.js');

const getAllPengajuan = async () => {
    const pengajuan = await findAllPengajuan();
    return pengajuan;
}

const getPengajuanById = async (pengajuanId) => {
    const pengajuan = await findPengajuanById(pengajuanId);
    if (!pengajuan) {
        throw new Error('Pengajuan not found');
    }
    return pengajuan;
}

const createPengajuan = async (dataPengajuan, userId) => {
    const pengajuan = await insertPengajuan(dataPengajuan, userId);
    if (!dataPengajuan.barang_nama || !dataPengajuan.category_id || !dataPengajuan.harga || !dataPengajuan.jumlah || !dataPengajuan.location_id) {
        throw new Error("Semua field (barang_nama, category_id, harga, jumlah, location_id) wajib diisi");
    }
    return pengajuan;
}


const deletePengajuanById = async (pengajuanId) => {
    await getPengajuanById(pengajuanId); //cek Pengajuan ada atau tidak
    await deletePengajuan(pengajuanId);
    return;
}

const updatePengajuanById = async (pengajuanId, pengajuanData) => {
    await getPengajuanById(pengajuanId); //cek Pengajuan ada atau tidak
    const pengajuan = await editPengajuan(pengajuanId, pengajuanData);
    return pengajuan;
}

module.exports = {
    getAllPengajuan,
    getPengajuanById,
    createPengajuan,
    deletePengajuanById,
    updatePengajuanById
};

