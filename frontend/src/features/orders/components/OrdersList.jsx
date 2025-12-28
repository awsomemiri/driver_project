import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, removeOrder, clearError } from '../ordersSlice';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import './OrdersList.css';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את ההזמנה?')) {
      try {
        await dispatch(removeOrder(orderId)).unwrap();
      } catch (error) {
        console.error('Failed to delete order:', error);
      }
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'ממתין לתשלום';
      case 'paid':
        return 'שולם';
      case 'failed':
        return 'תשלום נכשל';
      default:
        return 'לא ידוע';
    }
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'paid':
        return 'status-paid';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <p>טוען הזמנות...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">
          <p>שגיאה בטעינת הזמנות: {error}</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <h3>אין הזמנות</h3>
          <p>עדיין לא ביצעת הזמנות.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>ההזמנות שלי</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>הזמנה #{order.id}</h3>
                <span className="order-date">
                  {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm', { locale: he })}
                </span>
              </div>
              <div className="order-actions">
                <span className={`payment-status ${getPaymentStatusClass(order.paymentStatus)}`}>
                  {getPaymentStatusText(order.paymentStatus)}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteOrder(order.id)}
                  title="מחק הזמנה"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="order-details">
              <div className="order-items">
                <h4>פריטים:</h4>
                <div className="items-grid">
                  {order.items?.map((item, index) => (
                    <div key={index} className="order-item-card">
                      {item.productImage && (
                        <div className="item-image">
                          <img 
                            src={process.env.PUBLIC_URL + item.productImage} 
                            alt={item.productName}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="item-details">
                        <div className="item-name">{item.productName}</div>
                        <div className="item-type">
                          {item.itemType === 'car' ? 'רכב' : 
                           item.itemType === 'driver' ? 'נהג' : 
                           item.itemType === 'item' ? 'פריט' : 'לא ידוע'}
                        </div>
                        <div className="item-quantity">כמות: {item.quantity}</div>
                        <div className="item-price">₪{item.unitPrice} × {item.quantity} = ₪{item.totalPrice}</div>
                        <div className="item-actions">
                          <a 
                            href={`/${item.itemType === 'car' ? 'product' : item.itemType === 'driver' ? 'driver' : 'item'}/${item.productId}?from=orders`}
                            className="view-details-link"
                          >
                            צפה בפרטים
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-total">
                <strong>סה"כ: ₪{order.totalAmount}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
