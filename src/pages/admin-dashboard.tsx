import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Admin pages should not show navbar and footer

// API base URL - works for both development and production
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  isNew: boolean;
  orderDate: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
}

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  newOrders: number;
  totalRevenue: number;
  todayOrders: number;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  // Re-filter when search term changes
  useEffect(() => {
    if (allOrders.length > 0) {
      filterOrders(activeTab);
    }
  }, [searchTerm, allOrders]);

  // Reset to first page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all orders (not just latest)
      const ordersResponse = await fetch(`${API_BASE}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      // Fetch stats
      const statsResponse = await fetch(`${API_BASE}/orders/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (ordersResponse.ok && statsResponse.ok) {
        const ordersData = await ordersResponse.json();
        const statsData = await statsResponse.json();
        
        setAllOrders(ordersData.data);
        setOrders(ordersData.data); // Initially show all orders
        setStats(statsData.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin-login');
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  // Filter orders based on active tab and search term
  const filterOrders = (tab: string) => {
    setActiveTab(tab);
    let filteredOrders = allOrders;
    
    // First filter by tab
    switch (tab) {
      case 'all':
        filteredOrders = allOrders;
        break;
      case 'new':
        filteredOrders = allOrders.filter(order => order.isNew === true);
        break;
      case 'pending':
        filteredOrders = allOrders.filter(order => order.status === 'Pending');
        break;
      case 'confirmed':
        filteredOrders = allOrders.filter(order => order.status === 'Confirmed');
        break;
      case 'shipped':
        filteredOrders = allOrders.filter(order => order.status === 'Shipped');
        break;
      case 'cancelled':
        filteredOrders = allOrders.filter(order => order.status === 'Cancelled');
        break;
      default:
        filteredOrders = allOrders;
    }
    
    // Then filter by search term
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setOrders(filteredOrders);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterOrders(activeTab); // Re-filter with current tab and new search term
  };

  // Get count for each tab
  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'all':
        return allOrders.length;
      case 'new':
        return allOrders.filter(order => order.isNew === true).length;
      case 'pending':
        return allOrders.filter(order => order.status === 'Pending').length;
      case 'confirmed':
        return allOrders.filter(order => order.status === 'Confirmed').length;
      case 'shipped':
        return allOrders.filter(order => order.status === 'Shipped').length;
      case 'cancelled':
        return allOrders.filter(order => order.status === 'Cancelled').length;
      default:
        return 0;
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export to Excel/CSV function
  const exportToExcel = (exportFiltered = false) => {
    // Determine which data to export
    const dataToExport = exportFiltered ? orders : allOrders;
    const exportType = exportFiltered ? 'filtered' : 'all';
    
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
      ...dataToExport.map(order => [
        order.orderId,
        `"${order.customerName.replace(/"/g, '""')}"`, // Escape quotes in names
        order.customerEmail,
        order.totalAmount,
        order.status,
        order.isNew ? 'Yes' : 'No',
        new Date(order.orderDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        order.items.length,
        `"${order.items.map(item => `${item.name} (${item.qty}x $${item.price})`).join('; ').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    // Create filename with timestamp and filter info
    const timestamp = new Date().toISOString().split('T')[0];
    const filterInfo = exportFiltered ? `_${activeTab}_${searchTerm ? 'search' : ''}` : '';
    const filename = `orders_export_${exportType}${filterInfo}_${timestamp}.csv`;

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message
    alert(`✅ Export successful! Downloaded: ${filename}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.totalOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">⏳</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.pendingOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                      <dd className="text-lg font-medium text-gray-900">${stats.totalRevenue.toFixed(2)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🆕</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">New Orders</dt>
                      <dd className="text-lg font-medium text-gray-900">{stats.newOrders}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg leading-6 font-medium text-gray-900">Orders Management</h3>
               <div className="flex space-x-3">
                 <button
                   onClick={() => exportToExcel(false)}
                   className="inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                   title="Export all orders to CSV"
                 >
                   <span className="mr-2">📊</span>
                   Export All Data
                 </button>
                 {orders.length !== allOrders.length && (
                   <button
                     onClick={() => exportToExcel(true)}
                     className="inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     title="Export filtered orders to CSV"
                   >
                     <span className="mr-2">📋</span>
                     Export Filtered ({orders.length})
                   </button>
                 )}
                 <button
                   onClick={fetchData}
                   className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <span className="mr-2">🔄</span>
                   Refresh
                 </button>
               </div>
             </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {[
                  { id: 'all', name: 'All Orders', icon: '📦' },
                  { id: 'new', name: 'New Orders', icon: '🆕' },
                  { id: 'pending', name: 'Pending', icon: '⏳' },
                  { id: 'confirmed', name: 'Confirmed', icon: '✅' },
                  { id: 'shipped', name: 'Shipped', icon: '🚚' },
                  { id: 'cancelled', name: 'Cancelled', icon: '❌' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => filterOrders(tab.id)}
                    className={`
                      whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                      ${activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                    <span className={`
                      ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium
                      ${activeTab === tab.id
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-900'
                      }
                    `}>
                      {getTabCount(tab.id)}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, orders.length)} of {orders.length} orders
                {searchTerm && ` (filtered from ${allOrders.length} total)`}
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <li className="px-4 py-8 text-center">
                <div className="text-gray-500">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-lg font-medium">No orders found</p>
                  <p className="text-sm">There are no orders in the "{activeTab}" category.</p>
                </div>
              </li>
            ) : (
              currentOrders.map((order) => (
              <li key={order.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {order.orderId}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {order.isNew && (
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            NEW
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} items • ${order.totalAmount}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                           <span className={`
                             inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                               order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                               order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                               order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                               'bg-gray-100 text-gray-800'
                             }
                           `}>
                             {order.status}
                           </span>
                           <select
                             value={order.status}
                             onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                             className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                           >
                             <option value="Pending">Pending</option>
                             <option value="Confirmed">Confirmed</option>
                             <option value="Shipped">Shipped</option>
                             <option value="Cancelled">Cancelled</option>
                           </select>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </li>
                         ))
             )}
           </ul>
           
           {/* Pagination */}
           {orders.length > 0 && totalPages > 1 && (
             <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
               <div className="flex-1 flex justify-between sm:hidden">
                 <button
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Previous
                 </button>
                 <button
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Next
                 </button>
               </div>
               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                 <div>
                   <p className="text-sm text-gray-700">
                     Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                     <span className="font-medium">{Math.min(indexOfLastOrder, orders.length)}</span> of{' '}
                     <span className="font-medium">{orders.length}</span> results
                   </p>
                 </div>
                 <div>
                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                     <button
                       onClick={() => handlePageChange(currentPage - 1)}
                       disabled={currentPage === 1}
                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       <span className="sr-only">Previous</span>
                       ←
                     </button>
                     
                     {getPageNumbers().map((pageNumber, index) => (
                       <button
                         key={index}
                         onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
                         disabled={pageNumber === '...'}
                         className={`
                           relative inline-flex items-center px-4 py-2 border text-sm font-medium
                           ${typeof pageNumber === 'number'
                             ? pageNumber === currentPage
                               ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                               : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                             : 'bg-white border-gray-300 text-gray-500 cursor-default'
                           }
                         `}
                       >
                         {pageNumber}
                       </button>
                     ))}
                     
                     <button
                       onClick={() => handlePageChange(currentPage + 1)}
                       disabled={currentPage === totalPages}
                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       <span className="sr-only">Next</span>
                       →
                     </button>
                   </nav>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };

export default AdminDashboard;
