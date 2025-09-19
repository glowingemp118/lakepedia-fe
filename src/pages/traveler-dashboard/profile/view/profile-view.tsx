import { selectUser } from "@/store/slices/userSlice";
import { ProfileInfo } from "../profile-info";
import { useSelector } from "react-redux";

export function ProfileView() {

    const user = useSelector(selectUser);

    const travelerProfile = {
        first_name: user?.first_name as string || '',
        last_name: user?.last_name  as string || '',
        email: user?.email as string || '',
        photo: user?.image as string || '',
        status: user?.status as string || '',
        role: user?.role as string || '',
    };

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


