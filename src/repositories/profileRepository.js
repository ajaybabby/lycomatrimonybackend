const db = require('../config/db');

const createProfile = async (profileData) => {
    try {
      const query = `
        INSERT INTO users (profile_for, gender, first_name, last_name, date_of_birth, education, company, salary,email,password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        profileData.profileFor,
        profileData.gender,
        profileData.firstName,
        profileData.lastName,
        profileData.dateOfBirth,
        profileData.education,
        profileData.company,
        profileData.salary,
        profileData.email,
        profileData.password
      ];
      
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const getProfileById = async (id) => {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };
  
  const getAllProfiles = async () => {
    try {
      const query = 'SELECT * FROM users';
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  };
  
  const getMatchingProfiles = async (userId) => {
    try {
      const preferencesQuery = 'SELECT * FROM user_preferences WHERE user_id = ?';
      const [userPreferences] = await db.query(preferencesQuery, [userId]);
      
      const userQuery = 'SELECT gender FROM users WHERE id = ?';
      const [userDetails] = await db.query(userQuery, [userId]);
  
      if (!userPreferences[0] || !userDetails[0]) {
        throw new Error('User or preferences not found');
      }
  
      const pref = userPreferences[0];
      const userGender = userDetails[0].gender;
  
      const matchQuery = `
        SELECT 
          u.*,
          i.id as interest_id,
          i.status as interest_status,
          (u.gender = ?) AS gender_match,
          (TIMESTAMPDIFF(YEAR, u.date_of_birth, CURDATE()) BETWEEN ? AND ?) AS age_match,
          (u.religion = ?) AS religion_match,
          (u.caste = ?) AS caste_match,
          (u.location = ?) AS location_match,
          (u.education = ?) AS education_match,
          (u.marital_status = ?) AS marital_status_match,
          (u.id IN (
            SELECT up.user_id FROM user_preferences up WHERE up.pref_gender = ?
          )) AS reciprocal_match,
          (
            (u.gender = ?) +
            (TIMESTAMPDIFF(YEAR, u.date_of_birth, CURDATE()) BETWEEN ? AND ?) +
            (u.religion = ?) +
            (u.caste = ?) +
            (u.location = ?) +
            (u.education = ?) +
            (u.marital_status = ?) +
            (u.id IN (
              SELECT up.user_id FROM user_preferences up WHERE up.pref_gender = ?
            ))
          ) AS match_score
        FROM users u
        LEFT JOIN interests i ON (i.sender_id = ? AND i.receiver_id = u.id)
        WHERE u.id != ?
        ORDER BY match_score DESC
        LIMIT 20`;
  
      const [matches] = await db.query(matchQuery, [
        pref.pref_gender,
        pref.pref_min_age,
        pref.pref_max_age,
        pref.pref_religion,
        pref.pref_caste,
        pref.pref_location,
        pref.pref_education,
        pref.pref_marital_status,
        userGender,
        // Repeat parameters for match_score calculation
        pref.pref_gender,
        pref.pref_min_age,
        pref.pref_max_age,
        pref.pref_religion,
        pref.pref_caste,
        pref.pref_location,
        pref.pref_education,
        pref.pref_marital_status,
        userGender,
        // For interests and WHERE clause
        userId,
        userId
      ]);
  
      return matches;
    } catch (error) {
      console.error('Matching profiles error:', error);
      throw error;
    }
  };
  
  const saveUserPreferences = async (userId, preferencesData) => {
    try {
      const query = `
        INSERT INTO user_preferences (
          user_id, 
          pref_min_age, 
          pref_max_age, 
          pref_gender, 
          pref_religion, 
          pref_caste, 
          pref_location, 
          pref_education,
          pref_marital_status,
          pref_income
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          pref_min_age = VALUES(pref_min_age),
          pref_max_age = VALUES(pref_max_age),
          pref_gender = VALUES(pref_gender),
          pref_religion = VALUES(pref_religion),
          pref_caste = VALUES(pref_caste),
          pref_location = VALUES(pref_location),
          pref_education = VALUES(pref_education),
          pref_marital_status = VALUES(pref_marital_status),
          pref_income = VALUES(pref_income)
      `;
  
      const values = [
        userId,
        preferencesData.min_age,
        preferencesData.max_age,
        preferencesData.gender,
        preferencesData.religion,
        preferencesData.caste,
        preferencesData.location,
        preferencesData.education,
        preferencesData.marital_status,
        preferencesData.income
      ];
  
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const getUserDetails = async (userId) => {
    try {
      const query = 'SELECT id, email, first_name, last_name, date_of_birth, education, company, salary FROM users WHERE id = ?';
      const [rows] = await db.query(query, [userId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    createProfile,
    getProfileById,
    getAllProfiles,
    getMatchingProfiles,
    saveUserPreferences,
    getUserDetails
  };