const { prisma } = require('../db');

const findAllLocation = async () => {
    const location = await prisma.location.findMany();
    return location;
}

const findLocationById = async (locationId) => {
    const location = await prisma.location.findUnique({
        where: {
            id: locationId
        }
    });
    return location;
}

const insertLocation = async (locationData) => {
    const location = await prisma.location.create({
        data: {
            nama: locationData.nama,
        }
    });
    return location;
}

const deleteLocation = async (locationId) => {
    await prisma.location.delete({
        where: {
            id: locationId,
        },
    });
}

const editLocation = async (locationId, locationData) => {
    const location = await prisma.location.update({
        where: {
            id: locationId
        },
        data: {
            nama: locationData.nama,
        }
    });
    return location;
}

module.exports = {
    findAllLocation,
    findLocationById,
    insertLocation,
    deleteLocation,
    editLocation
};
