const { prisma } = require('../db');

const findAllCondi = async () => {
    const condi = await prisma.condi.findMany();
    return condi;
}

const findCondiById = async (condiId) => {
    const condi = await prisma.condi.findUnique({
        where: {
            id: condiId
        }
    });
    return condi;
}

const insertCondi = async (condiData) => {
    const condi = await prisma.condi.create({
        data: {
            nama: condiData.nama,
        }
    });
    return condi;
}

const deleteCondi = async (condiId) => {
    await prisma.condi.delete({
        where: {
            id: condiId,
        },
    });
}

const editCondi = async (condiId, condiData) => {
    const condi = await prisma.condi.update({
        where: {
            id: condiId
        },
        data: {
            nama: condiData.nama,
        }
    });
    return condi;
}

module.exports = {
    findAllCondi,
    findCondiById,
    insertCondi,
    deleteCondi,
    editCondi
};
