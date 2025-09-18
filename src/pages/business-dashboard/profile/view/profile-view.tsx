import { ProfileInfo } from "@/components/profile/profile-info";

export function ProfileView() {
    return (
        <div className="grid grid-cols-1  gap-5 lg:gap-7.5">
            <div className="col-span-1">
                <div className="grid gap-5 lg:gap-7.5">
                    <ProfileInfo />
                </div>
            </div>
        </div>
    );
}
