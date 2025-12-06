const { prisma } = require('../db');

const findAllPengaduan = async () => {
    const pengaduan = await prisma.pengaduan.findMany();
    return pengaduan;
}

const findPengaduanById = async (pengaduanId) => {
    const pengaduan = await prisma.pengaduan.findUnique({
        where: {
            id: pengaduanId
        }
    });
    return pengaduan;
}

async function insertPengaduan(dataPengaduan, userId) {
    const pengaduan = await prisma.pengaduan.create({
        data: {
            tanggal: new Date(),
            user_id: userId, // otomatis dari login
            barang_id: dataPengaduan.barang_id,
            category_id: dataPengaduan.category_id,
            location_id: dataPengaduan.location_id,
            condi_id: dataPengaduan.condi_id,
            keterangan: dataPengaduan.keterangan,
            status: "PENDING"  // default status
        }
    });
    return pengaduan;
}

const deletePengaduan = async (pengaduanId) => {
    await prisma.pengaduan.delete({
        where: {
            id: pengaduanId,
        },
    });
}

const editPengaduan = async (pengaduanId, pengaduanData) => {
    const pengaduan = await prisma.pengaduan.update({
        where: {
            id: pengaduanId
        },
        data: {
            barang_id: dataPengaduan.barang_id,
            category_id: dataPengaduan.category_id,
            location_id: dataPengaduan.location_id,
            condi_id: dataPengaduan.condi_id,
            keterangan: dataPengaduan.keterangan,
        }
    });
    return pengaduan;
}

module.exports = {
    findAllPengaduan,
    findPengaduanById,
    insertPengaduan,
    deletePengaduan,
    editPengaduan
};
