const bcrypt = require('bcrypt');

const password = 'arun@123'; // Replace with the password you want to hash
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Hashed password:', hash);
});