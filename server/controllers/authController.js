import JWT from '../helpers/JWT';
import userDB from '../helpers/userDB';
// import { sendmail } from '../helpers/email';
import passwordHashHelper from '../helpers/passwordHashHelper';
import TokenDB from '../helpers/tokenDB';
import pagination from '../helpers/paginateHelper';

/**
 * This class contains all methods
 * required to handle
 * signup and login and logout endpoints' request.
 */
class AuthController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async AdminAddUser(req, res) {
    const emailExists = await userDB.findUser('email', req.body.email);

    if (emailExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists, use another email'
      });
    }
    const savedUser = await userDB.saveUser(req.body);
    const {
      // eslint-disable-next-line camelcase
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    } = savedUser;
    const user = {
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    };

    // const userToken = await JWT.generateToken(user.id, user.email, user.role);

    return res.status(201).json({
      status: 201,
      message: 'User was created successfully',
      data: {
        // token: userToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImg: user.profileImg,
          role: user.role
        }
      },
    });
  }

  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async changeUser(req, res) {
    const userExists = await userDB.findUser("id", parseInt(req.params.id, 10));
    if (userExists) {
      await userDB.updateUser(req.body, userExists.id);
      const user = await userDB.findUser("id", userExists.id);

      return res.status(200).json({
        status: 200,
        message: `${user.name} was successfully changed`,
        data: user
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'This user is not found'
    });
  }

  /**
   * This method handle the view user request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The next middleware.
   * @returns {object} The status and some data of the user.
   */
  static async viewUsers(req, res, next) {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const users = await userDB.findAllUsers(skip, start);
    const AllData = users.rows;
    const countAllData = users.count;
    if (users.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `There are no users yet`
      });
    }
    req.data = { AllData, countAllData, start, end, pages, skip, paginate };
    next();
  }

  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signUp(req, res) {
    const emailExists = await userDB.findUser('email', req.body.email);

    if (emailExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists, use another email'
      });
    }
    const savedUser = await userDB.saveUser(req.body);
    const {
      // eslint-disable-next-line camelcase
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    } = savedUser;
    const user = {
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    };

    const userToken = await JWT.generateToken(user.id, user.email, user.role);

    return res.status(201).json({
      status: 201,
      message: 'User was created successfully',
      data: {
        token: userToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImg: user.profileImg,
          role: user.role
        }
      },
    });
  }

  /**
   * This method handle the sign request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signIn(req, res) {
    const emailExists = await userDB.findUser('email', req.body.email);
    if (emailExists) {
      const tokenExists = await TokenDB.findTokenByAttr('userId', emailExists.id);
      if (tokenExists) {
        return res.status(200).json({
          status: 200,
          message: 'You are already logged in',
          data: {
            token: tokenExists.value,
            user: {
              id: emailExists.id,
              name: emailExists.name,
              email: emailExists.email,
              profileImg: emailExists.profileImg,
              role: emailExists.role
            }
          }
        });
      }
      const passwordExist = await passwordHashHelper
        .checkPassword(req.body.password, emailExists.password);
      if (passwordExist) {
        return res.status(200).json({
          status: 200,
          message: 'user successfully logged In',
          data: {
            token: await JWT.generateToken(
              emailExists.id,
              emailExists.email,
              emailExists.role
            ),
            userData: {
              id: emailExists.id,
              name: emailExists.name,
              email: emailExists.email,
              profileImg: emailExists.profileImg,
              role: emailExists.role
            }
          }
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'password or email is incorrect'
    });
  }

  /**
   * This method handle the logout endpoint.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and message.
   * */
  static async logout(req, res) {
    await userDB.deleteValidToken(req.header('token'));
    return res.status(200).json({
      status: 200,
      message: `You successfully signed out.`
    });
  }

  /**
   * This method handle the sign request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async socialSignIn(req, res) {
    const emailExists = await userDB.findUser('email', req.body.email);
    if (emailExists) {
      return res.status(200).json({
        status: 200,
        message: 'user successfully logged In',
        data: {
          token: await JWT.generateToken(
            emailExists.id,
            emailExists.email,
            emailExists.role
          ),
          userData: {
            id: emailExists.id,
            name: emailExists.name,
            email: emailExists.email,
            role: emailExists.role
          }
        }
      });
    }

    const savedUser = await userDB.saveUser(req.body);
    const {
      // eslint-disable-next-line camelcase
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    } = savedUser;
    const user = {
      id, name, email, profileImg, googleId, facebookID, password, role, created_at, updated_at
    };
    // await sendmail(savedUser.email, savedUser.name);
    return res.status(201).json({
      status: 201,
      message: 'User was created successfully',
      token: JWT.generateToken(user.id, user.email, user.role),
      user
    });
  }

  /**
   * This method handle the logout endpoint.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and message.
   * */
  static async getUser(req, res) {
    const emailExists = await userDB.findUser('email', req.user.email);
    if (emailExists) {
      return res.status(200).json({
        status: 200,
        message: 'user successfully logged In',
        data: {
          userData: {
            id: emailExists.id,
            name: emailExists.name,
            email: emailExists.email,
            role: emailExists.role
          }
        }
      });
    }
  }

  /**
   * This method handle the view user request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The next middleware.
   * @returns {object} The status and some data of the user.
   */
  static async viewReporters(req, res, next) {
    const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
    const users = await userDB.findAllReporters(skip, start);
    const AllData = users.rows;
    const countAllData = users.count;
    if (users.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `There are no users yet`
      });
    }
    req.data = { AllData, countAllData, start, end, pages, skip, paginate };
    next();
  }

  /**
   * This method handle the view team request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async removeUser(req, res) {
    const { id } = req.params;
    const user = await userDB.findUser('id', parseInt(id, 10));
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: "The user was not found"
      });
    }
    await userDB.deleteUser(user.id);
    return res.status(204).json({
      status: 200,
      message: "The user deleted successfully",
    });
  }
}

export default AuthController;
