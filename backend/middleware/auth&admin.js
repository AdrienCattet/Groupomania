const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const jwtToken = process.env.jwtToken;
 
module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtToken);
        const userId = decodedToken.userId;
        const auth = {userId: userId};
        User.findOne({_id: userId})
            .then(user => {
                if (user.admin == true) {
                    return auth.admin = true
                }
            })
            .catch(error => res.status(501).json({error}));
        req.auth = auth;
	next();
   } catch(error) {
       res.status(401).json({error});
   }
};