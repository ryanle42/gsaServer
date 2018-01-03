const { database } = require('../db');

async function login(admin) {
  let members = await database.ref(`admins/${admin}/members`).once('value');
  return members.val();
}
