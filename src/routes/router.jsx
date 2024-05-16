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

export const AuthPage = lazy(() => import('../pages/auth'))


const Router = () => {
  const routes = useRoutes([
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

  return routes
};

export default Router;
