const MobileData = require('../models/mobile_data');
const TabletData = require('../models/tablet_data');
const Gadget = require("../models/gadget");
const DesktopData = require("../models/desktop_data")
const LaptopData = require("../models/laptop_data")
const Gadreview = require("../models/gadget_review")

exports.add_mobile = (req, res) => {
    const { name, description, amazonPrice, flipkartPrice, brand, rating, youtubeLinks } = req.body;

    const newGadget = new Gadget({
        Name: name,
        description,
        prices: [
            { Amazon: amazonPrice },
            { Flipkart: flipkartPrice }
        ],
        brand,
        rating,
        category: 'mobile',
        youtube_links: youtubeLinks
    });

    const newMobileData = new MobileData({
        key_specs: {
            ram: req.body.ram,
            processor: req.body.processor
        },
        general: {
            os: req.body.os
        }
    });

    newGadget.gadget_data = newMobileData._id;

    newMobileData.save()
        .then(data => {
            newGadget.save()
                .then(gadget => {
                    return res.send(gadget);
                })
                .catch(err => {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                })
        })
        .catch(err => {
            return res.status(400).json({
                message: 'Something went wrong'
            })
        });
}

exports.add_tablet = (req, res) => {
    const { name, description, amazonPrice, flipkartPrice, brand, rating, youtubeLinks } = req.body;

    const newGadget = new Gadget({
        Name: name,
        description,
        prices: [
            { Amazon: amazonPrice },
            { Flipkart: flipkartPrice }
        ],
        brand,
        rating,
        category: 'tablet',
        youtube_links: youtubeLinks
    });

    const newtabletData = new TabletData({
        general: {
            model: req.body.model,
            box_contents: req.body.bodyParser
        },
        audio: {
            num_speakers: req.body.num_speakers
        }
    });

    newGadget.gadget_data = newtabletData._id;

    newtabletData.save()
        .then(data => {
            newGadget.save()
                .then(gadget => {
                    return res.send(gadget);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            })
        });
}

exports.getallproducts = (req, res) => {
    Gadget.find()
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getallmobiles = (req, res) => {
    Gadget.find({ category: "mobile" })
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getalltablets = (req, res) => {
    Gadget.find({ category: "tablet" })
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getalllaptops = (req, res) => {
    Gadget.find({ category: "laptop" })
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getalldesktops = (req, res) => {
    Gadget.find({ category: "desktop" })
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getallbrands = (req, res) => {
    Gadget.distinct("brand")
        .then(brands => {
            return res.send(brands);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getproductsbybrand = (req, res) => {
    Gadget.find({ brand: req.body.brand })
        .then(gadgets => {
            return res.send(gadgets);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        })
}

exports.getproduct = (req, res) => {
    const gadget_id = req.body.gadget_id;
    Gadget.findById(gadget_id)
        .then(gadget => {
            if (gadget) {
                Gadreview.find({ gadget_id: req.body.gadget_id })
                    .then(gadreviews => {
                        res.status(200).json({
                            gadget, gadreviews
                        });
                    }).catch(error => {
                        console.error(error);
                        return res.status(400).json({
                            message: 'Something went wrong'
                        });
                    });
                //gadget specs
            }
            else {
                return res.status(400).json({
                    message: 'Gadget not found'
                });
            }
        }).catch(error => {
            console.error(error);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.getproductcompare = async (req, res) => {
    try {
        const gadget1_id = req.body.gadget1_id;
        const gadget2_id = req.body.gadget2_id;
        const gadget1 = await Gadget.findById(gadget1_id);
        const gadget2 = await Gadget.findById(gadget2_id);
        if (!gadget1 || !gadget2) {
            return res.status(400).json({
                message: 'Gadget not found'
            });
        }
        res.status(200).json({
            gadget1,
            gadget2
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: 'Something went wrong'
        });
    }

}