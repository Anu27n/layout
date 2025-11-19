const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Untitled Layout'
    },
    totalArea: {
        type: Number,
        required: true
    },
    variant: {
        type: String,
        default: 'large'
    },
    areas: {
        type: Map,
        of: Number,
        default: {}
    },
    areaValues: {
        type: Map,
        of: Number,
        default: {}
    },
    seatCounts: {
        smallCabin: { type: Number, default: 0 },
        hrRoom: { type: Number, default: 0 },
        sales: { type: Number, default: 0 },
        financeRoom: { type: Number, default: 0 }
    },
    builtArea: Number,
    availableArea: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Layout', LayoutSchema);
