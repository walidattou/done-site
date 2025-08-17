const Admin = require('../models/Admin');
const Order = require('../models/Order');
const { connectDB } = require('./database');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await Order.deleteMany();

    // Create admin user
    const admin = new Admin({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');

    // Create sample orders
    const sampleOrders = [
      {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
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
        status: 'Pending',
        isNew: true,
        notes: 'Customer requested express shipping'
      },
      {
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        customerAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        items: [
          {
            name: 'Rosemary Hair Elixir',
            qty: 2,
            price: 29.99,
            productId: 'rosemary-elixir'
          },
          {
            name: 'Hair Heat Protection Spray',
            qty: 1,
            price: 29.99,
            productId: 'heat-protection-spray'
          }
        ],
        totalAmount: 89.97,
        status: 'Confirmed',
        isNew: false,
        notes: 'Customer is a returning buyer'
      },
      {
        customerName: 'Mike Johnson',
        customerEmail: 'mike.johnson@example.com',
        customerAddress: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
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
            qty: 1,
            price: 29.99,
            productId: 'rosemary-elixir'
          }
        ],
        totalAmount: 79.98,
        status: 'Shipped',
        isNew: false,
        notes: 'Shipped via FedEx tracking: 123456789'
      },
      {
        customerName: 'Sarah Wilson',
        customerEmail: 'sarah.wilson@example.com',
        customerAddress: {
          street: '321 Elm St',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        items: [
          {
            name: 'Hair Heat Protection Spray',
            qty: 3,
            price: 29.99,
            productId: 'heat-protection-spray'
          }
        ],
        totalAmount: 89.97,
        status: 'Cancelled',
        isNew: false,
        notes: 'Customer requested cancellation due to shipping delay'
      },
      {
        customerName: 'David Brown',
        customerEmail: 'david.brown@example.com',
        customerAddress: {
          street: '654 Maple Dr',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
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
            name: 'Hair Heat Protection Spray',
            qty: 1,
            price: 29.99,
            productId: 'heat-protection-spray'
          },
          {
            name: 'Rosemary Hair Elixir',
            qty: 1,
            price: 29.99,
            productId: 'rosemary-elixir'
          }
        ],
        totalAmount: 109.97,
        status: 'Pending',
        isNew: true,
        notes: 'New customer, first order'
      }
    ];

    await Order.insertMany(sampleOrders);
    console.log('✅ Sample orders created successfully');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Admin credentials:');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n📊 Sample data created:');
    console.log(`- ${sampleOrders.length} orders`);
    console.log(`- 1 admin user`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
