import { selectUser } from '@/store/slices/userSlice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Component to protect routes that require authentication.
 * If user is not authenticated, redirects to the login page.
 */
interface RequireAuthProps {
  role?: string; // Optional role prop for role-based access control
}
export const RequireAuth: FC<RequireAuthProps> = ({ role }) => {

  const user = useSelector(selectUser);

  // Show screen loader while checking authentication
  // if (loading || globalLoading) {
  //   return <ScreenLoader />;
  // }



  // If not authenticated, redirect to login

  if (!user || (role && user.role !== role)) {
    return (
      <Navigate
        to={`/auth/${role === "admin" ? "admin/" : ""}signin?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }


  // If authenticated, render child routes
  return <Outlet />;
};
