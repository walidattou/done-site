// Simple API test file for development
// Run with: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

// Test data
const testOrder = {
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  customerAddress: {
    street: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345',
    country: 'USA'
  },
  items: [
    {
      name: 'Lissage Prestige Styler',
      qty: 1,
      price: 49.99,
      productId: 'perlebrush'
    }
  ],
  totalAmount: 49.99,
  notes: 'Test order from API'
};

// Helper function to make authenticated requests
const makeAuthRequest = async (method, endpoint, data = null) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    },
    ...(data && { data })
  };
  
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`❌ ${method} ${endpoint} failed:`, error.response?.data || error.message);
    return null;
  }
};

// Test functions
const testHealth = async () => {
  console.log('\n🏥 Testing health endpoint...');
  const result = await makeAuthRequest('GET', '/health');
  if (result) {
    console.log('✅ Health check passed:', result.message);
  }
};

const testLogin = async () => {
  console.log('\n🔐 Testing admin login...');
  const result = await makeAuthRequest('POST', '/admin/login', {
    email: 'admin@example.com',
    password: 'admin123'
  });
  
  if (result && result.success) {
    authToken = result.data.token;
    console.log('✅ Login successful');
    console.log('👤 Admin:', result.data.admin.name);
  }
};

const testGetProfile = async () => {
  console.log('\n👤 Testing get admin profile...');
  const result = await makeAuthRequest('GET', '/admin/profile');
  if (result && result.success) {
    console.log('✅ Profile retrieved:', result.data.admin.name);
  }
};

const testGetLatestOrders = async () => {
  console.log('\n📦 Testing get latest orders...');
  const result = await makeAuthRequest('GET', '/orders/latest');
  if (result && result.success) {
    console.log(`✅ Latest orders retrieved: ${result.count} orders`);
  }
};

const testGetAllOrders = async () => {
  console.log('\n📋 Testing get all orders...');
  const result = await makeAuthRequest('GET', '/orders');
  if (result && result.success) {
    console.log(`✅ All orders retrieved: ${result.count} orders (page ${result.page}/${result.pages})`);
  }
};

const testGetOrderStats = async () => {
  console.log('\n📊 Testing get order stats...');
  const result = await makeAuthRequest('GET', '/orders/stats');
  if (result && result.success) {
    console.log('✅ Order stats retrieved:');
    console.log(`   Total Orders: ${result.data.totalOrders}`);
    console.log(`   Pending: ${result.data.pendingOrders}`);
    console.log(`   Confirmed: ${result.data.confirmedOrders}`);
    console.log(`   Shipped: ${result.data.shippedOrders}`);
    console.log(`   Cancelled: ${result.data.cancelledOrders}`);
    console.log(`   New Orders: ${result.data.newOrders}`);
    console.log(`   Total Revenue: $${result.data.totalRevenue}`);
    console.log(`   Today's Orders: ${result.data.todayOrders}`);
  }
};

const testCreateOrder = async () => {
  console.log('\n➕ Testing create order...');
  const result = await makeAuthRequest('POST', '/orders', testOrder);
  if (result && result.success) {
    console.log('✅ Order created successfully');
    console.log(`   Order ID: ${result.data.orderId}`);
    return result.data._id;
  }
  return null;
};

const testUpdateOrderStatus = async (orderId) => {
  if (!orderId) return;
  
  console.log('\n✏️ Testing update order status...');
  const result = await makeAuthRequest('PATCH', `/orders/${orderId}`, {
    status: 'Confirmed',
    notes: 'Order confirmed via API test'
  });
  
  if (result && result.success) {
    console.log('✅ Order status updated successfully');
    console.log(`   New Status: ${result.data.status}`);
  }
};

const testMarkOrderAsSeen = async (orderId) => {
  if (!orderId) return;
  
  console.log('\n👁️ Testing mark order as seen...');
  const result = await makeAuthRequest('PATCH', `/orders/${orderId}/mark-seen`);
  
  if (result && result.success) {
    console.log('✅ Order marked as seen successfully');
    console.log(`   isNew: ${result.data.isNew}`);
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting API tests...\n');
  
  await testHealth();
  await testLogin();
  await testGetProfile();
  await testGetLatestOrders();
  await testGetAllOrders();
  await testGetOrderStats();
  
  const orderId = await testCreateOrder();
  await testUpdateOrderStatus(orderId);
  await testMarkOrderAsSeen(orderId);
  
  console.log('\n🎉 All tests completed!');
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealth,
  testLogin,
  testGetProfile,
  testGetLatestOrders,
  testGetAllOrders,
  testGetOrderStats,
  testCreateOrder,
  testUpdateOrderStatus,
  testMarkOrderAsSeen
};
