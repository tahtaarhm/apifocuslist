const UsersModel = require('../models/Users');
const { hashPassword, verifyPassword } = require ('../utils/hashutils')

const createUser = async (req, res) => {
  const { body } = req;
  console.log(body);
  

  if (!body.username || !body.email || !body.password || !body.no_handphone) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    const hashedPassword = await hashPassword(body.password);

    body.password = hashedPassword;

    await UsersModel.createUser(body);

    res.status(200).json({
      status: 200,
      message: 'Registrasi berhasil!',
      data: {
        username: body.username,
        email: body.email,
        nohp: body.no_handphone,
        
      },
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const duplicateField = error.sqlMessage.includes('username') ? 'Username' : 'Email';
      return res.status(400).json({
        status: 400,
        message: `${duplicateField} telah dipakai.`,
      });
    }

    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }

};

const getUserByUsernamePassword = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({
          status: 400,
          message: 'Nama Pengguna dan Kata Sandi diperlukan!',
          data: null,
        });
      }
  
      const [user] = await UsersModel.getUserByUsername(username);
  
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'Pengguna tidak terdaftar.',
          data: null,
        });
      }
  
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          message: 'Kata Sandi salah!',
          data: null,
        });
      }
  
      delete user.password;
  
      res.status(200).json({
        status: 200,
        message: 'Berhasil masuk!',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Server error',
        serverMessage: error.message,
      });
    }
  };

module.exports = {
    createUser,getUserByUsernamePassword
}