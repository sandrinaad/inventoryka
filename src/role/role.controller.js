const express = require('express');
const router = express.Router();
const { 
    getAllRole,
    getRoleById,
    createRole,
    deleteRolebyId,
    updateRoleById 
} = require('./role.service.js');

router.get('/', async (req, res) =>{
    const role = await getAllRole();
    res.send(role);
});

router.get('/:roleId', async (req, res) =>{
    try {
        const roleId = parseInt (req.params.roleId);   
        const role = await getRoleById(roleId);
        res.send(role);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newRole = req.body;
        const role = await createRole(newRole);
        res.send({message: "role berhasil ditambahkan", role: role});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:roleId', async (req, res) =>{
    try {
        const roleId = parseInt (req.params.roleId);
        await deleteRolebyId(roleId);
        
        res.send({message: "role berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:roleId', async (req, res) =>{
    try {
        const roleId = parseInt (req.params.roleId);
        const updatedRole = req.body;
        const role = await updateRoleById(roleId, updatedRole);
        res.send({message: "role berhasil diperbarui", role: role});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;