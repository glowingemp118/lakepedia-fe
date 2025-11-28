import { RequireAuth } from '@/auth/require-auth';
import { Layout3 } from '@/components/layouts/layout-3';
import { ErrorRouting } from '@/errors/error-routing';
import { Navigate, Route, Routes } from 'react-router';

import { ProfileView } from '@/pages/business-dashboard/profile/view/profile-view';

import { ProfileView as TravelerProfileView } from '@/pages/traveler-dashboard/profile/view/profile-view';

// import { ProfileView as AdminProfileView } from '@/pages/admin-dasbhoard/profile/view/profile-view';


import ActivityView from '@/pages/traveler-dashboard/activity/view/activity-view';

import BusinessActivityView from '@/pages/business-dashboard/activity copy/view/activity-view';
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


import { BusinessSettingsView } from '@/pages/business-dashboard/settings/view/settings-view';

//super-admin

import { BrandedLayout } from '@/auth/layouts/branded';
import { AdminSignInPage } from '@/auth/pages/admin-signin-page';
import { ChangeEmailPage } from '@/auth/pages/change-email-page';
import { ChangePasswordPage } from '@/auth/pages/change-password-page';
import { CheckEmail } from '@/auth/pages/extended/check-email';
import { ResetPasswordChanged } from '@/auth/pages/extended/reset-password-changed';
import { ResetPasswordCheckEmail } from '@/auth/pages/extended/reset-password-check-email';
import { TwoFactorAuth } from '@/auth/pages/extended/tfa';
import { ForgotPasswordPage } from '@/auth/pages/forgot-password-page';
import { ResetPasswordPage } from '@/auth/pages/reset-password-page';
import { SignInPage } from '@/auth/pages/signin-page';
import { VerifyOTP } from '@/auth/pages/verify-otp';
import BusinessessView from '@/pages/admin-dasbhoard/businesse/view/business-view';
import AdminProfileView from '@/pages/admin-dasbhoard/profile/view/user-profile-view';
import ReviewsView from '@/pages/admin-dasbhoard/reviews/view/reviews-view';
import TravelersView from '@/pages/admin-dasbhoard/users/view/travelers-view';
import { SignUpPage } from '@/auth/pages/signup-page';
import AuthCallback from '@/auth/pages/authcallback';


export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path='/' element={<BrandedLayout />}
        children={<Route index element={<SignInPage />} />} />
      <Route element={<Layout3 />}>

        <Route element={<RequireAuth role={"traveler"} />}>

          {/* <Route path="/traveler" element={<UserProfileView />} /> */}

          <Route path="/members/traveler/:userName" element={<ActivityView />} />

          <Route path="/members/traveler/:userName/settings/" element={<SettingsView />} />

          <Route path="/members/traveler/:userName/trips" element={<TripsView />} />

          <Route path="/members/traveler/:userName/trips/:id" element={<TripsDetailView />} />
          {/* saved */}
          <Route path="/members/traveler/:userName/saved" element={<SavedView />} />

          {/* to-do */}
          <Route path="/members/traveler/:userName/to-do" element={<TodoView />} />

          {/* activity */}
          {/* <Route path="/traveler/activity" element={<ActivityView />} /> */}

          {/* Favorites */}
          {/* <Route path="/traveler-dashboard/edit-profile" element={<UserProfileView />} /> */}

          <Route path="/members/traveler/:userName/profile" element={<TravelerProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"business"} />}>

          <Route path="members/business/:businessUserName" element={<BusinessActivityView />} />

          <Route path="members/business/:businessUserName/settings" element={<BusinessSettingsView />} />

          <Route path="members/business/:businessUserName/activity" element={<BusinessActivityView />} />
          {/* Photos */}
          <Route path="members/business/:businessUserName/lakes" element={<LakesView />} />

          <Route path='members/business/:businessUserName/lakes/create' element={<CreateLakePage />} />

          <Route path="members/business/:businessUserName/lakes/:id" element={<LakeDetailView />} />

          {/* Reviews */}
          <Route path="members/business/:businessUserName/subscription" element={<SubscriptionView />} />

          <Route path="members/business/:businessUserName/upgrade-subscription" element={<UpgradeSubscriptionView />} />

          {/* <Route path="/business-dashboard/edit-business" element={<BusinessAccountProfilePage />} /> */}

          <Route path="members/business/:businessUserName/stats" element={<StatsView />} />

          <Route path="members/business/:businessUserName/profile" element={<ProfileView />} />
        </Route>

        <Route element={<RequireAuth role={"admin"} />}>

          <Route path="/admin" element={<AdminProfileView />} />

          <Route path="/admin/profile" element={<AdminProfileView />} />

          <Route path="/admin/businesses" element={<BusinessessView />} />

          <Route path="/admin/travelers" element={<TravelersView />} />

          <Route path="/admin/reviews" element={<ReviewsView />} />

        </Route>

      </Route>

      <Route path="/" element={<BrandedLayout />}>

        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Default route → /signin */}
        <Route index element={<SignInPage />} />

        <Route path="login" element={<SignInPage />} />

        <Route path="signup" element={<SignUpPage />} />

        <Route path="admin/login" element={<AdminSignInPage />} />

        <Route path="verify-otp" element={<VerifyOTP />} />

        <Route path="change-email" element={<ChangeEmailPage />} />

        <Route path="change-password" element={<ChangePasswordPage />} />

        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route path="reset-password" element={<ResetPasswordPage />} />

        {/* Extended examples */}
        <Route path="2fa" element={<TwoFactorAuth />} />

        <Route path="check-email" element={<CheckEmail />} />

        <Route path="reset-password/check-email" element={<ResetPasswordCheckEmail />} />

        <Route path="reset-password/changed" element={<ResetPasswordChanged />} />

      </Route>

      {/* <Route element={<Layout3 />}></Route> */}
      {/* <Route path="/*" element={<AuthRouting />} /> */}
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
