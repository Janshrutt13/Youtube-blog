const JWT = require("jsonwebtoken");
require('dotenv').config();

function createTokenforUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role
    }
    const token = JWT.sign(payload , process.env.JWT_SECRET_KEY);
    return token;
};

function validateToken(token){
    const payload = JWT.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
};

module.exports = {createTokenforUser , validateToken};