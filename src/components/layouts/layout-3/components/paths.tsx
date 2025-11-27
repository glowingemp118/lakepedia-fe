
const TRAVELER_DASHBOARD = '/members/traveler';

const BUSINESS_DASHBOARD = '/members/business';

const ADMIN_DASHBOARD = '/admin';

export const paths = {
    home: '/',
    signin: '/login',
    AdminSignin: '/admin/login',
    signup: '/signup',
    signout: '/signout',
    verifyOTP: '/verify-otp',
    resetPassword: "/reset-password",

    travelerDashboard: {
        root: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}`,
        activity: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/activity`,
        settings: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/settings`,
        trips: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/trips`,
        tripDetail: (userName: string, id: string) => `${TRAVELER_DASHBOARD}/${userName}/trips/${id}`,
        saved: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/saved`,
        editProfile: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/edit-profile`,
        todo: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/to-do`,
        profile: (userName: string) => `${TRAVELER_DASHBOARD}/${userName}/profile`,
    },

    businessDashboard: {
        root: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}`,
        profile: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/profile`,
        settings: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/settings`,
        activity: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/activity`,
        lakes: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/lakes`,
        createLake: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/lakes/create`,
        lakeDetail: (businessUserName: string, id: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/lakes/${id}`,
        editBusiness: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/edit-business`,
        stats: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/stats`,
        subscription: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/subscription`,
        upgradeSubscription: (businessUserName: string) => `${BUSINESS_DASHBOARD}/${businessUserName}/upgrade-subscription`,
    },
    adminDashboard: {
        root: ADMIN_DASHBOARD,
        profile: `${ADMIN_DASHBOARD}/profile`,
        businessess: `${ADMIN_DASHBOARD}/businesses`,
        travelers: `${ADMIN_DASHBOARD}/travelers`,
        reviews: `${ADMIN_DASHBOARD}/reviews`,
        account: `${ADMIN_DASHBOARD}/account`,
        network: `${ADMIN_DASHBOARD}/network`,
        plans: `${ADMIN_DASHBOARD}/plans`,
        securityLogs: `${ADMIN_DASHBOARD}/security-logs`,
        notifications: `${ADMIN_DASHBOARD}/notifications`,
        acl: `${ADMIN_DASHBOARD}/acl`,
        apiKeys: `${ADMIN_DASHBOARD}/api-keys`,
        docs: 'https://docs.keenthemes.com/metronic-vite'
    }
}