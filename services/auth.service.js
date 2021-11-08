const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const jwt = require('../utils/jwt');

class AuthService {
    static async register(data) {
        let user = await prisma.user.create({
            data: {
                github_id: String(data.id),
                email: data.email,
                username: data.login
            }
        })
        console.log('create user:', user)
        data.accessToken = await jwt.signAccessToken(user);
        return data;
    }
    static async login(user) {
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
}

module.exports = AuthService;