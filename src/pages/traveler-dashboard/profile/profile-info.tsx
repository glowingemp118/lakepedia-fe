import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useBoolean } from '@/hooks/use-boolean';

import { SquarePen } from 'lucide-react';
import { FC } from 'react';
import ProfileQuickEditForm from './profile-quick-edit-form';
import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog';


interface PageProps {
    profileData: {
        photo: string;
        first_name: string;
        last_name: string;
        email: string,
        status: string;
        role: string;
    };

}

const ProfileInfo: FC<PageProps> = ({ profileData }) => {

    const open = useBoolean();

    const show=useBoolean();

    const handleDeactivate = () => {
        
    }

    return (
        <>
            <Card className="min-w-full">
                <CardHeader>
                    <CardTitle>{profileData?.role === "traveler" && "Traveler" || profileData?.role === "admin" && "Admin" || profileData.role === "business" && "Business"} Profile Info</CardTitle>
                    <Button variant="ghost" mode="icon" onClick={open.onTrue} >
                        <SquarePen size={16} className="text-blue-500" />
                    </Button>
                </CardHeader>
                <CardContent className="kt-scrollable-x-auto pb-3 p-0">
                    <Table className="align-middle text-sm text-muted-foreground">
                        <TableBody>
                            <TableRow>
                                <TableCell className="py-2 min-w-28 text-secondary-foreground font-normal">
                                    Photo
                                </TableCell>
                                <TableCell className="py-2 text-gray700 font-normal min-w-32 text-sm">
                                    150x150px JPEG, PNG Image
                                </TableCell>
                                <TableCell className="py-2 text-center">
                                    <div className="flex justify-center items-center">

                                        <img
                                            src={profileData.photo || "/media/avatars/300-2.png"}
                                            alt="Avatar"
                                            className="size-16 rounded-full border-2 border-green-500"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    First Name
                                </TableCell>
                                <TableCell className="py-3 text-foreground font-normal text-sm">
                                    {profileData.first_name?.slice(0,1).toUpperCase() + profileData.first_name?.slice(1)}
                                </TableCell>
                                <TableCell className="py-2 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Last Name
                                </TableCell>
                                <TableCell className="py-3 text-foreground font-normal text-sm">
                                    {profileData.last_name.slice(0,1).toUpperCase() + profileData.last_name?.slice(1)}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Email
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    {profileData.email}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    UsState
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    {profileData.usState}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Country
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    {profileData.country}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Privacy Settings
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    {profileData.privacy}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Notifications
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    {profileData.notifications ? 'Enabled' : 'Disabled'}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <span>-</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="py-3 text-secondary-foreground font-normal">
                                    Deactivate Account
                                </TableCell>
                                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                                    <span className="text-red-500">Deactivate your account</span>
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                    <Button variant="destructive" size="sm" onClick={show.onTrue}>
                                        Deactivate
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>

                <ConfirmDialog
                title='Deactivate Account'
                content='Are you sure you want to deactivate your account?'
                open={show.value}
                onClose={show.onFalse}
                onConfirm={handleDeactivate}
                />

                <ProfileQuickEditForm profileData={profileData} open={open.value} onClose={open.onFalse} />
            </Card >
        </>
    );
};

export { ProfileInfo };

