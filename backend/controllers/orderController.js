const Order = require('../models/Order');

// @desc    Get latest 10 orders
// @route   GET /api/orders/latest
// @access  Private
const getLatestOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    
    // Sort by orderDate (newest first) and take latest 10
    const orders = allOrders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Get latest orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get all orders with filtering
// @route   GET /api/orders
// @access  Private
const getAllOrders = async (req, res) => {
  try {
    const {
      status,
      dateFrom,
      dateTo,
      isNew,
      customerEmail,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (isNew !== undefined) {
      filter.isNew = isNew === 'true';
    }

    if (customerEmail) {
      filter.customerEmail = { $regex: customerEmail, $options: 'i' };
    }

    // Date range filter
    if (dateFrom || dateTo) {
      filter.orderDate = {};
      if (dateFrom) {
        filter.orderDate.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.orderDate.$lte = new Date(dateTo + 'T23:59:59.999Z');
      }
    }

    // Get all orders and apply filtering
    const allOrders = await Order.find(filter);
    
    // Sort by orderDate (newest first)
    const sortedOrders = allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const orders = sortedOrders.slice(skip, skip + parseInt(limit));

    const total = allOrders.length;

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Pending, Confirmed, Shipped, Cancelled'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    if (notes) {
      order.notes = notes;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Mark order as seen (no longer new)
// @route   PATCH /api/orders/:id/mark-seen
// @access  Private
const markOrderAsSeen = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.isNew = false;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order marked as seen',
      data: order
    });
  } catch (error) {
    console.error('Mark order as seen error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Create new order (for testing or external integration)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerAddress,
      items,
      totalAmount,
      notes
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerName, customerEmail, items, and totalAmount'
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items must be a non-empty array'
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.name || !item.qty || !item.price || !item.productId) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have name, qty, price, and productId'
        });
      }
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerAddress,
      items,
      totalAmount,
      notes
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Order with this ID already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private
const getOrderStats = async (req, res) => {
  try {
    const allOrders = await Order.find();
    
    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter(order => order.status === 'Pending').length;
    const confirmedOrders = allOrders.filter(order => order.status === 'Confirmed').length;
    const shippedOrders = allOrders.filter(order => order.status === 'Shipped').length;
    const cancelledOrders = allOrders.filter(order => order.status === 'Cancelled').length;
    const newOrders = allOrders.filter(order => order.isNew === true).length;

    // Get total revenue (excluding cancelled orders)
    const totalRevenue = allOrders
      .filter(order => order.status !== 'Cancelled')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    // Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = allOrders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= today;
    }).length;

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        shippedOrders,
        cancelledOrders,
        newOrders,
        totalRevenue,
        todayOrders
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// @desc    Export orders to CSV
// @route   GET /api/orders/export
// @access  Private
const exportOrders = async (req, res) => {
  try {
    const { status, dateFrom, dateTo, isNew } = req.query;
    let filter = {};

    // Apply filters
    if (status) filter.status = status;
    if (isNew !== undefined) filter.isNew = isNew === 'true';
    if (dateFrom || dateTo) {
      filter.orderDate = {};
      if (dateFrom) filter.orderDate.$gte = new Date(dateFrom);
      if (dateTo) filter.orderDate.$lte = new Date(dateTo);
    }

    const orders = await Order.find(filter);
    
    // Create CSV content
    const headers = [
      'Order ID',
      'Customer Name', 
      'Customer Email',
      'Total Amount',
      'Status',
      'Is New',
      'Order Date',
      'Items Count',
      'Items Details'
    ];

    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.orderId,
        `"${order.customerName.replace(/"/g, '""')}"`,
        order.customerEmail,
        order.totalAmount,
        order.status,
        order.isNew ? 'Yes' : 'No',
        new Date(order.orderDate).toISOString(),
        order.items.length,
        `"${order.items.map(item => `${item.name} (${item.qty}x $${item.price})`).join('; ').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="orders_export_${new Date().toISOString().split('T')[0]}.csv"`);
    
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Export orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getLatestOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  markOrderAsSeen,
  createOrder,
  getOrderStats,
  exportOrders
};
