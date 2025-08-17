import { useState } from 'react';

// Admin pages should not show navbar and footer

// API base URL - works for both development and production
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

const TestOrder = () => {
  const [orderData, setOrderData] = useState({
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
    notes: 'Test order from frontend'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const createOrder = async () => {
    setLoading(true);
    setResult('');

    try {
      // First login as admin to get token
      const loginResponse = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123'
        }),
      });

      const loginData = await loginResponse.json();
      
      if (!loginData.success) {
        setResult('Login failed: ' + loginData.message);
        return;
      }

      const token = loginData.data.token;

      // Create order
      const orderResponse = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        setResult(`✅ Order created successfully!
Order ID: ${orderResult.data.orderId}
Customer: ${orderResult.data.customerName}
Total: $${orderResult.data.totalAmount}
Status: ${orderResult.data.status}`);
      } else {
        setResult('❌ Order creation failed: ' + orderResult.message);
      }
    } catch (error) {
      setResult('❌ Network error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Order Creation</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={orderData.customerName}
                  onChange={(e) => setOrderData({...orderData, customerName: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                <input
                  type="email"
                  value={orderData.customerEmail}
                  onChange={(e) => setOrderData({...orderData, customerEmail: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            {orderData.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded p-3 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...orderData.items];
                      newItems[index].name = e.target.value;
                      setOrderData({...orderData, items: newItems});
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Product name"
                  />
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => {
                      const newItems = [...orderData.items];
                      newItems[index].qty = parseInt(e.target.value);
                      setOrderData({...orderData, items: newItems});
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Quantity"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...orderData.items];
                      newItems[index].price = parseFloat(e.target.value);
                      setOrderData({...orderData, items: newItems});
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={item.productId}
                    onChange={(e) => {
                      const newItems = [...orderData.items];
                      newItems[index].productId = e.target.value;
                      setOrderData({...orderData, items: newItems});
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Product ID"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              step="0.01"
              value={orderData.totalAmount}
              onChange={(e) => setOrderData({...orderData, totalAmount: parseFloat(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={orderData.notes}
              onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <button
            onClick={createOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating Order...' : 'Create Test Order'}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}

          <div className="mt-6 text-center">
            <a 
              href="/admin-login" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Admin Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOrder;
