const express = require('express');
const router = express.Router();
const { prisma } = require ('../db/index.js');
const { 
    getAllUsers,
    getUsersById,
    createUser,
    deleteUserbyId,
    updateUserById 
} = require('./users.service.js');

router.get('/', async (req, res) =>{
    const users = await getAllUsers();
    res.send(users);
});

router.get('/:userId', async (req, res) =>{
    try {
        const userId = parseInt (req.params.userId);   
        const user = await getUsersById(userId);
        res.send(user);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newUser = req.body;
        const user = await createUser(newUser);
        res.send({message: "User berhasil ditambahkan", user: user});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:userId', async (req, res) =>{
    try {
        const userId = parseInt (req.params.userId);
        await deleteUserbyId(userId);
        
        res.send({message: "User berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:userId', async (req, res) =>{
    try {
        const userId = parseInt (req.params.userId);
        const updatedUser = req.body;
        const user = await updateUserById(userId, updatedUser);
        res.send({message: "User berhasil diperbarui", user: user});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;