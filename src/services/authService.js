const bcrypt = require('bcrypt');
const authRepository = require('../repositories/authRepository');

const validateUser = async (email, password) => {
  try {
    const user = await authRepository.findUserByEmail(email);
    console.log('Found user:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found with email:', email);
      return null;
    }

    // Clean the stored hash by removing any whitespace
    const cleanedHash = user.password.trim();
    
    // Generate a test hash with the same password for comparison
    const testHash = await bcrypt.hash(password, 10);
    console.log('Test hash generated:', testHash);
    console.log('Stored hashed password (cleaned):', cleanedHash);
    console.log('Attempting to compare with provided password:', password);
    
    const isValidPassword = await bcrypt.compare(password, cleanedHash);
    console.log('Password comparison result:', isValidPassword);

    if (isValidPassword) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Password validation error:', error);
    throw error;
  }
};

module.exports = {
  validateUser
};