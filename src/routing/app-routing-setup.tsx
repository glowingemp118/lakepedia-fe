import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { Layout3 } from '@/components/layouts/layout-3';
import { ErrorRouting } from '@/errors/error-routing';
import { Layout3Page } from '@/pages/layout-3/page';
import { Navigate, Route, Routes } from 'react-router';




import { ProfileView } from '@/pages/business-dashboard/profile/view/profile-view';

import { ProfileView as TravelerProfileView } from '@/pages/traveler-dashboard/profile/view/profile-view';

import { ProfileView as AdminProfileView } from '@/pages/admin-dasbhoard/profile/view/profile-view';

import HomeView from '@/pages/home/view/home-view';

import ActivityView from '@/pages/traveler-dashboard/activity/view/activity-view';

import BusinessActivityView from '@/pages/business-dashboard/activity/view/activity-view';
import CreateLakePage from '@/pages/business-dashboard/lakes/view/create-lake-view';
import LakeDetailView from '@/pages/business-dashboard/lakes/view/lake-detail-view';
import LakesView from '@/pages/business-dashboard/lakes/view/lakes-view';
import StatsView from '@/pages/business-dashboard/stats/view/stats-view';
import SubscriptionView from '@/pages/business-dashboard/subscription/view/subscription-view';
import UpgradeSubscriptionView from '@/pages/business-dashboard/subscription/view/upgrade-subscription-view';
import SavedView from '@/pages/traveler-dashboard/saved/view/saved-view';
import SettingsView from '@/pages/traveler-dashboard/settings/view/settings-view';
import TodoView from '@/pages/traveler-dashboard/to-do/view/to-do-view';
import TripsDetailView from '@/pages/traveler-dashboard/trips/view/trip-detail-view';
import TripsView from '@/pages/traveler-dashboard/trips/view/trips-view';
import UserProfileView from '@/pages/traveler-dashboard/user-profile/view/user-profile-view';

import { BusinessProfileView } from '@/pages/business-dashboard/user-profile/view/user-profile-view';
import {BusinessSettingsView} from '@/pages/business-dashboard/settings/view/settings-view';



export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route element={<Layout3 />}>

        <Route element={<RequireAuth role={"traveler"} />}>

          <Route path="/traveler-dashboard" element={<UserProfileView />} />

          <Route path="/traveler-dashboard/settings" element={<SettingsView />} />

          <Route path="/traveler-dashboard/trips" element={<TripsView />} />

          <Route path="/traveler-dashboard/trips/:id" element={<TripsDetailView />} />
          {/* saved */}
          <Route path="/traveler-dashboard/saved" element={<SavedView />} />

          {/* to-do */}
          <Route path="/traveler-dashboard/to-do" element={<TodoView />} />

          {/* activity */}
          <Route path="/traveler-dashboard/activity" element={<ActivityView />} />

          {/* Favorites */}
          {/* <Route path="/traveler-dashboard/edit-profile" element={<UserProfileView />} /> */}

          <Route path="/traveler-dashboard/profile" element={<TravelerProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"business"} />}>

          <Route path="/business-dashboard" element={<BusinessProfileView />} />

          <Route path="/business-dashboard/settings" element={<BusinessSettingsView />} />

          <Route path="/business-dashboard/activity" element={<BusinessActivityView />} />

          {/* Photos */}
          <Route path="/business-dashboard/lakes" element={<LakesView />} />

          <Route path='/business-dashboard/lakes/create' element={<CreateLakePage />} />
          
          <Route path="/business-dashboard/lakes/:id" element={<LakeDetailView />} />

          {/* Reviews */}
          <Route path="/business-dashboard/subscription" element={<SubscriptionView />} />

          <Route path="/business-dashboard/upgrade-subscription" element={<UpgradeSubscriptionView />} />

          {/* <Route path="/business-dashboard/edit-business" element={<BusinessAccountProfilePage />} /> */}

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
