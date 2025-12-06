const express = require('express');
const router = express.Router();
const { 
    getAllLocation,
    getLocationById,
    createLocation,
    deleteLocationById,
    updateLocationById 
} = require('./location.service.js');

router.get('/', async (req, res) =>{
    const location = await getAllLocation();
    res.send(location);
});

router.get('/:locationId', async (req, res) =>{
    try {
        const locationId = parseInt (req.params.locationId);   
        const location = await getLocationById(locationId);
        res.send(location);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newLocation = req.body;
        const location = await createLocation(newLocation);
        res.send({message: "location berhasil ditambahkan", location: location});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:locationId', async (req, res) =>{
    try {
        const locationId = parseInt (req.params.locationId);
        await deleteLocationById(locationId);
        
        res.send({message: "location berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:locationId', async (req, res) =>{
    try {
        const locationId = parseInt (req.params.locationId);
        const updatedLocation = req.body;
        const location = await updateLocationById(locationId, updatedLocation);
        res.send({message: "location berhasil diperbarui", location: location});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;