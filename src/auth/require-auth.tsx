import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ScreenLoader } from '@/components/common/screen-loader';
import { useAuth } from './context/auth-context';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/userSlice';

/**
 * Component to protect routes that require authentication.
 * If user is not authenticated, redirects to the login page.
 */
export const RequireAuth = () => {
 const user = useSelector(selectUser);
  // Show screen loader while checking authentication
  // if (loading || globalLoading) {
  //   return <ScreenLoader />;
  // }
  console.log("user in require auth", user);
  

  // If not authenticated, redirect to login
  if (!user) {
    return (
      <Navigate
        to={`/auth/signin?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // If authenticated, render child routes
  return <Outlet />;
};
