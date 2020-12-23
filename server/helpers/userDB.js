import models from '../models';

const {
  token,
  user
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class UserDB {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findUser(attr, val) {
    const userExists = await user.findOne({
      where: { [attr]: val },
      include:
      [
        {
          model: token,
          as: 'token',
          attributes: ['id', 'value']
        },
      ]
    });
    return userExists;
  }

  /**
   * Saves the user in the DB.
   * @param {object} entry The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(entry) {
    const acceptedUser = await user.create(
      {
        ...entry, created_at: new Date(), updated_at: new Date()
      },
      {
        fields: [
          'id', 'name', 'email', 'profileImg', 'googleId', 'facebookID', 'password', 'role', 'create_at', 'updated_at'
        ]
      }
    );
    return acceptedUser;
  }

  /**
   * update user into table in the DB
   * @param {object} data
   * @param {integer} id
   * @returns {string} The users's interaction.
   */
  static async updateUser(data, id) {
    const record = await user.update({
      ...data
    },
    {
      where: { id }
    });
    return record;
  }

  /**
   * delete token from validtoken table in the DB.
   * @param {string} validtoken The request sent by a user.
   * @returns {string} The users's token.
   */
  static async deleteValidToken(validtoken) {
    await token.destroy({ where: { value: validtoken } });
  }

  /**
   * insert generatyed code into table in the DB.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} groups request data.
   */
  static async findAllUsers(skip, start) {
    const records = await user.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['id', 'DESC']],
    });
    return records;
  }

  /**
   * insert generatyed code into table in the DB.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} groups request data.
   */
  static async findAllReporters(skip, start) {
    const records = await user.findAndCountAll({
      limit: skip,
      offset: start,
      where: { role: 'REPORTER' },
      order: [['id', 'DESC']],
    });
    return records;
  }

  /**
   * delete tag from validtag table in the DB.
   * @param {integer} id The request sent by a user.
   * @returns {string} The users's tag.
   */
  static async deleteUser(id) {
    await user.destroy({ where: { id } });
  }
}

export default UserDB;
