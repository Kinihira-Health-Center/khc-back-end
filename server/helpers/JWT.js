import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import TokenDB from './tokenDB';

dotenv.config();

/**
 * This class contains.
 * three methods, one to help hashing password (hashPassword).
 * other the second to retrieve hashed password.
 * and the lastone for generating token.
 */
class TokenHelper {
  /**
   * Hashs the password.
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  // static generateResetPasswordToken({
  //   id, email, password, createdAt,
  // }) {
  //   const secrect = `${password}_${createdAt}`;
  //   return jwt.sign({ id, email, password }, secrect, { expiresIn: 3600 });
  // }

  /**
   * Hashs the password.
   * @param {string} jwtToken The user's token.
   * @returns {string} The users's hashed password.
   */
  static decodedToken(jwtToken) {
    const isToken = jwt.verify(jwtToken, process.env.SECRET_KEY);
    return isToken;
  }

  /**
   * Hashs the password for signup and login response.
   * @param {integer} id The user's id.
   * @param {string} email The user's email.
   * @param {string} role The user's role.
   * @returns {string} The users's hashed password.
   */
  static async generateToken(id, email, role) {
    const userTokenExists = await TokenDB.findUser(id);

    if (userTokenExists) {
      return userTokenExists.value;
    }

    const generatedToken = jwt.sign({
      id, email, role
    }, process.env.SECRET_KEY);

    TokenDB.saveToken(generatedToken, id);

    return generatedToken;
  }
}
export default TokenHelper;
