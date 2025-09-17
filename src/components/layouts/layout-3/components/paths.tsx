
const TRAVELER_DASHBOARD = '/traveler-dashboard';

const BUSINESS_DASHBOARD = '/business-dashboard';

const ADMIN_DASHBOARD = '/admin-dashboard';

export const paths = {
    travelerDashboard: {
        root: TRAVELER_DASHBOARD,
        trips: `${TRAVELER_DASHBOARD}/trips`,
        photos: `${TRAVELER_DASHBOARD}/photos`,
        reviews: `${TRAVELER_DASHBOARD}/reviews`,
        favorites: `${TRAVELER_DASHBOARD}/favorites`,
    },
    businessDashboard: {
        root: BUSINESS_DASHBOARD,
        profile: `${BUSINESS_DASHBOARD}/profile`,
        media: `${BUSINESS_DASHBOARD}/media`,
        performance: `${BUSINESS_DASHBOARD}/performance`,
        subscriptions: `${BUSINESS_DASHBOARD}/subscriptions`,
        chat: `${BUSINESS_DASHBOARD}/chat`,
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