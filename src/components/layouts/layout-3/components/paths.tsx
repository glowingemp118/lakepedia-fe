
const TRAVELER_DASHBOARD = '/traveler-dashboard';

const BUSINESS_DASHBOARD = '/business-dashboard';

const ADMIN_DASHBOARD = '/admin-dashboard';

export const paths = {
    travelerDashboard: {
        root: TRAVELER_DASHBOARD,
        activity: `${TRAVELER_DASHBOARD}/activity`,
        trips: `${TRAVELER_DASHBOARD}/trips`,
        saved: `${TRAVELER_DASHBOARD}/saved`,
        editProfile: `${TRAVELER_DASHBOARD}/edit-profile`,
        todo: `${TRAVELER_DASHBOARD}/to-do`,
        profile: `${TRAVELER_DASHBOARD}/profile`,
    },

    businessDashboard: {
        root: BUSINESS_DASHBOARD,
        profile: `${BUSINESS_DASHBOARD}/profile`,
        activity: `${BUSINESS_DASHBOARD}/activity`,
        lakes: `${BUSINESS_DASHBOARD}/lakes`,
        editBusiness: `${BUSINESS_DASHBOARD}/edit-business`,
        stats: `${BUSINESS_DASHBOARD}/stats`,
        subscription: `${BUSINESS_DASHBOARD}/subscription`,

    },
    adminDashboard: {
        root: ADMIN_DASHBOARD,
        profile: `${ADMIN_DASHBOARD}/profile`,
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