const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require("../auth/auth.middleware");
const { 
    getAllLocation,
    getLocationById,
    createLocation,
    deleteLocationById,
    updateLocationById 
} = require('./location.service.js');

router.get('/', authenticate, async (req, res) =>{
    const location = await getAllLocation();
    res.send(location);
});

router.get('/:locationId', authenticate, async (req, res) =>{
    try {
        const locationId = parseInt (req.params.locationId);   
        const location = await getLocationById(locationId);
        res.send(location);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const newLocation = req.body;
        const location = await createLocation(newLocation);
        res.send({message: "location berhasil ditambahkan", location: location});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:locationId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const locationId = parseInt (req.params.locationId);
        await deleteLocationById(locationId);
        
        res.send({message: "location berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:locationId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
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