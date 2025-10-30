import { toAbsoluteUrl } from "@/lib/helpers";
import { UserHeroProps } from "@/pages/traveler-dashboard/profile/profile-hero";
import { selectUser } from "@/store/slices/userSlice";
import { CircleUser, Mail, MapPin } from "lucide-react";
import { ComponentType } from "react";
import { useSelector } from "react-redux";


const withProfile = <P extends object>(Component: ComponentType<P & UserHeroProps>) => {



    return (props: P) => {

        const user = useSelector(selectUser);

        const image = (
            <img
                src={toAbsoluteUrl((user?.image as { url?: string })?.url || '/media/avatars/300-1.png')}
                className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
                alt="image"
            />
        );

        const CapitalizeRole = (role: string) => {
            return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
        }
        return <Component


            name={CapitalizeRole(user?.first_name as string || "Jenny") + " " + CapitalizeRole(user?.last_name as string || "Klabber")}

            image={image}

            info={[
                { label: CapitalizeRole(user?.role as string || "Traveler"), icon: CircleUser },
                { label: CapitalizeRole(`${user?.country || "Not Added"}`) + " " + CapitalizeRole(`${user?.state || "Not Added"}`) || "Unknown", icon: MapPin },
                { email: user?.email as string || "jenny@kteam.com", icon: Mail },
            ]}
            {...props}
        />;

    };
};

export default withProfile;
