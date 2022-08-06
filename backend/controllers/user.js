const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(user =>{
            User.findOne({email: req.body.email})
              .then(() => {
                const jwtToken = process.env.jwtToken;
                const userJSON = {
                  userId: user._id,
                  token: jwt.sign(
                    {userId: user._id},
                    jwtToken,
                    {expiresIn: '24h'}
                  ),
                  firstName: user.firstName,
                  lastName: user.lastName 
                };
                res.status(200).json(userJSON);
              })
              .catch(error => res.status(500).json({error}));
          })
          .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(500).json({error}));
};

exports.logIn = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({error: 'Utilisateur non trouvé!'});
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({error: 'Mot de passe incorrect!'});
            } else {
              const jwtToken = process.env.jwtToken;
              const userJSON = {
                userId: user._id,
                token: jwt.sign(
                  {userId: user._id},
                  jwtToken,
                  {expiresIn: '24h'}
                )
              };
              res.status(200).json(userJSON);
            }
          })
        .catch(error => res.status(500).json({error}));
      }
    })
    .catch(error => res.status(500).json({error}));
};