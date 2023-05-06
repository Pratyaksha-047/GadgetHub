const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
        key_specs: {
                ram: { type: Number },
                processor: { type: String },
                rear_cam: { type: String },
                front_cam: { type: String },
                battery: { type: Number },
                display: { type: Number },
        },
        general: {
                launch_date: { type: Date, default: Date.now },
                os: { type: String },
                custom_ui: { type: String }
        }
});

module.exports = mongoose.model("MobileData", mobileSchema);