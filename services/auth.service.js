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
        const accessToekn = jwt.signAccessToken(user);
        return accessToekn;
    }
    static async login(user) {
        const accessToken = await jwt.signAccessToken(user)
        return accessToken;
    }
    static async me(user) {
        const resultUser = await prisma.user.findFirst({
            where: {
                github_id: user.github_id,
                email: user.email,
                username: user.username
            }
        })
        return resultUser;
    }
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
}

module.exports = AuthService;