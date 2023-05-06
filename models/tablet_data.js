const mongoose = require('mongoose');

const tabletSchema = new mongoose.Schema({
    general : {
            model : {type: String},
            warranty : {type: Number},
            box_contents: {type: String}
    },
    audio:
        {
            num_speakers : {type: Number},
            output_per_speaker : {type: Number},
            total_speaker_output : {type: Number},
            speaker_frequency_range : {type: String}
    }
});

module.exports = mongoose.model("TabletData", tabletSchema);