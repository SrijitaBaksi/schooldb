import pool from './db.js'; // your pool config file

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected to Render DB at:', result.rows[0].now);
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
  } finally {
    pool.end();
  }
})();
