const User = require('../models/user');
const Service = require('../models/service');

exports.createService = async (req, res) => {
    if(req.body.name === undefined || req.body.description === undefined || req.body.tags === undefined ||
    req.body.type === undefined || req.body.email === undefined || req.body.phone === undefined){
        return res.status(200).json({error: 'You cannot create service with empty fields'});
    }

    if(req.body.name === '' || req.body.description === '' || req.body.tags === '' ||
    req.body.type === '' || req.body.email === '' || req.body.phone === ''){
        return res.status(200).json({error: 'You cannot create service with empty fields'});
    }


    const newService = new Service();
    newService.name = req.body.name;
    newService.description = req.body.description;
    newService.tags = req.body.tags;
    newService.type = req.body.type;
    newService.email = req.body.email;
    newService.phone = req.body.phone;
    newService.user = req.body.userId;

    const serviceData = await newService.save();

    await User.update({
        '_id': req.body.userId
    }, {
        $push: {services: {
            service: serviceData._id
        }}
    });

    return res.status(200).json({message: 'Service created successfully'});
}

exports.getAllServices = async (req, res) => {
    const results = await Service.find({})
                            .populate("rating.user");

    return res.status(200).json({result: results});
}

exports.addReview = async (req, res) => {
    if(req.body.stars === '' || req.body.review === ''){
        return res.status(200).json({error: 'No empty fields allowed'});
    }

    if(req.body.stars === undefined || req.body.review === undefined ){
        return res.status(200).json({error: 'No empty fields allowed'});
    }

    const service = await Service.update({
        "_id": req.body.serviceId
    }, {
        $push: {rating: {
            user: req.body.userId,
            // culture: req.body.culture,
            // benefits: req.body.benefits,
            // balance: req.body.balance,
            stars: req.body.stars,
            review: req.body.review
            // userOverall: req.body.overall
        },
            // ratingOverall: req.body.overall,
            // cultureTotal: req.body.culture,
            // benefitsTotal: req.body.benefits,
            // balanceTotal: req.body.balance,
            starsTotal: req.body.stars
        },
        $inc: {totalStars: req.body.stars}
    });

    return res.status(200).json({message: 'Review added successfully'});
}


exports.search = async (req, res) => {
    const searchName = req.body.service;
    const regex = new RegExp(searchName, 'gi');
    const service = await Service.find({"servicename": regex});

    if(service.length > 0){
        return res.status(200).json({message: "Search Results", results: service});
    } else {
        return res.status(200).json({message: "Search Results", results: []});
    }
}










































