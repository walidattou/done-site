const bcrypt = require('bcryptjs');
const { readJsonFile, writeJsonFile, ADMINS_FILE } = require('../config/database');

class Admin {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role || 'admin';
    this.isActive = data.isActive !== false;
    this.lastLogin = data.lastLogin;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Hash password before saving
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Get public profile (without password)
  toJSON() {
    const admin = { ...this };
    delete admin.password;
    return admin;
  }

  // Static methods for database operations
  static async findOne(filter) {
    const admins = await readJsonFile(ADMINS_FILE);
    const adminData = admins.find(admin => {
      return Object.keys(filter).every(key => admin[key] === filter[key]);
    });
    
    if (adminData) {
      return new Admin(adminData);
    }
    return null;
  }

  static async findById(id) {
    const admins = await readJsonFile(ADMINS_FILE);
    const adminData = admins.find(admin => admin.id === id);
    
    if (adminData) {
      return new Admin(adminData);
    }
    return null;
  }

  static async create(adminData) {
    const admins = await readJsonFile(ADMINS_FILE);
    const newAdmin = new Admin({
      id: Date.now().toString(),
      ...adminData
    });
    
    await newAdmin.hashPassword();
    admins.push(newAdmin);
    await writeJsonFile(ADMINS_FILE, admins);
    return newAdmin;
  }

  async save() {
    // Hash password if it's not already hashed
    await this.hashPassword();
    
    const admins = await readJsonFile(ADMINS_FILE);
    const index = admins.findIndex(admin => admin.id === this.id);
    
    this.updatedAt = new Date().toISOString();
    
    if (index !== -1) {
      // Update existing admin
      admins[index] = { ...this };
    } else {
      // Add new admin
      admins.push({ ...this });
    }
    
    await writeJsonFile(ADMINS_FILE, admins);
    return this;
  }

  static async deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      // Delete all admins
      await writeJsonFile(ADMINS_FILE, []);
    } else {
      // Delete admins matching filter
      const admins = await readJsonFile(ADMINS_FILE);
      const filteredAdmins = admins.filter(admin => {
        return !Object.keys(filter).every(key => admin[key] === filter[key]);
      });
      await writeJsonFile(ADMINS_FILE, filteredAdmins);
    }
  }
}

module.exports = Admin;
