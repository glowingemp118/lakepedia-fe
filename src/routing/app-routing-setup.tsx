import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { Layout3 } from '@/components/layouts/layout-3';
import { ErrorRouting } from '@/errors/error-routing';
import { Navigate, Route, Routes } from 'react-router';

import { ProfileView } from '@/pages/business-dashboard/profile/view/profile-view';

import { ProfileView as TravelerProfileView } from '@/pages/traveler-dashboard/profile/view/profile-view';

// import { ProfileView as AdminProfileView } from '@/pages/admin-dasbhoard/profile/view/profile-view';

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

import { BusinessSettingsView } from '@/pages/business-dashboard/settings/view/settings-view';

//super-admin

import BusinessessView from '@/pages/admin-dasbhoard/businesse/view/business-view';
import AdminProfileView from '@/pages/admin-dasbhoard/profile/view/user-profile-view';
import TravelersView from '@/pages/admin-dasbhoard/users/view/travelers-view';



export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route element={<Layout3 />}>

        <Route element={<RequireAuth role={"traveler"} />}>

          {/* <Route path="/traveler" element={<UserProfileView />} /> */}

          <Route path="/traveler" element={<ActivityView />} />

          <Route path="/traveler/settings" element={<SettingsView />} />

          <Route path="/traveler/trips" element={<TripsView />} />

          <Route path="/traveler/trips/:id" element={<TripsDetailView />} />
          {/* saved */}
          <Route path="/traveler/saved" element={<SavedView />} />

          {/* to-do */}
          <Route path="/traveler/to-do" element={<TodoView />} />

          {/* activity */}
          {/* <Route path="/traveler/activity" element={<ActivityView />} /> */}

          {/* Favorites */}
          {/* <Route path="/traveler-dashboard/edit-profile" element={<UserProfileView />} /> */}

          <Route path="/traveler/profile" element={<TravelerProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"business"} />}>

          <Route path="/business" element={<BusinessProfileView />} />

          <Route path="/business/settings" element={<BusinessSettingsView />} />

          <Route path="/business/activity" element={<BusinessActivityView />} />

          {/* Photos */}
          <Route path="/business/lakes" element={<LakesView />} />

          <Route path='/business/lakes/create' element={<CreateLakePage />} />
          
          <Route path="/business/lakes/:id" element={<LakeDetailView />} />

          {/* Reviews */}
          <Route path="/business/subscription" element={<SubscriptionView />} />

          <Route path="/business/upgrade-subscription" element={<UpgradeSubscriptionView />} />

          {/* <Route path="/business-dashboard/edit-business" element={<BusinessAccountProfilePage />} /> */}

          <Route path="/business/stats" element={<StatsView />} />

          <Route path="/business/profile" element={<ProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"admin"} />}>

          <Route path="/admin" element={<AdminProfileView />} />

          <Route path="/admin/profile" element={<AdminProfileView />} />

          <Route path="/admin/businesses" element={<BusinessessView />} />

          <Route path="/admin/travelers" element={<TravelersView />} />
          
        </Route>

      </Route>
      <Route path="/*" element={<AuthRouting />} />
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
