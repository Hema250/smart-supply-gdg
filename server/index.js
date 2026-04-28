import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Promisify db runs
const dbRun = (query, params = []) => new Promise((resolve, reject) => {
  db.run(query, params, function(err) {
    if (err) reject(err);
    else resolve(this);
  });
});

const dbAll = (query, params = []) => new Promise((resolve, reject) => {
  db.all(query, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

const dbGet = (query, params = []) => new Promise((resolve, reject) => {
  db.get(query, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

// Initialize Database
db.serialize(async () => {
  await dbRun(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sku TEXT,
      category TEXT,
      stock INTEGER,
      threshold INTEGER,
      price TEXT,
      supplier TEXT,
      status TEXT,
      expiry TEXT,
      image TEXT,
      description TEXT,
      rating REAL
    );
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      contact TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      rating REAL,
      totalOrders INTEGER,
      onTimeDelivery INTEGER,
      status TEXT,
      products TEXT
    );
  `);

  // Seed initial data if empty
  const { count: productCount } = await dbGet('SELECT count(*) as count FROM products');
  if (productCount === 0) {
    const initialProducts = [
      ["Premium Wireless Headphones", "SKU-001", "Electronics", 145, 50, "$299.99", "TechCorp Inc.", "In Stock", "2027-12-31", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", "Professional noise-canceling headphones with 40-hour battery life and spatial audio support.", 4.8],
      ["Smart Watch Pro", "SKU-002", "Electronics", 12, 30, "$399.99", "SmartTech Ltd.", "Low Stock", "2028-06-15", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", "Advanced fitness tracker with heart rate monitoring, GPS, and cellular connectivity.", 4.5],
      ["Designer Sneakers", "SKU-003", "Footwear", 89, 40, "$149.99", "Fashion Group", "In Stock", "N/A", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", "Limited edition streetwear sneakers featuring breathable mesh and responsive cushioning.", 4.7],
      ["Ergonomic Office Chair", "SKU-004", "Furniture", 34, 20, "$449.99", "Office Solutions", "In Stock", "N/A", "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400&h=400&fit=crop", "Adjustable lumbar support chair designed for maximum comfort during long work hours.", 4.9]
    ];

    for (const p of initialProducts) {
      await dbRun(`
        INSERT INTO products (name, sku, category, stock, threshold, price, supplier, status, expiry, image, description, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, p);
    }
  }

  const { count: supplierCount } = await dbGet('SELECT count(*) as count FROM suppliers');
  if (supplierCount === 0) {
    const initialSuppliers = [
      ["TechCorp Inc.", "Michael Chen", "+1 (555) 123-4567", "contact@techcorp.com", "123 Tech Street, San Francisco, CA", 4.8, 156, 96, "Active", JSON.stringify(["Electronics", "Sensors"])],
      ["SmartTech Ltd.", "Sarah Johnson", "+1 (555) 234-5678", "info@smarttech.com", "456 Innovation Ave, Austin, TX", 4.9, 203, 98, "Active", JSON.stringify(["Microchips", "Displays"])]
    ];

    for (const s of initialSuppliers) {
      await dbRun(`
        INSERT INTO suppliers (name, contact, phone, email, address, rating, totalOrders, onTimeDelivery, status, products)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, s);
    }
  }
});

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await dbAll('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, sku, category, stock, threshold, price, supplier, status, expiry, image, description, rating } = req.body;
  try {
    const result = await dbRun(`
      INSERT INTO products (name, sku, category, stock, threshold, price, supplier, status, expiry, image, description, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, sku, category, stock, threshold, price, supplier, status, expiry, image, description || '', rating || 0]);
    res.json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await dbRun('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/suppliers', async (req, res) => {
  try {
    const suppliers = await dbAll('SELECT * FROM suppliers');
    const parsedSuppliers = suppliers.map(s => ({
      ...s,
      products: s.products ? JSON.parse(s.products) : []
    }));
    res.json(parsedSuppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/suppliers', async (req, res) => {
  const { name, contact, phone, email, address, rating, totalOrders, onTimeDelivery, status } = req.body;
  try {
    const result = await dbRun(`
      INSERT INTO suppliers (name, contact, phone, email, address, rating, totalOrders, onTimeDelivery, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, contact, phone, email, address, rating || 4.5, totalOrders || 0, onTimeDelivery || 100, status || 'Active']);
    res.json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
