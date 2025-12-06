const express = require('express');
const router = express.Router();
const { 
    getAllBarang,
    getBarangById,
    createBarang,
    deleteBarangById,
    updateBarangById 
} = require('./barang.service.js');

router.get('/', async (req, res) =>{
    const barang = await getAllBarang();
    res.send(barang);
});

router.get('/:barangId', async (req, res) =>{
    try {
        const barangId = parseInt (req.params.barangId);   
        const barang = await getBarangById(barangId);
        res.send(barang);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newBarang = req.body;
        const barang = await createBarang(newBarang);
        res.send({message: "barang berhasil ditambahkan", barang: barang});
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: "Kode barang sudah digunakan dan harus unik"
      });
    }
    }
    
});

router.delete('/:barangId', async (req, res) =>{
    try {
        const barangId = parseInt (req.params.barangId);
        await deleteBarangById(barangId);
        
        res.send({message: "barang berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:barangId', async (req, res) =>{
    try {
        const barangId = parseInt (req.params.barangId);
        const updatedBarang = req.body;
        const barang = await updateBarangById(barangId, updatedBarang);
        res.send({message: "barang berhasil diperbarui", barang: barang});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;