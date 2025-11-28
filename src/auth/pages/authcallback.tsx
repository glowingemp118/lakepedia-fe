import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthCallback() {

    const { handleRedirectCallback, isLoading } = useAuth0();

    const navigate = useNavigate();

    useEffect(() => {

        const fn = async () => {

            const result = await handleRedirectCallback();

            const redirectTo = result?.appState?.returnTo || "/";

            navigate(redirectTo);

        };

        fn();
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    return <div></div>;
}
