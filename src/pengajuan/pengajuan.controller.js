const express = require('express');
const router = express.Router();
const { 
    getAllPengajuan,
    getPengajuanById,
    createPengajuan,
    deletePengajuanById,
    updatePengajuanById,
    updateStatusPengajuanById 
} = require('./pengajuan.service.js');

router.get('/', async (req, res) =>{
    const pengajuan = await getAllPengajuan();
    res.send(pengajuan);
});

router.get('/:pengajuanId', async (req, res) =>{
    try {
        const pengajuanId = parseInt (req.params.pengajuanId);   
        const pengajuan = await getPengajuanById(pengajuanId);
        res.send(pengajuan);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.post('/', async (req, res) =>{
    try {
        const newPengajuan = req.body;
        const pengajuan = await createPengajuan(newPengajuan);
        res.send({message: "pengajuan berhasil ditambahkan", pengajuan: pengajuan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    
});

router.delete('/:pengajuanId', async (req, res) =>{
    try {
        const pengajuanId = parseInt (req.params.pengajuanId);
        await deletePengajuanById(pengajuanId);
        
        res.send({message: "pengajuan berhasil dihapus"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/:pengajuanId', async (req, res) =>{
    try {
        const pengajuanId = parseInt (req.params.pengajuanId);
        const updatedPengajuan = req.body;
        const pengajuan = await updatePengajuanById(pengajuanId, updatedPengajuan);
        res.send({message: "pengajuan berhasil diperbarui", pengajuan: pengajuan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.patch('/:pengajuanId/status', async (req, res) =>{
    try {
        const pengajuanId = parseInt (req.params.pengajuanId);
        const { status } = req.body;
        const pengajuan = await updateStatusPengajuanById(pengajuanId, status);
        res.send({message: "Status pengajuan berhasil diperbarui", pengajuan: pengajuan});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

module.exports = router;