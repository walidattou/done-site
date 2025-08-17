const { readJsonFile, writeJsonFile, ORDERS_FILE } = require('../config/database');

class Order {
  constructor(data) {
    this.id = data.id;
    this.orderId = data.orderId || this.generateOrderId();
    this.customerName = data.customerName;
    this.customerEmail = data.customerEmail;
    this.customerAddress = data.customerAddress || {};
    this.items = data.items || [];
    this.totalAmount = data.totalAmount;
    this.orderDate = data.orderDate || new Date().toISOString();
    this.status = data.status || 'Pending';
    this.isNew = data.isNew !== false;
    this.notes = data.notes;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Generate orderId
  generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  // Static methods for database operations
  static async find(filter = {}) {
    const orders = await readJsonFile(ORDERS_FILE);
    
    if (Object.keys(filter).length === 0) {
      return orders;
    }

    return orders.filter(order => {
      return Object.keys(filter).every(key => {
        if (key === 'orderDate' && filter[key]) {
          // Handle date range filtering
          const orderDate = new Date(order.orderDate);
          if (filter[key].$gte && orderDate < new Date(filter[key].$gte)) return false;
          if (filter[key].$lte && orderDate > new Date(filter[key].$lte)) return false;
          return true;
        }
        if (key === 'customerEmail' && filter[key].$regex) {
          // Handle regex filtering
          const regex = new RegExp(filter[key].$regex, filter[key].$options || 'i');
          return regex.test(order.customerEmail);
        }
        return order[key] === filter[key];
      });
    });
  }

  static async findById(id) {
    const orders = await readJsonFile(ORDERS_FILE);
    return orders.find(order => order.id === id);
  }

  static async create(orderData) {
    const orders = await readJsonFile(ORDERS_FILE);
    const newOrder = new Order({
      id: Date.now().toString(),
      ...orderData
    });
    
    orders.push(newOrder);
    await writeJsonFile(ORDERS_FILE, orders);
    return newOrder;
  }

  async save() {
    const orders = await readJsonFile(ORDERS_FILE);
    const index = orders.findIndex(order => order.id === this.id);
    
    this.updatedAt = new Date().toISOString();
    
    if (index !== -1) {
      // Update existing order
      orders[index] = { ...this };
    } else {
      // Add new order
      orders.push({ ...this });
    }
    
    await writeJsonFile(ORDERS_FILE, orders);
    return this;
  }

  static async countDocuments(filter = {}) {
    const orders = await this.find(filter);
    return orders.length;
  }

  static async aggregate(pipeline) {
    const orders = await readJsonFile(ORDERS_FILE);
    
    // Simple aggregation support for basic operations
    if (pipeline.length === 2 && 
        pipeline[0].$match && 
        pipeline[1].$group && 
        pipeline[1].$group._id === null &&
        pipeline[1].$group.total && 
        pipeline[1].$group.total.$sum) {
      
      const filteredOrders = orders.filter(order => {
        const match = pipeline[0].$match;
        return Object.keys(match).every(key => {
          if (key === 'status' && match[key].$ne) {
            return order[key] !== match[key].$ne;
          }
          return order[key] === match[key];
        });
      });
      
      const total = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      return [{ total }];
    }
    
    return [];
  }

  static async deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      // Delete all orders
      await writeJsonFile(ORDERS_FILE, []);
    } else {
      // Delete orders matching filter
      const orders = await readJsonFile(ORDERS_FILE);
      const filteredOrders = orders.filter(order => {
        return !Object.keys(filter).every(key => order[key] === filter[key]);
      });
      await writeJsonFile(ORDERS_FILE, filteredOrders);
    }
  }

  static async insertMany(ordersData) {
    const orders = await readJsonFile(ORDERS_FILE);
    const newOrders = ordersData.map((data, index) => new Order({
      id: (Date.now() + index).toString(),
      ...data
    }));
    
    orders.push(...newOrders);
    await writeJsonFile(ORDERS_FILE, orders);
    return newOrders;
  }
}

module.exports = Order;
