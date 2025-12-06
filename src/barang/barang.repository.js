const { prisma } = require('../db');

const findAllBarang = async () => {
    const barang = await prisma.barang.findMany();
    return barang;
}

const findBarangById = async (barangId) => {
    const barang = await prisma.barang.findUnique({
        where: {
            id: barangId
        }
    });
    return barang;
}

const insertBarang = async (barangData) => {
    const barang = await prisma.barang.create({
        data: {
            nama: barangData.nama,
            kode: barangData.kode,
            kategoriId: barangData.kategoriId,
            merk: barangData.merk,
            spesifikasi: barangData.spesifikasi,
            tahun_beli: barangData.tahun_beli,
            harga_beli: barangData.harga_beli,
            jumlah: barangData.jumlah,
            lokasiId: barangData.lokasiId,
            kondisiId: barangData.kondisiId,
        }
    });
    return barang;
}

const deleteBarang = async (barangId) => {
    await prisma.barang.delete({
        where: {
            id: barangId,
        },
    });
}

const editBarang = async (barangId, barangData) => {
    const barang = await prisma.barang.update({
        where: {
            id: barangId
        },
        data: {
            nama: barangData.nama,
            kode: barangData.kode,
            kategoriId: barangData.kategoriId,
            merk: barangData.merk,
            spesifikasi: barangData.spesifikasi,
            tahun_beli: barangData.tahun_beli,
            harga_beli: barangData.harga_beli,
            jumlah: barangData.jumlah,
            lokasiId: barangData.lokasiId,
            kondisiId: barangData.kondisiId,
        }
    });
    return barang;
}

module.exports = {
    findAllBarang,
    findBarangById,
    insertBarang,
    deleteBarang,
    editBarang
};
