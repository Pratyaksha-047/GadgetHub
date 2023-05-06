const User = require('../models/user');
const gadget = require('../models/gadget');

exports.getwishlist = (req,res) => {
    const user_id = req.user._id;
    User.findById(user_id)
        .populate('wishlist.gadget_id')
        .then(user => {
            if (user) {
                const wishlist = user.wishlist;
                res.status(200).json({
                    wishlist
                });
            } else {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.addgadget = (req, res) => {
    const user_id = req.user._id;
    const gadget_id = req.body.gadget_id;

    User.findById(user_id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if gadget_id already exists in user's wishlist
            const alreadyExists = user.wishlist.some(wishlistItem => {
                return wishlistItem.gadget_id.toString() === gadget_id;
            });

            if (alreadyExists) {
                return res.status(400).json({ message: 'Gadget already in wishlist' });
            }

            // Add gadget_id to user's wishlist
            user.wishlist.push({ gadget_id });

            user.save()
                .then(() => {
                    res.status(201).json({ message: 'Gadget added to wishlist' });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        });
}