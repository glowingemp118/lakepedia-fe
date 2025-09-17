import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { Layout3 } from '@/components/layouts/layout-3';
import { ErrorRouting } from '@/errors/error-routing';
import { Layout3Page } from '@/pages/layout-3/page';
import { Navigate, Route, Routes } from 'react-router';

import FavoritesView from '@/pages/traveler-dashboard/favorites/view/favoritses-view';
import MainView from '@/pages/traveler-dashboard/main/view/main-view';
import PhotosView from '@/pages/traveler-dashboard/photos/view/photos-view';
import ReviewsView from '@/pages/traveler-dashboard/reviews/view/reviews-view';
import TripView from '@/pages/traveler-dashboard/trip/view/trip-view';


import BusinessMainView from '@/pages/business-dashboard/main/view/main-view';
import MediaView from '@/pages/business-dashboard/media/view/media-view';
import PerformanceView from '@/pages/business-dashboard/performance/view/performanc-view';
import SubscriptionsView from '@/pages/business-dashboard/subscriptions/view/subscriptions-view';


export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<Layout3 />}>

        <Route element={<RequireAuth role={"traveler"} />}>

          <Route path="/traveler-dashboard" element={<MainView />} />

          <Route path="/traveler-dashboard/trips" element={<TripView />} />

          {/* Photos */}
          <Route path="/traveler-dashboard/photos" element={<PhotosView />} />

          {/* Reviews */}
          <Route path="/traveler-dashboard/reviews" element={<ReviewsView />} />

          {/* Favorites */}
          <Route path="/traveler-dashboard/favorites" element={<FavoritesView />} />
        </Route>

        <Route element={<RequireAuth role={"business"} />}>

          <Route path="/business-dashboard" element={<BusinessMainView />} />

          <Route path="/business-dashboard/media" element={<MediaView />} />

          {/* Photos */}
          <Route path="/business-dashboard/performance" element={<PerformanceView />} />

          {/* Reviews */}
          <Route path="/business-dashboard/subscriptions" element={<SubscriptionsView />} />
        </Route>

        <Route element={<RequireAuth role={"admin"} />}>

          <Route path="/admin-dashboard" element={<Layout3Page />} />
        </Route>

      </Route>
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
