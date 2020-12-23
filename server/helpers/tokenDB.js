import models from '../models';

const { token } = models;

/**
 * class to deal with all needed operations
 * on the token table
 */
class TokenDB {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findTokenByAttr(attr, val) {
    const record = await token.findOne({
      where: { [attr]: val }
    });
    return record;
  }

  /**
   * find token into table in the DB
   * @param {string} jwtToken
   * @returns {string} The users's token.
   */
  static async findToken(jwtToken) {
    await token.findOne({
      where: { value: jwtToken }
    });
  }

  /**
   * find token into table in the DB
   * @param {integer} userId
   * @returns {string} The users's token.
   */
  static async findUser(userId) {
    await token.findOne({
      where: { userId }
    });
  }

  /**
   * insert generatyed token into table in the DB.
   * @param {string} jwtToken The token for user.
   * @param {integer} userId The user id.
   * @returns {string} The users's token.
   */
  static async saveToken(jwtToken, userId) {
    await token.create({
      value: jwtToken,
      userId,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  /**
   * delete token from validtoken table in the DB.
   * @param {string} jwtToken The request sent by a user.
   * @returns {string} The users's token.
   */
  static async deleteValidToken(jwtToken) {
    await token.destroy({ where: { value: jwtToken } });
  }
}

export default TokenDB;
