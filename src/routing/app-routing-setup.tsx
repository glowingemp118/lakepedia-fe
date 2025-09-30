import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { Layout3 } from '@/components/layouts/layout-3';
import { ErrorRouting } from '@/errors/error-routing';
import { Layout3Page } from '@/pages/layout-3/page';
import { Navigate, Route, Routes } from 'react-router';

import MainView from '@/pages/traveler-dashboard/main/view/main-view';


import BusinessMainView from '@/pages/business-dashboard/main/view/main-view';

import { ProfileView } from '@/pages/business-dashboard/profile/view/profile-view';

import { ProfileView as TravelerProfileView } from '@/pages/traveler-dashboard/profile/view/profile-view';

import { ProfileView as AdminProfileView } from '@/pages/admin-dasbhoard/profile/view/profile-view';
import HomeView from '@/pages/home/view/home-view';
import ActivityView from '@/pages/traveler-dashboard/activity/view/activity-view';

import BusinessActivityView from '@/pages/business-dashboard/activity/view/activity-view';
import BusinessView from '@/pages/business-dashboard/business/view/business-view';
import LakesView from '@/pages/business-dashboard/lakes/view/lakes-view';
import StatsView from '@/pages/business-dashboard/stats/view/stats-view';
import SubscriptionView from '@/pages/business-dashboard/subscription/view/subscription-view';
import SavedView from '@/pages/traveler-dashboard/saved/view/saved-view';
import TodoView from '@/pages/traveler-dashboard/to-do/view/to-do-view';
import TripsView from '@/pages/traveler-dashboard/trips/view/trips-view';



export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route element={<Layout3 />}>

        <Route element={<RequireAuth role={"traveler"} />}>

          <Route path="/traveler-dashboard" element={<MainView />} />

          <Route path="/traveler-dashboard/trips" element={<TripsView />} />

          {/* saved */}
          <Route path="/traveler-dashboard/saved" element={<SavedView />} />

          {/* to-do */}
          <Route path="/traveler-dashboard/to-do" element={<TodoView />} />

          {/* activity */}
          <Route path="/traveler-dashboard/activity" element={<ActivityView />} />

          {/* Favorites */}
          {/* <Route path="/traveler-dashboard/favorites" element={<FavoritesView />} /> */}

          <Route path="/traveler-dashboard/profile" element={<TravelerProfileView />} />
        </Route>



        <Route element={<RequireAuth role={"business"} />}>

          <Route path="/business-dashboard" element={<BusinessMainView />} />

          <Route path="/business-dashboard/activity" element={<BusinessActivityView />} />

          {/* Photos */}
          <Route path="/business-dashboard/lakes" element={<LakesView />} />

          {/* Reviews */}
          <Route path="/business-dashboard/subscription" element={<SubscriptionView />} />

          <Route path="/business-dashboard/edit-business" element={<BusinessView />} />

          <Route path="/business-dashboard/stats" element={<StatsView />} />

          <Route path="/business-dashboard/profile" element={<ProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"admin"} />}>

          <Route path="/admin-dashboard" element={<Layout3Page />} />

          <Route path="/admin-dashboard/profile" element={<AdminProfileView />} />
        </Route>

      </Route>
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
