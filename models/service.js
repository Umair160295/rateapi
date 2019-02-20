const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    servicename: {type: String},
    description: {type: String, default: ''},
    tags: {type: String, default: ''},
    type: {type: String, default: ''},
    email: {type: String, default: ''},
    phone: {type: String, default: ''},
    website: {type: String, default: ''},
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''},
    rating: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        // culture: {type: Number, default: 0},
        // benefits: {type: Number, default: 0},
        // balance: {type: Number, default: 0},
        stars: {type: Number, default: 0},
        review: {type: String, default: ''},
        //userOverall: {type: Number, default: 0},
        created: {type: Date, default: Date.now}
    }],
    totalStars: {type: Number, default: 0},
    ratingOverall: [Number],
});

module.exports = mongoose.model('Service', serviceSchema);