const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    message: 'User already registered'
                });
            }

            const _user = new User({
                Name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                username: Math.random().toString()
            });

            _user.save()
                .then(data => {
                    return res.status(201).json({
                        message: 'User created successfully'
                    });
                })
                .catch(error => {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                });
        })
        .catch(error => {
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                if (user.authenticate(req.body.password)) {

                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    const { _id, Name, email, role, contactNumber} = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, Name, email, role, contactNumber
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Password incorrect'
                    });
                }
            }
            else {
                return res.status(400).json({
                    message: 'User does not exist'
                });
            }


        })
        .catch(error => {
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

