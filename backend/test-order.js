// Test script to create a test order
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test order data
const testOrder = {
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  customerAddress: {
    street: '123 Test Street',
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
    },
    {
      name: 'Rosemary Hair Elixir',
      qty: 2,
      price: 29.99,
      productId: 'rosemary-elixir'
    }
  ],
  totalAmount: 109.97,
  notes: 'Test order from frontend integration'
};

async function testOrderCreation() {
  try {
    console.log('🔐 Logging in as admin...');
    
    // First, login to get token
    const loginResponse = await axios.post(`${BASE_URL}/admin/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });

    const token = loginResponse.data.data.token;
    console.log('✅ Login successful!');

    // Create test order
    console.log('\n📦 Creating test order...');
    const orderResponse = await axios.post(`${BASE_URL}/orders`, testOrder, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Order created successfully!');
    console.log('📋 Order ID:', orderResponse.data.data.orderId);
    console.log('💰 Total Amount:', orderResponse.data.data.totalAmount);

    // Get latest orders to see the new order
    console.log('\n📋 Fetching latest orders...');
    const latestOrdersResponse = await axios.get(`${BASE_URL}/orders/latest`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Latest orders retrieved!');
    console.log('📊 Total orders:', latestOrdersResponse.data.count);
    
    // Show the first order details
    if (latestOrdersResponse.data.data.length > 0) {
      const firstOrder = latestOrdersResponse.data.data[0];
      console.log('\n📋 First order details:');
      console.log('   Customer:', firstOrder.customerName);
      console.log('   Email:', firstOrder.customerEmail);
      console.log('   Status:', firstOrder.status);
      console.log('   Items:', firstOrder.items.length);
      console.log('   Total:', firstOrder.totalAmount);
    }

    // Get order statistics
    console.log('\n📊 Fetching order statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/orders/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const stats = statsResponse.data.data;
    console.log('✅ Statistics retrieved!');
    console.log('📈 Total Orders:', stats.totalOrders);
    console.log('⏳ Pending Orders:', stats.pendingOrders);
    console.log('✅ Confirmed Orders:', stats.confirmedOrders);
    console.log('🚚 Shipped Orders:', stats.shippedOrders);
    console.log('❌ Cancelled Orders:', stats.cancelledOrders);
    console.log('🆕 New Orders:', stats.newOrders);
    console.log('💰 Total Revenue:', stats.totalRevenue);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run the test
testOrderCreation();
