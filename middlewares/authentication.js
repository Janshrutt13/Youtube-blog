const { validateToken } = require('../services/auth');

function checkforAuthenticationCookie(cookiename){
    return(res,req,next) => {
        const tokenCookieValue = req.cookies[cookiename];
        if(!tokenCookieValue)
            return next();

        try{
           const userPayload = validateToken(tokenCookieValue);
           req.user = userPayload;
        }catch(err){}

       return next();
    }
};

module.exports = {checkforAuthenticationCookie};