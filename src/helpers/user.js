const { 
  getUser, 
  setUserPassword, 
  setUserSalt,
  setUserVerified
} = require('../database/users');
var bcrypt = require('bcrypt');

const encodeEmail = (email) => email.replace(/\./g, ',');
const decodeEmail = (email) => email.replace(/,/g, '.');

async function loginUser(req, res) {
  res.set('Content-Type', 'application/json');
  let email = encodeEmail(req.body.email);
  let plainTextPassword = req.body.password;
  let user = await getUser(email);
  if (user) {
    let hash = await bcrypt.hashSync(plainTextPassword, user.salt);
    if (hash == user.password) {
      res.send(
        JSON.stringify({
          success: true,
        })
      );
    } else {
      res.send(
        JSON.stringify({
          success: false,
          errorMsg: 'Invalid email or password'
        })
      );
    }
  } else {
    res.send(
      JSON.stringify({
        success: false,
        errorMsg: 'Invalid email or password'
      })
    );
  }
}

async function createUser(req, res) {
  res.set('Content-Type', 'application/json');
  let email = encodeEmail(req.body.email);
  let plainTextPassword = req.body.password;
  let user = await getUser(email);
  if (user) {
    res.send(
      JSON.stringify({
        success: false,
        errorMsg: 'That email is already registered'
      })
    );
  } else {
    var saltRounds = 10;
    var salt = await bcrypt.genSaltSync(saltRounds);
    var hash = await bcrypt.hashSync(plainTextPassword, salt);
    
    await setUserPassword(email, hash);
    await setUserSalt(email, salt);
    await setUserVerified(email, false);
    res.send(
      JSON.stringify({
        success: true
      })
    );
  }
}

module.exports = {
  loginUser,
  createUser
};