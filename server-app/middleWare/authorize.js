const { expressjwt: jwt } = require('express-jwt');
const { verify } = require("jsonwebtoken");

const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')

  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {

    roles = [roles];

  }
  return [
    //authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] }),
    // authorize based on user role
    async (req, res, next) => {
      // get token from header
      const accessToken = req.header('authorization').split(' ')[1];
      if (!accessToken) res.json({ error: "User is not logged in" });
      else
        try {
          const validtoken = verify(accessToken, process.env.JWT_SECRET_KEY);
          req.user = validtoken;
          if (roles.length && !roles.includes(req.user.role)) {
            console.log(req.user.role);
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized' });

          }
          // authentication and authorization successful
          next();
        } catch (err) {
          res.json({ error: err });
        }
    }
  ];

}

module.exports = { authorize };

