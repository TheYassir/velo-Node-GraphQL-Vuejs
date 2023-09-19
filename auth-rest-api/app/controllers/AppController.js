const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AppController = {
    index(req, res) {
        res.status(200).json({ message: 'ok' });
    },
    async login(req, res) {
        
        if(!req.body.email || !req.body.password) {
            res.status(401).json({ message: 'Aucun identifiants soumis' });
            return;   
        }
        
        const { email, password } = req.body;
        
        const userObj = await User.findOne({ email });

        if (!userObj) {
            res.status(401).json({ message: 'Identifiants incorrects' });
            return;
        }

        const user = userObj.toObject();
        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            res.status(401).json({ message: 'Identifiants incorrects' });
            return;
        }

        delete user.password;

        const payload = {
            user: {
                user: user,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, user });
            }
        );
    },
};

module.exports = AppController;
