# eCommerce Admin Dashboard Backend API

A complete Node.js/Express backend API for managing eCommerce orders and admin authentication. Built with security best practices and ready for Vercel deployment.

## 🚀 Features

### 🔐 Admin Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes with middleware
- Admin profile management

### 📦 Order Management
- Complete CRUD operations for orders
- Advanced filtering and pagination
- Order status management (Pending, Confirmed, Shipped, Cancelled)
- Real-time notifications for new orders

### 📊 Dashboard Features
- Latest orders overview
- Order statistics and analytics
- Customer information tracking
- Order history and status updates

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JSON File Storage** - Simple file-based database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── seeder.js        # Database seeder
├── controllers/
│   ├── authController.js # Authentication logic
│   └── orderController.js # Order management logic
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── Admin.js         # Admin user model
│   └── Order.js         # Order model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── orders.js        # Order management routes
├── server.js            # Main server file
├── package.json         # Dependencies
├── vercel.json          # Vercel deployment config
└── env.example          # Environment variables template
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the environment template and configure your variables:

```bash
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# No database configuration needed - uses JSON files

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database Setup

The application uses JSON files for data storage, which are automatically created when you first run the application.

#### Seed Database
Run the seeder to create initial admin user and sample data:

```bash
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/admin/login
Admin login endpoint.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "admin_id",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /api/admin/profile
Get current admin profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### PUT /api/admin/change-password
Change admin password (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

### Order Management Endpoints

#### GET /api/orders/latest
Get latest 10 orders (requires authentication).

#### GET /api/orders
Get all orders with filtering (requires authentication).

**Query Parameters:**
- `status` - Filter by order status (Pending, Confirmed, Shipped, Cancelled)
- `dateFrom` - Filter orders from date (YYYY-MM-DD)
- `dateTo` - Filter orders to date (YYYY-MM-DD)
- `isNew` - Filter new orders (true/false)
- `customerEmail` - Search by customer email
- `page` - Page number for pagination
- `limit` - Number of orders per page

**Example:**
```
GET /api/orders?status=Confirmed&dateFrom=2025-01-01&page=1&limit=20
```

#### GET /api/orders/:id
Get single order by ID (requires authentication).

#### PATCH /api/orders/:id
Update order status (requires authentication).

**Request Body:**
```json
{
  "status": "Confirmed",
  "notes": "Order confirmed and ready for shipping"
}
```

#### PATCH /api/orders/:id/mark-seen
Mark order as seen (no longer new) (requires authentication).

#### GET /api/orders/stats
Get order statistics (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "pendingOrders": 25,
    "confirmedOrders": 45,
    "shippedOrders": 70,
    "cancelledOrders": 10,
    "newOrders": 5,
    "totalRevenue": 12500.50,
    "todayOrders": 8
  }
}
```

#### POST /api/orders
Create new order (requires authentication).

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "items": [
    {
      "name": "Lissage Prestige Styler",
      "qty": 1,
      "price": 49.99,
      "productId": "perlebrush"
    }
  ],
  "totalAmount": 49.99,
  "notes": "Customer notes here"
}
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Rate Limiting** - Protection against brute force attacks
- **Helmet** - Security headers
- **CORS** - Controlled cross-origin requests
- **Input Validation** - Request data validation
- **Error Handling** - Comprehensive error management

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd backend
vercel
```

3. **Set Environment Variables:**
In your Vercel dashboard, add all environment variables from your `.env` file.

4. **Data Storage:**
The application uses JSON files for data storage, which are automatically created and managed by the application.

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `JWT_SECRET` - A strong, unique secret key
- `CORS_ORIGIN` - Your frontend domain
- `ADMIN_EMAIL` - Admin email
- `ADMIN_PASSWORD` - Admin password

## 📊 Database Models

### Order Model
```javascript
{
  orderId: String,           // Auto-generated unique ID
  customerName: String,      // Customer name
  customerEmail: String,     // Customer email
  customerAddress: Object,   // Shipping address
  items: Array,              // Order items
  totalAmount: Number,       // Total order amount
  orderDate: Date,           // Order timestamp
  status: String,            // Order status
  isNew: Boolean,            // New order flag
  notes: String              // Order notes
}
```

### Admin Model
```javascript
{
  email: String,             // Admin email
  password: String,          // Hashed password
  name: String,              // Admin name
  role: String,              // Admin role
  isActive: Boolean,         // Account status
  lastLogin: Date            // Last login timestamp
}
```

## 🧪 Testing

### Manual Testing with Postman/Thunder Client

1. **Login:**
```
POST /api/admin/login
Body: {"email": "admin@example.com", "password": "admin123"}
```

2. **Use the returned token in subsequent requests:**
```
Headers: Authorization: Bearer <token>
```

3. **Test order endpoints:**
```
GET /api/orders/latest
GET /api/orders?status=Pending
PATCH /api/orders/:id
```

## 🔧 Development Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

## 📝 Notes

- All order endpoints require authentication
- Orders are automatically assigned unique IDs
- New orders are marked with `isNew: true` for notifications
- The API includes comprehensive error handling
- Rate limiting is applied to all API endpoints
- CORS is configured for frontend integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
