const mongoose = require('mongoose');
const MobileData = require('./mobile_data');
const TVData = require('./tablet_data');

const gadgetSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        index: true,
        trim: true,
        min: 3
    },
    gadget_image: [
        { img: { type: String } }
    ],
    description: {
        type: String
    },
    prices: {
            Amazon: {type: Number},
            Flipkart: {type: Number}
    },
    brand: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    gadget_data: {
        type: [mongoose.Schema.Types.ObjectId],
        refPath: 'category'
    },
    category: {
        type: String,
        enum: ['mobile', 'TV', 'laptop', 'camera'],
        required: true,
        default: 'mobile',
    },
    youtube_links:{
        type: Array,
    },
    additional_links:{
        amazon : {type:String},
        Flipkart: {type:String},
        desc : {type:String}
    }
}, { timestamps: true});

module.exports = mongoose.model("Gadget", gadgetSchema);