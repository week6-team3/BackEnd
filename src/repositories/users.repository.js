const { Users } = require('../../models');
const { Op } = require('sequelize');

class usersRepository {
  // constructor() {
  //     this.Users = Users;
  // }

  createUser = async (nickname, email, password) => {
    try {
      // 동일 닉네임, 이메일 검증
      const findCreateFindResult = await Users.findOne({
        where: { [Op.or]: [{ nickname }, { email }] },
        raw: true,
      });

      // 조회 결과가 null이면 유저 생성
      if (!findCreateFindResult) {
        const createUserResult = await Users.create({
          nickname: nickname,
          email: email,
          password: password,
        });
        return createUserResult;
      } else {
        throw new Error('이미 가입한 고객입니다.');
      }
    } catch (error) {
      return { errorMessage: error.message };
    }
  };

  findOneUser = async (email) => {
    const findOneUserResult = await Users.findOne({
      where: { email: email },
      raw: true,
    });
    return findOneUserResult;
  };

  insertUserRefreshToken = async (userId, hashRefreshToken) => {
    const insertRefreshTokenResult = await Users.update({ refreshToken: hashRefreshToken }, { where: { userId: userId } });

    return insertRefreshTokenResult;
  };
}

module.exports = usersRepository;
