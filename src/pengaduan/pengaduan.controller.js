const express = require('express');
const router = express.Router();
const { 
    getAllPengaduan,
    getPengaduanById,
    createPengaduan,
    deletePengaduanById,
    updatePengaduanById,
    updateStatusPengaduanById
} = require('./pengaduan.service.js');

router.get('/', async (req, res) =>{
    const pengaduan = await getAllPengaduan();
    res.send(pengaduan);
});

router.get('/:pengaduanId', async (req, res) =>{
    try {
        const pengaduanId = parseInt (req.params.pengaduanId);   
        const pengaduan = await getPengaduanById(pengaduanId);
        res.send(pengaduan);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newPengaduan = req.body;
        const pengaduan = await createPengaduan(newPengaduan);
        res.send({message: "pengaduan berhasil ditambahkan", pengaduan: pengaduan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:pengaduanId', async (req, res) =>{
    try {
        const pengaduanId = parseInt (req.params.pengaduanId);
        await deletePengaduanById(pengaduanId);
        
        res.send({message: "pengaduan berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:pengaduanId', async (req, res) =>{
    try {
        const pengaduanId = parseInt (req.params.pengaduanId);
        const updatedPengaduan = req.body;
        const pengaduan = await updatePengaduanById(pengaduanId, updatedPengaduan);
        res.send({message: "pengaduan berhasil diperbarui", pengaduan: pengaduan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.patch('/:pengaduanId/status', async (req, res) =>{
    try {
        const pengaduanId = parseInt (req.params.pengaduanId);
        const { status } = req.body;
        const pengaduan = await updateStatusPengaduanById(pengaduanId, status);
        res.send({message: "Status pengaduan berhasil diperbarui", pengaduan: pengaduan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;