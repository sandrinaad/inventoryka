const { prisma } = require('../db');

const findAllPengajuan = async () => {
    const pengajuan = await prisma.pengajuan.findMany();
    return pengajuan;
}

const findPengajuanById = async (pengajuanId) => {
    const pengajuan = await prisma.pengajuan.findUnique({
        where: {
            id: pengajuanId
        }
    });
    return pengajuan;
}

async function insertPengajuan(dataPengajuan, userId) {
    const pengajuan = await prisma.pengajuan.create({
        data: {
            tanggal: new Date(),
            user_id: userId, // otomatis dari login
            barang_nama: dataPengajuan.barang_nama,
            category_id: dataPengajuan.category_id,
            jumlah: dataPengajuan.jumlah,
            harga: dataPengajuan.harga,
            location_id: dataPengajuan.location_id,
            status: "PENDING"  // default status
        }
    });
    return pengajuan;
}

const deletePengajuan = async (pengajuanId) => {
    await prisma.pengajuan.delete({
        where: {
            id: pengajuanId,
        },
    });
}

const editPengajuan = async (pengajuanId, pengajuanData) => {
    const pengajuan = await prisma.pengajuan.update({
        where: {
            id: pengajuanId
        },
        data: {
            barang_nama: pengajuanData.barang_nama,
            category_id: pengajuanData.category_id,
            jumlah: pengajuanData.jumlah,
            harga: pengajuanData.harga,
            location_id: pengajuanData.location_id,
        }
    });
    return pengajuan;
}

const updateStatusPengajuan = async (pengajuanId, status) => {
    const pengajuan = await prisma.pengajuan.update({
        where: {
            id: pengajuanId
        },
        data: {
            status: status
        }
    });
    return pengajuan;
}

module.exports = {
    findAllPengajuan,
    findPengajuanById,
    insertPengajuan,
    deletePengajuan,
    editPengajuan,
    updateStatusPengajuan
};
