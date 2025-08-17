const express = require('express');
const router = express.Router();
const {
  getLatestOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  markOrderAsSeen,
  createOrder,
  getOrderStats,
  exportOrders
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// @route   GET /api/orders/latest
// @desc    Get latest 10 orders
// @access  Private
router.get('/latest', getLatestOrders);

// @route   GET /api/orders/stats
// @desc    Get order statistics
// @access  Private
router.get('/stats', getOrderStats);

// @route   GET /api/orders
// @desc    Get all orders with filtering
// @access  Private
router.get('/', getAllOrders);

// @route   GET /api/orders/export
// @desc    Export orders to CSV
// @access  Private
router.get('/export', exportOrders);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', createOrder);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', getOrderById);

// @route   PATCH /api/orders/:id
// @desc    Update order status
// @access  Private
router.patch('/:id', updateOrderStatus);

// @route   PATCH /api/orders/:id/mark-seen
// @desc    Mark order as seen
// @access  Private
router.patch('/:id/mark-seen', markOrderAsSeen);

module.exports = router;
