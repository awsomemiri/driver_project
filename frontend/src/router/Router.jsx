import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import AppLayout from '../common/components/layouts/AppLayout';
import ContactPage from '../features/contact/ContactPage';
import ProductListPage from '../features/products/ProductListPage';
import ProductDetailsPage from '../features/products/ProductDetailsPage';
import CartPage from '../features/cart/CartPage';
import CheckoutPage from '../features/checkout/CheckoutPage';
import PaymentForm from '../features/checkout/PaymentForm';
import DraiverListPage from '../features/products/DraiverListPage';
import DraiverDetailsPage from '../features/products/DraiverDetailsPage';
import ItemsDetailsPage from '../features/products/ItemsDetailsPage';
import ItemListPage from '../features/products/ItemListPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import ProfilePage from '../features/auth/ProfilePage';
import OrdersPage from '../features/orders/OrdersPage';
import ProtectedRoute from '../common/components/ProtectedRoute';



const Router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/productList", element: <ProductListPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      { path: "/paymentForm", element: <PaymentForm /> },
      { path: "/draiverlist", element: <DraiverListPage /> },
      { path: "/driver/:id", element: <DraiverDetailsPage /> },
      { path: "/itemlist", element: <ItemListPage /> },
      { path: "/item/:id", element: <ItemsDetailsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "/orders", element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
    ],
  },
]);

export default Router;
