const md5 = require('md5');
const Users = require('../models/Users');
const Email = require('./../config/emails');
const { GenerateToken, DecodedToken } = require('./../config/token');

module.exports = {

    // GET - all users
    async index(req, res) {

        const users = await Users.find().sort('-createdAt');

        return res.status(200).json({ users });
    },

    // POST - register
    async register(req, res) {

        try {
            let { name, email, password } = req.body;
            password = md5(password + process.env.SALT_KEY_PASSWORD);

            const userValid = await Users.find({ email });

            if (userValid.length === 0) {
                const user = await Users.create({
                    name,
                    email,
                    password
                });

                // send email
                Email.send(user);

                return res.status(201).json(user);
            }

            return res.status(400).json(userValid);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async decoded(req, res) {
        const token = req.headers['authorization'] || req.body.token || req.query.token || null;

        if (token) {
            DecodedToken(token, res);
        } else {
            res.status(200).json({ token: false });
        }
    },

    // POST - authentication
    async authentication(req, res) {

        try {

            let { email, password } = req.body;
            password = md5(password + process.env.SALT_KEY_PASSWORD);

            const user = await Users.find({
                $and: [
                    { "email": email },
                    { "password": password },
                    { "active": 1 }
                ]
            });

            if (user.length === 1) {
                const token = await GenerateToken(user[0]);

                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ token: null, email });
            }

        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    // GET - active
    async active(req, res) {
        try {
            const iduser = req.query.user || null;

            if (iduser !== null) {
                let user = await Users.findById(iduser);

                user.active = 1;

                await user.save(user);

                const token = await GenerateToken(user);

                return res.status(200).json({ token, user });
            } else {
                return res.status(400).json({ "sucess": false });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
};