const express = require('express');
const router = express.Router();
const Layout = require('../models/Layout');

// GET all layouts
router.get('/', async (req, res) => {
    try {
        const layouts = await Layout.find().sort({ updatedAt: -1 });
        res.json(layouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one layout
router.get('/:id', async (req, res) => {
    try {
        const layout = await Layout.findById(req.params.id);
        if (!layout) return res.status(404).json({ message: 'Layout not found' });
        res.json(layout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a layout
router.post('/', async (req, res) => {
    const layout = new Layout(req.body);
    try {
        const newLayout = await layout.save();
        res.status(201).json(newLayout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a layout
router.put('/:id', async (req, res) => {
    try {
        const layout = await Layout.findById(req.params.id);
        if (!layout) return res.status(404).json({ message: 'Layout not found' });

        Object.assign(layout, req.body);
        layout.updatedAt = Date.now();

        const updatedLayout = await layout.save();
        res.json(updatedLayout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a layout
router.delete('/:id', async (req, res) => {
    try {
        const layout = await Layout.findById(req.params.id);
        if (!layout) return res.status(404).json({ message: 'Layout not found' });

        await layout.deleteOne();
        res.json({ message: 'Layout deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
