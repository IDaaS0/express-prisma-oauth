const createError = require('http-errors');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const auth = require('../services/auth.service');
const prisma = new PrismaClient();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

class authController {
    // static oauth = async (req, res, next) => {
    //     res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`);
    // }
    static oauthCallback = async (req, res, next) => {
        let token = "";
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            code: req.query.code
        };
        const opts = {headers: {accept: 'application/json'}};
        await axios.post(`https://github.com/login/oauth/access_token`, body, opts).
            then(res => res.data['access_token'])
            .then(_token => {
                token = _token;
            })
            .catch(err => res.status(500).json({ message: err.message }));
        console.log(token)
        let data = null;
        await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res1 => {
            data = res1.data;
        }).catch(err => res.status(500).json({ message: err.message }));
        await axios.get(`https://api.github.com/user/emails`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res1 => {
            data.email = res1.data[0].email;
        }).catch(err => res.status(500).json({ message: err.message }));
        console.log(data);
        console.log(data.id, data.email, data.login)
        const result = await prisma.user.findUnique({
            where: {
                github_id: String(data.id),
            },
        })
        if (result === null) {
            try {
                const accessToken = await auth.register(data);
                res.status(200).json({
                    status: true,
                    message: 'Access token generation succeeded.',
                    accessToken: accessToken
                })
            } catch (e) {
                next(createError(e.statusCode, e.message));
            }
        } else {
            try {
                const accessToken = await auth.login(data);
                res.status(200).json({
                    status: true,
                    message: 'Access token generation succeeded.',
                    accessToken: accessToken
                })
            } catch (e) {
                next(createError(e.statusCode, e.message));
            }
        }
    }
    static me = async (req, res, next) => {
        try {
            const user = await await auth.me(req.user)
            return res.status(200).json({
                status: true,
                user
            })
        } catch (e) {
            return next(createError(e.statusCode, e.message))
        }
    }
    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            return res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        } catch (e) {
            return next(createError(e.statusCode, e.message))
        }
    }
}

module.exports = authController;