const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    message: 'Admin already registered'
                });
            }

            const _user = new User({
                Name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                username: Math.random().toString(),
                role : "admin"
            });

            _user.save()
                .then(data => {
                    return res.status(201).json({
                        message: 'Admin created successfully'
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
                if (user.authenticate(req.body.password) && user.role === "admin") {

                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    const { _id, Name, email, role, contactNumber } = user;
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
                    message: 'Admin does not exist'
                });
            }


        })
        .catch(error => {
            return res.status(400).json({
                message: 'Something went wrong'
            });
        });
}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: no token provided' });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(token);
    next();
}