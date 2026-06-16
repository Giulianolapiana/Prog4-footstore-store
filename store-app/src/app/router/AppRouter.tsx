import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { AuthLayout } from '../../shared/layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from '../../features/home/HomePage';
import { ProductsPage } from '../../features/products/ProductsPage';
import { ProductDetailPage } from '../../features/products/ProductDetailPage';
import { CartPage } from '../../features/cart/CartPage';
import { CheckoutPage } from '../../features/checkout/CheckoutPage';
import { OrdersPage } from '../../features/orders/OrdersPage';
import { PagoFeedbackPage } from '../../features/pagos';
import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { useOrderStatusWS } from '../../features/orders/hooks/useOrderStatusWS';

export const AppRouter = () => {
  // Initialize WebSocket connection globally if user is logged in
  useOrderStatusWS();

  return (
    <BrowserRouter>
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/pago/:status" element={<PagoFeedbackPage />} />
        </Route>
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  );
};
