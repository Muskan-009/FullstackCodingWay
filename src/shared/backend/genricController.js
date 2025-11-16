import { query } from './database.js';

export const createGenericController = (tableName) => ({
  getAll: async (req, res) => {
    try {
      const result = await query(`SELECT * FROM ${tableName} ORDER BY id DESC`);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const columns = Object.keys(req.body).join(', ');
      const values = Object.values(req.body);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
      
      const result = await query(
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = Object.keys(req.body);
      const setClause = updates.map((key, index) => `${key} = $${index + 1}`).join(', ');
      const values = [...Object.values(req.body), id];
      
      const result = await query(
        `UPDATE ${tableName} SET ${setClause} WHERE id = $${updates.length + 1} RETURNING *`,
        values
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, [req.params.id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});