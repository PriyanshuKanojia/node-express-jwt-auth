const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // check json web token exists & is verified
    if(token){
        jwt.verify(token, authController.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token  = req.cookies.jwt;

    // check if json web token exists & is verified
    if(token){
        jwt.verify(token, authController.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err);
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }; 