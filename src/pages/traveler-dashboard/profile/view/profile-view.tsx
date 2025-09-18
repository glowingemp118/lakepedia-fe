import { ProfileInfo } from "../profile-info";

export function ProfileView() {
    return (
        <div className="grid grid-cols-1  gap-5 lg:gap-7.5">
            <div className="col-span-1 md:mx-30 mx-2">
                <ProfileInfo
                    profileData={travelerProfile}
                />
            </div>
        </div>
    );
}

const travelerProfile = {
    photo: "/images/avatars/avatar-1.jpg",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "USA",
    usState: "California",
    city: "Los Angeles",
    privacy: "public",

    favoriteActivities: ["Fishing", "Hiking", "Boating"],

    notifications: true,
    accountStatus: "active",
};

