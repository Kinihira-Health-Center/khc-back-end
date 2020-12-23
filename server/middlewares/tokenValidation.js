import JWT from '../helpers/JWT';
import tokenDB from '../helpers/tokenDB';
import userDB from '../helpers/userDB';

const tokenValidation = async (req, res, next) => {
  try {
    const verify = JWT.decodedToken(req.header('token'));
    const userExists = await userDB.findUser('email', verify.email);
    const tokenExists = await tokenDB.findTokenByAttr('value', req.header('token'));

    if (userExists) {
      if (tokenExists) {
        req.user = userExists;
        return next();
      }
      return res.status(401).json({ status: 401, error: 'Already logged out. Sign in and try again.' });
    }
    return res.status(401).json({ status: 401, error: 'User not recognised. Please create account and try again.' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

export default tokenValidation;
