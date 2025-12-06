const { get } = require('express/lib/response');
const { prisma } = require('../db');
const { findAllLocation, findLocationById, insertLocation, deleteLocation, editLocation } = require('./location.repository.js');

const getAllLocation = async () => {
    const location = await findAllLocation();
    return location;
}

const getLocationById = async (locationId) => {
    const location = await findLocationById(locationId);
    if (!location) {
        throw new Error('User not found');
    }
    return location;
}

const createLocation = async (newLocation) => {
    const location = await insertLocation(newLocation);
        
    return location;
}

const deleteLocationById = async (locationId) => {
    
    await getLocationById(locationId); //cek Location ada atau tidak
    await deleteLocation(locationId);
    return;
}

const updateLocationById = async (locationId, locationData) => {
    await getLocationById(locationId); //cek Location ada atau tidak
    const location = await editLocation(locationId, locationData);
    return location;
}

module.exports = {
    getAllLocation,
    getLocationById,
    createLocation,
    deleteLocationById,
    updateLocationById

};
