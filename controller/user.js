const User = require('../models/user');
const jwt = require('jsonwebtoken');
const GadReview = require('../models/gadget_review');

exports.profile = (req, res) => {
    const user_id = req.user._id;
    User.findById(user_id)
        .then(user => {
            if (user) {
                const { Name, email, contactNumber } = user;
                res.status(200).json({
                    user: {
                        Name, email, contactNumber
                    }
                });
            }
            else {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
        }).catch(error => {
            console.error(error);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.updatecontact = (req, res) => {
    const user_id = req.user._id;
    User.findByIdAndUpdate(user_id, { contactNumber: req.body.contactNumber })
        .then(updatedUser => {
            return res.status(200).json({
                message: 'Contact number updated successfully',
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(400).json({
                message: 'Something went wrong',
            });
        });
}

exports.updatepassword = (req, res) => {
    const user_id = req.user._id;
    if (req.body.new_password == req.body.confirm_password) {
        User.findByIdAndUpdate(user_id, { password: req.body.new_password })
            .then(updatedUser => {
                return res.status(200).json({
                    message: 'Password updated successfully',
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(400).json({
                    message: 'Something went wrong',
                });
            });
    }
    else {
        return res.status(400).json({
            message: 'Password does not match',
        });
    };
}

exports.addgadgetreview = (req, res) => {
    const { gadget_id, rating, review } = req.body;
    const user_id = req.user._id;

    const gadReview = new GadReview({
        gadget_id: gadget_id,
        user_id: user_id,
        rating: rating,
        review: review
    });

    gadReview.save()
        .then(() => {
            return res.status(200).json({
                message: 'Gadget review added successfully'
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.addcomparereview = async (req, res) => {
    const gadVsGadId = req.body.compare_id;
    const { rating, review } = req.body;
    const user_id = req.user._id;
    try {
        let gadVsGad = await GadVsGad.findById(gadVsGadId);
        if (!gadVsGad) {
            return res.status(404).json({ message: 'Gad vs gad not found' });
        }
        let newReview = { user_id, rating, review };
        gadVsGad.reviews.push(newReview);
        await gadVsGad.save();
        gadVsGad = await GadVsGad.findById(gadVsGadId).populate('reviews.user_id', 'email');
        res.status(200).json({ gadVsGad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
