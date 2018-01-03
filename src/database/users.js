const { database } = require('../db');
var bcrypt = require('bcrypt');

async function getUser(email) {
  let user = await database.ref(`users/${email}`).once('value');
  return user.val();
}

async function setUserPassword(email, password) {
  await database.ref(`users/${email}/password`).set(password);
}

async function setUserSalt(email, salt) {
  await database.ref(`users/${email}/salt`).set(salt);  
}

async function setUserVerified(email, verified) {
  await database.ref(`users/${email}/verified`).set(verified);
}

module.exports = {
  getUser,
  setUserPassword,
  setUserSalt,
  setUserVerified
};
