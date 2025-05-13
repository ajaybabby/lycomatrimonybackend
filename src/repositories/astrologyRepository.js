const db = require('../config/db');

const saveAstrologyPreferences = async (userId, data) => {
  try {
    const query = `
      INSERT INTO astrology_preferences (
        user_id, zodiac_sign, nakshatra, rashi, manglik_status
      ) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        zodiac_sign = VALUES(zodiac_sign),
        nakshatra = VALUES(nakshatra),
        rashi = VALUES(rashi),
        manglik_status = VALUES(manglik_status)
    `;

    const values = [userId, data.zodiacSign, data.nakshatra, data.rashi, data.manglikStatus];
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAstrologyPreferences = async (userId) => {
  try {
    const query = 'SELECT * FROM astrology_preferences WHERE user_id = ?';
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const searchByPreferences = async (userId, preferences) => {
  try {
    const query = `
      SELECT 
        u.*,
        ap.*,
        (
          (ap.zodiac_sign = ?) +
          (ap.nakshatra = ?) +
          (ap.rashi = ?) +
          (ap.manglik_status = ?)
        ) as astro_match_score
      FROM astrology_preferences ap
      JOIN users u ON u.id = ap.user_id
      WHERE ap.user_id != ?
      HAVING astro_match_score > 0
      ORDER BY astro_match_score DESC
    `;

    const values = [
      preferences.zodiacSign.toLowerCase(),
      preferences.nakshatra.toLowerCase(),
      preferences.rashi.toLowerCase(),
      preferences.manglik,
      userId
    ];

    const [matches] = await db.query(query, values);
    return matches;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveAstrologyPreferences,
  getAstrologyPreferences,
  searchByPreferences
};