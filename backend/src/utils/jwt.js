import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path';

const privateKey = fs.readFileSync(path.join("src/keys", "private.key"), 'utf8');
const publicKey = fs.readFileSync(path.join("src/keys", "public.key"), 'utf8');

export const signAccessToken = (payload) => jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
     expiresIn: '15m'
});

export const signRefreshToken = (payload) => jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7d'
});

export const verifyJwtToken = (token) => jwt.verify(token, publicKey, {
    algorithms: 'RS256'
});