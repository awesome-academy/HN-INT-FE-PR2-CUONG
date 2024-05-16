import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import HomePage from '../pages/homepage'
import CartPage from "../pages/cart";
import WishlistPage from "../pages/wishlist";
import ProductsPage from "../pages/products";
import DetailProductPage from "../pages/detail-product";
import CheckOutPage from "../pages/checkout";
import AccountPage from "../pages/account";
import Loading from "../components/Loading";
import NotFound from "../pages/404";
import { useUserStorage } from "../states/user";

// admin
import AdminLayout from "../layouts/AdminLayout";
import AdminHomePage from "../pages/adminhome";
import AdminUserPage from "../pages/adminuser";
import AdminProductPage from "../pages/adminproduct";
import CreateProduct from "../components/AdminProduct/create-product";
import AdminOrderPage from "../pages/adminorder";

export const AuthPage = lazy(() => import('../pages/auth'))


const Router = () => {

  const {user} = useUserStorage()

  const userRoutes =  useRoutes([
    {
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "/shop", element: <ProductsPage /> },
        { path: '/product/:product_id', element: <DetailProductPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/wishlist', element: <WishlistPage /> },
        { path: '/checkout', element: <CheckOutPage /> },
        { path: '/account', element: <AccountPage /> },
      ],
    },
    {
      path: 'auth',
      element: <AuthPage />,
    }, 
    { 
      path: "*", 
      element: <NotFound /> 
    },
  ]);

  const adminRoutes = useRoutes([
    {
      element: (
        <AdminLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      ),
      children: [
        { element: <AdminHomePage />, index: true },
        { path: '/users', element: <AdminUserPage/> },
        { path: '/products', element: <AdminProductPage/> },
        { path: '/products/add', element: <CreateProduct/>},
        { path: '/orders', element: <AdminOrderPage/> },
        // { path: '/profile', element: <ProfilePage/> },
      ],
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ]);

  const routes = user?.role == 'admin' ? adminRoutes : userRoutes

  return routes
};

export default Router;
