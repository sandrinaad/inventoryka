const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require("../auth/auth.middleware");
const { 
    getAllCondi,
    getCondiById,
    createCondi,
    deleteCondiById,
    updateCondiById 
} = require('./condi.service.js');

router.get('/', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    const condi = await getAllCondi();
    res.send(condi);
});

router.get('/:condiId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const condiId = parseInt (req.params.condiId);   
        const condi = await getCondiById(condiId);
        res.send(condi);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const newCondi = req.body;
        const condi = await createCondi(newCondi);
        res.send({message: "condition berhasil ditambahkan", condi: condi});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:condiId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const condiId = parseInt (req.params.condiId);
        await deleteCondiById(condiId);
        
        res.send({message: "condition berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:condiId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const condiId = parseInt (req.params.condiId);
        const updatedCondi = req.body;
        const condi = await updateCondiById(condiId, updatedCondi);
        res.send({message: "condition berhasil diperbarui", condi: condi});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;