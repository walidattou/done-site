const fs = require('fs').promises;
const path = require('path');

// File paths for JSON storage
const ORDERS_FILE = path.join(__dirname, '../data/orders.json');
const ADMINS_FILE = path.join(__dirname, '../data/admins.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(ORDERS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Initialize JSON files if they don't exist
const initializeFiles = async () => {
  await ensureDataDir();
  
  // Initialize orders file
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
  }
  
  // Initialize admins file
  try {
    await fs.access(ADMINS_FILE);
  } catch {
    const defaultAdmin = {
      id: '1',
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8e', // admin123
      role: 'admin',
      isActive: true,
      lastLogin: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await fs.writeFile(ADMINS_FILE, JSON.stringify([defaultAdmin], null, 2));
  }
};

// Read data from JSON file
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Write data to JSON file
const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

// Database connection (simulated for compatibility)
const connectDB = async () => {
  try {
    await initializeFiles();
    console.log('✅ JSON file storage initialized successfully');
    console.log(`📁 Orders file: ${ORDERS_FILE}`);
    console.log(`📁 Admins file: ${ADMINS_FILE}`);
  } catch (error) {
    console.error('❌ Error initializing JSON storage:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  readJsonFile,
  writeJsonFile,
  ORDERS_FILE,
  ADMINS_FILE
};
