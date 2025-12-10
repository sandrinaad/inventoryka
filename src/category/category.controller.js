const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require("../auth/auth.middleware");
const { 
    getAllCategory,
    getCategoryById,
    createCategory,
    deleteCategorybyId,
    updateCategoryById 
} = require('./category.service.js');

router.get('/', authenticate, async (req, res) =>{
    const category = await getAllCategory();
    res.send(category);
});

router.get('/:categoryId', authenticate, async (req, res) =>{
    try {
        const categoryId = parseInt (req.params.categoryId);   
        const category = await getCategoryById(categoryId);
        res.send(category);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const newCategory = req.body;
        const category = await createCategory(newCategory);
        res.send({message: "category berhasil ditambahkan", category: category});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:categoryId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const categoryId = parseInt (req.params.categoryId);
        await deleteCategorybyId(categoryId);
        
        res.send({message: "category berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:categoryId', authenticate, authorizeRole(1, 2, 4), async (req, res) =>{
    try {
        const categoryId = parseInt (req.params.categoryId);
        const updatedCategory = req.body;
        const category = await updateCategoryById(categoryId, updatedCategory);
        res.send({message: "category berhasil diperbarui", category: category});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;